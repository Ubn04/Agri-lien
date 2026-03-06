#!/usr/bin/env node

/**
 * Script de migration des données mock vers PostgreSQL
 * Usage: npm run seed-database
 * ou: node scripts/seed-database.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Import de nos services PostgreSQL
import { db } from '../lib/db/client.js'
import { UserService, ProductService, OrderService } from '../lib/db/services.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Charger les données mock
const mockDataPath = path.join(__dirname, '../data/mock-db.json')
let mockData: any = {}

try {
  const rawData = fs.readFileSync(mockDataPath, 'utf8')
  mockData = JSON.parse(rawData)
} catch (error) {
  console.error('❌ Erreur lecture données mock:', error)
  process.exit(1)
}

async function initializeSchema() {
  console.log('🔧 Initialisation du schéma de base de données...')
  
  const schemaPath = path.join(__dirname, '../database/schema.sql')
  
  try {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8')
    await db.query(schemaSql)
    console.log('✅ Schéma de base de données créé avec succès')
  } catch (error) {
    console.error('❌ Erreur création schéma:', error)
    throw error
  }
}

async function seedUsers() {
  console.log('👥 Migration des utilisateurs...')
  
  for (const mockUser of mockData.users || []) {
    try {
      // Convertir les données mock vers le format PostgreSQL
      const userData = {
        email: mockUser.email,
        phone: mockUser.phone || '+229 00 00 00 00',
        password: 'password123', // Mot de passe par défaut pour les tests
        first_name: mockUser.firstName || mockUser.first_name || 'Prénom',
        last_name: mockUser.lastName || mockUser.last_name || 'Nom',
        role: (mockUser.role || 'BUYER').toUpperCase()
      }
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await UserService.findByEmail(userData.email)
      if (existingUser) {
        console.log(`⚠️ Utilisateur ${userData.email} existe déjà - ignoré`)
        continue
      }
      
      const newUser = await UserService.create(userData)
      console.log(`✅ Utilisateur créé: ${newUser.first_name} ${newUser.last_name} (${newUser.role})`)
      
    } catch (error) {
      console.error(`❌ Erreur création utilisateur ${mockUser.email}:`, error)
    }
  }
}

async function seedProducts() {
  console.log('🌱 Migration des produits...')
  
  for (const mockProduct of mockData.products || []) {
    try {
      // Trouver le fermier par email ou ID
      let farmer = null
      if (mockProduct.farmerId) {
        farmer = await UserService.findById(mockProduct.farmerId)
      }
      if (!farmer && mockProduct.farmerEmail) {
        farmer = await UserService.findByEmail(mockProduct.farmerEmail)
      }
      
      if (!farmer) {
        console.log(`⚠️ Fermier non trouvé pour le produit ${mockProduct.name} - ignoré`)
        continue
      }
      
      const productData = {
        farmer_id: farmer.id,
        name: mockProduct.name,
        category: mockProduct.category || 'Autre',
        description: mockProduct.description || '',
        images: mockProduct.images || [],
        unit: mockProduct.unit || 'kg',
        price_per_unit: parseFloat(mockProduct.price || mockProduct.pricePerUnit || 0),
        available_quantity: parseFloat(mockProduct.stock || mockProduct.availableQuantity || 0),
        minimum_order: parseFloat(mockProduct.minimumOrder || 1),
        harvest_date: mockProduct.harvestDate ? new Date(mockProduct.harvestDate) : undefined,
        expiry_date: mockProduct.expiryDate ? new Date(mockProduct.expiryDate) : undefined,
        certifications: mockProduct.certifications || [],
        status: 'AVAILABLE'
      }
      
      const newProduct = await ProductService.create(productData)
      console.log(`✅ Produit créé: ${newProduct.name} (${newProduct.unit} - ${newProduct.price_per_unit} XOF)`)
      
    } catch (error) {
      console.error(`❌ Erreur création produit ${mockProduct.name}:`, error)
    }
  }
}

async function seedOrders() {
  console.log('📦 Migration des commandes...')
  
  for (const mockOrder of mockData.orders || []) {
    try {
      // Trouver l'acheteur et le fermier
      const buyer = await UserService.findById(mockOrder.buyerId)
      if (!buyer) {
        console.log(`⚠️ Acheteur non trouvé pour la commande ${mockOrder.id} - ignoré`)
        continue
      }
      
      // Pour simplifier, on prend le premier fermier disponible
      // Dans un vrai système, il faudrait analyser les items de la commande
      const farmers = await UserService.getAll()
      const farmer = farmers.find(f => f.role === 'FARMER')
      
      if (!farmer) {
        console.log(`⚠️ Aucun fermier disponible pour la commande ${mockOrder.id} - ignoré`)
        continue
      }
      
      const orderData = {
        buyer_id: buyer.id,
        farmer_id: farmer.id,
        items: mockOrder.items || [],
        subtotal: parseFloat(mockOrder.subtotal || mockOrder.totalAmount || 0),
        delivery_fee: parseFloat(mockOrder.deliveryFee || 0),
        total_amount: parseFloat(mockOrder.totalAmount || 0),
        delivery_address: mockOrder.deliveryAddress || 'Adresse non spécifiée'
      }
      
      const newOrder = await OrderService.create(orderData)
      console.log(`✅ Commande créée: ${newOrder.order_number} (${newOrder.total_amount} XOF)`)
      
    } catch (error) {
      console.error(`❌ Erreur création commande ${mockOrder.id}:`, error)
    }
  }
}

async function main() {
  console.log('🚀 Début de la migration vers PostgreSQL...')
  console.log('=' .repeat(50))
  
  try {
    // Tester la connexion
    const isConnected = await db.healthCheck()
    if (!isConnected) {
      throw new Error('Impossible de se connecter à PostgreSQL')
    }
    console.log('✅ Connexion PostgreSQL établie')
    
    // Initialiser le schéma
    await initializeSchema()
    
    // Migrer les données dans l'ordre
    await seedUsers()
    await seedProducts()
    await seedOrders()
    
    console.log('=' .repeat(50))
    console.log('🎉 Migration terminée avec succès !')
    console.log('📊 Vérification des données...')
    
    // Afficher un résumé
    const users = await UserService.getAll()
    const products = await ProductService.getAll()
    const orders = await OrderService.getAll()
    
    console.log(`👥 Utilisateurs: ${users.length}`)
    console.log(`🌱 Produits: ${products.length}`)
    console.log(`📦 Commandes: ${orders.length}`)
    
  } catch (error) {
    console.error('❌ Erreur durant la migration:', error)
    process.exit(1)
  } finally {
    // Fermer la connexion
    await db.close()
  }
}

// Exécuter la migration
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}