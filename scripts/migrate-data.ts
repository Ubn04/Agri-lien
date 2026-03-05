#!/usr/bin/env ts-node

/**
 * Script de migration des données mock vers PostgreSQL
 * Usage: npm run migrate-data
 */

import { initializeDatabase, db } from '../lib/db'
import { UserService, AuthService } from '../lib/services'
import mockData from '../data/mock-db.json'
import { UserRole } from '../lib/types/user'
import bcrypt from 'bcryptjs'

interface MockUser {
  id: string
  email: string
  name: string
  firstName: string
  lastName: string
  phone: string
  role: string
  createdAt: string
  farmName?: string
  farmLocation?: string
  farmSize?: number
  address?: string
  city?: string
  department?: string
  location?: string
}

interface MockProduct {
  id: string
  name: string
  description: string
  price: number
  unit: string
  category: string
  farmerId: string
  farmerName: string
  location: string
  stock: number
  images: string[]
  createdAt: string
}

interface MockOrder {
  id: string
  buyerId: string
  buyerName: string
  buyerPhone: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: string
  deliveryAddress?: string
  paymentMethod?: string
  createdAt: string
  notes?: string
}

async function migrateUsers() {
  console.log('📥 Migration des utilisateurs...')
  
  const users = mockData.users as MockUser[]
  let migratedCount = 0
  
  for (const user of users) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await UserService.findByEmail(user.email)
      if (existingUser) {
        console.log(`⚠️ Utilisateur ${user.email} déjà existant, ignoré`)
        continue
      }
      
      // Créer l'utilisateur selon son rôle
      if (user.role === 'farmer' && user.farmName) {
        await UserService.createFarmerProfile({
          email: user.email,
          phone: user.phone,
          password: 'TempPassword123!', // Mot de passe temporaire
          firstName: user.firstName,
          lastName: user.lastName,
          role: UserRole.FARMER,
          farmName: user.farmName,
          farmLocation: {
            address: user.farmLocation || user.location || 'Adresse non spécifiée',
            city: user.city || 'Ville non spécifiée'
          },
          farmSize: user.farmSize || 0,
          specialties: [],
          certifications: []
        })
      } else if (user.role === 'buyer') {
        await UserService.createBuyerProfile({
          email: user.email,
          phone: user.phone,
          password: 'TempPassword123!', // Mot de passe temporaire
          firstName: user.firstName,
          lastName: user.lastName,
          role: UserRole.BUYER,
          businessName: user.name,
          businessType: 'other',
          location: {
            address: user.address || user.location || 'Adresse non spécifiée',
            city: user.city || 'Ville non spécifiée'
          }
        })
      } else {
        // Utilisateur simple (admin, logistics, etc.)
        await UserService.createUser({
          email: user.email,
          phone: user.phone,
          password: 'TempPassword123!', // Mot de passe temporaire
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.toUpperCase() as UserRole
        })
      }
      
      migratedCount++
      console.log(`✅ Utilisateur ${user.email} migré avec succès`)
      
    } catch (error) {
      console.error(`❌ Erreur lors de la migration de l'utilisateur ${user.email}:`, error instanceof Error ? error.message : String(error))
    }
  }
  
  console.log(`📊 ${migratedCount}/${users.length} utilisateurs migrés`)
}

async function migrateProducts() {
  console.log('📥 Migration des produits...')
  
  const products = mockData.products as MockProduct[]
  let migratedCount = 0
  
  for (const product of products) {
    try {
      // Trouver le fermier par son email ou nom
      const farmerQuery = `
        SELECT u.id FROM users u 
        JOIN farmer_profiles fp ON u.id = fp.user_id 
        WHERE u.first_name || ' ' || u.last_name = $1 
        OR fp.farm_name ILIKE $2
        LIMIT 1
      `
      
      const farmerResult = await db.query(farmerQuery, [
        product.farmerName,
        `%${product.farmerName}%`
      ])
      
      if (farmerResult.rows.length === 0) {
        console.log(`⚠️ Fermier introuvable pour le produit ${product.name}`)
        continue
      }
      
      const farmerId = farmerResult.rows[0].id
      
      // Créer le produit
      const productQuery = `
        INSERT INTO products (
          farmer_id, name, category, description, images, unit,
          price_per_unit, available_quantity, status, created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'AVAILABLE', $9)
      `
      
      await db.query(productQuery, [
        farmerId,
        product.name,
        product.category.toUpperCase(),
        product.description,
        product.images,
        product.unit,
        product.price,
        product.stock,
        new Date(product.createdAt)
      ])
      
      migratedCount++
      console.log(`✅ Produit ${product.name} migré avec succès`)
      
    } catch (error) {
      console.error(`❌ Erreur lors de la migration du produit ${product.name}:`, error instanceof Error ? error.message : String(error))
    }
  }
  
  console.log(`📊 ${migratedCount}/${products.length} produits migrés`)
}

async function migrateOrders() {
  console.log('📥 Migration des commandes...')
  
  const orders = mockData.orders as MockOrder[]
  let migratedCount = 0
  
  for (const order of orders) {
    try {
      // Trouver l'acheteur
      const buyerQuery = `SELECT id FROM users WHERE phone = $1 LIMIT 1`
      const buyerResult = await db.query(buyerQuery, [order.buyerPhone])
      
      if (buyerResult.rows.length === 0) {
        console.log(`⚠️ Acheteur introuvable pour la commande ${order.id}`)
        continue
      }
      
      const buyerId = buyerResult.rows[0].id
      
      // Trouver le fermier (supposer le premier produit)
      if (order.items.length === 0) {
        console.log(`⚠️ Commande ${order.id} sans items`)
        continue
      }
      
      const productQuery = `SELECT farmer_id FROM products LIMIT 1`
      const productResult = await db.query(productQuery)
      
      if (productResult.rows.length === 0) {
        console.log(`⚠️ Aucun produit trouvé pour la commande ${order.id}`)
        continue
      }
      
      const farmerId = productResult.rows[0].farmer_id
      
      // Générer un numéro de commande
      const orderNumber = `CMD-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      
      // Créer la commande
      const orderQuery = `
        INSERT INTO orders (
          order_number, buyer_id, farmer_id, items, subtotal,
          total_amount, status, payment_status, delivery_address,
          notes, created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING', $8, $9, $10)
      `
      
      await db.query(orderQuery, [
        orderNumber,
        buyerId,
        farmerId,
        JSON.stringify(order.items),
        order.totalAmount,
        order.totalAmount,
        order.status.toUpperCase(),
        order.deliveryAddress || 'Adresse non spécifiée',
        order.notes || null,
        new Date(order.createdAt)
      ])
      
      migratedCount++
      console.log(`✅ Commande ${orderNumber} migrée avec succès`)
      
    } catch (error) {
      console.error(`❌ Erreur lors de la migration de la commande ${order.id}:`, error instanceof Error ? error.message : String(error))
    }
  }
  
  console.log(`📊 ${migratedCount}/${orders.length} commandes migrées`)
}

async function main() {
  try {
    console.log('🚀 Démarrage de la migration des données mock vers PostgreSQL')
    
    // Initialiser la base de données
    await initializeDatabase()
    
    // Migrer dans l'ordre : utilisateurs -> produits -> commandes
    await migrateUsers()
    await migrateProducts()
    await migrateOrders()
    
    console.log('🎉 Migration terminée avec succès!')
    console.log('📍 Note: Les utilisateurs ont un mot de passe temporaire "TempPassword123!"')
    console.log('📍 Ils devront changer leur mot de passe lors de leur première connexion.')
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  } finally {
    await db.close()
  }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main()
}

export default main