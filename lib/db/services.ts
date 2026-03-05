// Services PostgreSQL pour remplacer le mock-database
// Version PostgreSQL des fonctions de base de données

import { db } from './client'
import { PoolClient } from 'pg'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

// Types pour TypeScript
export interface User {
  id: string
  email: string
  phone: string
  password_hash?: string
  first_name: string
  last_name: string
  role: 'FARMER' | 'BUYER' | 'LOGISTICS' | 'ADMIN'
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE'
  avatar?: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: string
  farmer_id: string
  name: string
  category: string
  description?: string
  images?: string[]
  unit: string
  price_per_unit: number
  available_quantity: number
  minimum_order?: number
  harvest_date?: Date
  expiry_date?: Date
  certifications?: string[]
  status: string
  rating?: number
  total_sales?: number
  created_at: Date
  updated_at: Date
}

export interface Order {
  id: string
  order_number: string
  buyer_id: string
  farmer_id: string
  logistics_id?: string
  items: any // JSONB
  subtotal: number
  delivery_fee: number
  total_amount: number
  status: string
  payment_status: string
  delivery_address: string
  delivery_date?: Date
  notes?: string
  created_at: Date
  updated_at: Date
}

// ===== SERVICE UTILISATEURS =====
export const UserService = {
  // Trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    )
    return result.rows[0] || null
  },

  // Trouver un utilisateur par ID
  async findById(id: string): Promise<User | null> {
    const result = await db.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  },

  // Obtenir tous les utilisateurs
  async getAll(): Promise<User[]> {
    const result = await db.query<User>(
      'SELECT * FROM users ORDER BY created_at DESC'
    )
    return result.rows
  },

  // Créer un utilisateur
  async create(userData: {
    email: string
    phone: string
    password: string
    first_name: string
    last_name: string
    role: string
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const result = await db.query<User>(`
      INSERT INTO users (email, phone, password_hash, first_name, last_name, role, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVE')
      RETURNING *
    `, [
      userData.email.toLowerCase(),
      userData.phone,
      hashedPassword,
      userData.first_name,
      userData.last_name,
      userData.role
    ])
    
    return result.rows[0]
  },

  // Vérifier le mot de passe
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    if (!user || !user.password_hash) return false
    
    return await bcrypt.compare(password, user.password_hash)
  },

  // Supprimer un utilisateur
  async delete(id: string): Promise<boolean> {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    )
    return result.rowCount > 0
  },

  // Mettre à jour un utilisateur
  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')
    
    const values = [id, ...Object.values(updates)]
    
    const result = await db.query<User>(`
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 
      RETURNING *
    `, values)
    
    return result.rows[0] || null
  }
}

// ===== SERVICE PRODUITS =====
export const ProductService = {
  // Obtenir tous les produits
  async getAll(): Promise<Product[]> {
    const result = await db.query<Product>(`
      SELECT p.*, u.first_name || ' ' || u.last_name as farmer_name
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      ORDER BY p.created_at DESC
    `)
    return result.rows
  },

  // Trouver un produit par ID
  async findById(id: string): Promise<Product | null> {
    const result = await db.query<Product>(
      'SELECT * FROM products WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  },

  // Produits d'un fermier
  async getByFarmerId(farmerId: string): Promise<Product[]> {
    const result = await db.query<Product>(
      'SELECT * FROM products WHERE farmer_id = $1 ORDER BY created_at DESC',
      [farmerId]
    )
    return result.rows
  },

  // Créer un produit
  async create(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const result = await db.query<Product>(`
      INSERT INTO products (
        farmer_id, name, category, description, images, unit,
        price_per_unit, available_quantity, minimum_order, harvest_date,
        expiry_date, certifications, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      productData.farmer_id,
      productData.name,
      productData.category,
      productData.description,
      productData.images,
      productData.unit,
      productData.price_per_unit,
      productData.available_quantity,
      productData.minimum_order || 1,
      productData.harvest_date,
      productData.expiry_date,
      productData.certifications,
      productData.status || 'AVAILABLE'
    ])
    
    return result.rows[0]
  },

  // Mettre à jour un produit
  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ')
    
    const values = [id, ...Object.values(updates)]
    
    const result = await db.query<Product>(`
      UPDATE products 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 
      RETURNING *
    `, values)
    
    return result.rows[0] || null
  },

  // Supprimer un produit
  async delete(id: string): Promise<boolean> {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1',
      [id]
    )
    return result.rowCount > 0
  },

  // Rechercher des produits
  async search(query: string, category?: string): Promise<Product[]> {
    let sql = `
      SELECT p.*, u.first_name || ' ' || u.last_name as farmer_name
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      WHERE p.status = 'AVAILABLE'
      AND (p.name ILIKE $1 OR p.description ILIKE $1)
    `
    const params = [`%${query}%`]
    
    if (category) {
      sql += ' AND p.category = $2'
      params.push(category)
    }
    
    sql += ' ORDER BY p.created_at DESC'
    
    const result = await db.query<Product>(sql, params)
    return result.rows
  }
}

// ===== SERVICE COMMANDES =====
export const OrderService = {
  // Obtenir toutes les commandes
  async getAll(): Promise<Order[]> {
    const result = await db.query<Order>(`
      SELECT o.*, 
             ub.first_name || ' ' || ub.last_name as buyer_name,
             uf.first_name || ' ' || uf.last_name as farmer_name
      FROM orders o
      JOIN users ub ON o.buyer_id = ub.id
      JOIN users uf ON o.farmer_id = uf.id
      ORDER BY o.created_at DESC
    `)
    return result.rows
  },

  // Trouver une commande par ID
  async findById(id: string): Promise<Order | null> {
    const result = await db.query<Order>(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    )
    return result.rows[0] || null
  },

  // Commandes d'un acheteur
  async getByBuyerId(buyerId: string): Promise<Order[]> {
    const result = await db.query<Order>(
      'SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC',
      [buyerId]
    )
    return result.rows
  },

  // Commandes d'un fermier
  async getByFarmerId(farmerId: string): Promise<Order[]> {
    const result = await db.query<Order>(
      'SELECT * FROM orders WHERE farmer_id = $1 ORDER BY created_at DESC',
      [farmerId]
    )
    return result.rows
  },

  // Créer une commande
  async create(orderData: {
    buyer_id: string
    farmer_id: string
    items: any[]
    subtotal: number
    delivery_fee: number
    total_amount: number
    delivery_address: string
  }): Promise<Order> {
    const orderNumber = `AGR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    
    const result = await db.query<Order>(`
      INSERT INTO orders (
        order_number, buyer_id, farmer_id, items, subtotal,
        delivery_fee, total_amount, delivery_address, status, payment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING', 'PENDING')
      RETURNING *
    `, [
      orderNumber,
      orderData.buyer_id,
      orderData.farmer_id,
      JSON.stringify(orderData.items),
      orderData.subtotal,
      orderData.delivery_fee,
      orderData.total_amount,
      orderData.delivery_address
    ])
    
    return result.rows[0]
  },

  // Mettre à jour le statut d'une commande
  async updateStatus(id: string, status: string): Promise<Order | null> {
    const result = await db.query<Order>(`
      UPDATE orders 
      SET status = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 
      RETURNING *
    `, [id, status])
    
    return result.rows[0] || null
  }
}

// ===== SERVICE STATISTIQUES =====
export const StatsService = {
  async getOverview(): Promise<any> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const [
      userStats,
      productStats,
      orderStats,
      revenueStats
    ] = await Promise.all([
      // Statistiques utilisateurs
      db.query(`
        SELECT 
          COUNT(*) as total_users,
          COUNT(CASE WHEN role = 'FARMER' THEN 1 END) as total_farmers,
          COUNT(CASE WHEN role = 'BUYER' THEN 1 END) as total_buyers,
          COUNT(CASE WHEN role = 'LOGISTICS' THEN 1 END) as total_logistics,
          COUNT(CASE WHEN created_at >= $1 THEN 1 END) as new_users_today
        FROM users
      `, [today]),
      
      // Statistiques produits
      db.query(`
        SELECT 
          COUNT(*) as total_products,
          COUNT(CASE WHEN available_quantity <= 10 AND available_quantity > 0 THEN 1 END) as low_stock_products
        FROM products
        WHERE status = 'AVAILABLE'
      `),
      
      // Statistiques commandes
      db.query(`
        SELECT 
          COUNT(*) as total_orders,
          COUNT(CASE WHEN status NOT IN ('DELIVERED', 'CANCELLED') THEN 1 END) as active_orders,
          COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_orders,
          COUNT(CASE WHEN created_at >= $1 THEN 1 END) as orders_today
        FROM orders
      `, [today]),
      
      // Statistiques revenus
      db.query(`
        SELECT 
          COALESCE(SUM(total_amount), 0) as total_revenue
        FROM orders
        WHERE status = 'DELIVERED'
      `)
    ])
    
    return {
      ...userStats.rows[0],
      ...productStats.rows[0],
      ...orderStats.rows[0],
      ...revenueStats.rows[0]
    }
  }
}

// ===== SERVICE SESSIONS JWT (pour remplacer les sessions mock) =====
export const SessionService = {
  // Générer un token JWT (à implémenter avec jsonwebtoken)
  generateToken(userId: string): string {
    // Pour l'instant, un token simple - à remplacer par JWT
    return crypto.randomBytes(32).toString('hex')
  },
  
  // Vérifier un token (à implémenter avec JWT)
  verifyToken(token: string): { userId: string } | null {
    // À implémenter avec la vérification JWT
    return null
  }
}

export { db }