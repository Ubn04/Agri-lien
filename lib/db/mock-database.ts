// Mock Database - Simule une base de données pour le développement
// En production, remplacer par une vraie base de données (PostgreSQL, MongoDB, etc.)

import fs from 'fs'
import path from 'path'
import { User, UserRole, UserStatus } from '../types/user'

interface Product {
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
  createdAt: Date
  [key: string]: any
}

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  buyerId: string
  buyerName: string
  buyerPhone: string
  items: OrderItem[]
  totalAmount: number
  status: string
  deliveryAddress?: string
  createdAt: Date
  updatedAt: Date
}

interface Database {
  users: User[]
  products: Product[]
  orders: Order[]
  sessions: Map<string, { userId: string; expiresAt: Date }>
}

// Base de données en mémoire
const db: Database = {
  users: [
    {
      id: '1',
      email: 'admin@agrilien.bj',
      firstName: 'Admin',
      lastName: 'Agri-Lien',
      phone: '+229 97 00 00 00',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      email: 'fermier@test.bj',
      firstName: 'Jean',
      lastName: 'Kouassi',
      phone: '+229 97 11 11 11',
      role: UserRole.FARMER,
      status: UserStatus.ACTIVE,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '3',
      email: 'acheteur@test.bj',
      firstName: 'Marie',
      lastName: 'Dosso',
      phone: '+229 97 22 22 22',
      role: UserRole.BUYER,
      status: UserStatus.ACTIVE,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '4',
      email: 'logistique@test.bj',
      firstName: 'Logisticien',
      lastName: 'Test',
      phone: '+229 97 33 33 33',
      role: UserRole.LOGISTICS,
      status: UserStatus.ACTIVE,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
  products: [
    {
      id: '1',
      name: 'Tomates Fraîches',
      description: 'Tomates bio cultivées localement, parfaites pour vos sauces et salades',
      price: 1500,
      unit: 'kg',
      category: 'Légumes',
      farmerId: '2',
      farmerName: 'Jean Kouassi',
      location: 'Abomey-Calavi',
      stock: 150,
      images: ['/products/tomates.jpg'],
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '2',
      name: 'Ananas Sweet',
      description: 'Ananas sucrés et juteux, fraîchement récoltés',
      price: 800,
      unit: 'pièce',
      category: 'Fruits',
      farmerId: '2',
      farmerName: 'Jean Kouassi',
      location: 'Abomey-Calavi',
      stock: 80,
      images: ['/products/ananas.jpg'],
      createdAt: new Date('2024-02-02'),
    },
    {
      id: '3',
      name: 'Maïs Frais',
      description: 'Maïs tendre fraîchement cueilli, idéal pour atassi',
      price: 500,
      unit: 'épis',
      category: 'Céréales',
      farmerId: '2',
      farmerName: 'Jean Kouassi',
      location: 'Abomey-Calavi',
      stock: 200,
      images: ['/products/mais.jpg'],
      createdAt: new Date('2024-02-03'),
    },
    {
      id: '4',
      name: 'Piment Frais',
      description: 'Piments locaux très piquants pour vos sauces',
      price: 2000,
      unit: 'kg',
      category: 'Légumes',
      farmerId: '2',
      farmerName: 'Jean Kouassi',
      location: 'Abomey-Calavi',
      stock: 50,
      images: ['/products/piment.jpg'],
      createdAt: new Date('2024-02-04'),
    },
    {
      id: '5',
      name: 'Ignames Fraîches',
      description: 'Ignames de qualité premium, cultivées sans pesticides',
      price: 1200,
      unit: 'kg',
      category: 'Tubercules',
      farmerId: '2',
      farmerName: 'Jean Kouassi',
      location: 'Abomey-Calavi',
      stock: 300,
      images: ['/products/igname.jpg'],
      createdAt: new Date('2024-02-05'),
    },
  ],
  orders: [],
  sessions: new Map(),
}

// Hash password simple (en production, utiliser bcrypt)
const hashPassword = (password: string): string => {
  return Buffer.from(password).toString('base64')
}

// Vérifier password
const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash
}

// Générer un token simple (en production, utiliser JWT)
const generateToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Passwords mockés (en production, stockés hashés dans la DB)
const passwords = new Map<string, string>([
  ['admin@agrilien.bj', hashPassword('admin123')],
  ['fermier@test.bj', hashPassword('fermier123')],
  ['acheteur@test.bj', hashPassword('acheteur123')],
  ['logistique@test.bj', hashPassword('logistique123')],
])

// Chemin du fichier de persistance
const DB_FILE_PATH = path.join(process.cwd(), 'data', 'mock-db.json')

// Fonction pour sauvegarder les données
const saveData = () => {
  try {
    const dataDir = path.dirname(DB_FILE_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const dataToSave = {
      users: db.users,
      products: db.products,
      orders: db.orders,
      passwords: Array.from(passwords.entries()),
      sessions: Array.from(db.sessions.entries()).map(([token, session]) => ([
        token,
        {
          userId: session.userId,
          expiresAt: session.expiresAt.toISOString(),
        },
      ])),
    }
    
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(dataToSave, null, 2))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error)
  }
}

// Fonction pour charger les données
const loadData = () => {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8')
      const data = JSON.parse(fileContent)
      
      if (data.users) {
        db.users = data.users.map((u: any) => ({
          ...u,
          createdAt: new Date(u.createdAt),
        }))
      }
      
      if (data.products) {
        db.products = data.products.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        }))
      }
      
      if (data.orders) {
        db.orders = data.orders.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
        }))
      }
      
      if (data.passwords) {
        data.passwords.forEach(([email, hash]: [string, string]) => {
          passwords.set(email, hash)
        })
      }
      
      if (data.sessions) {
        data.sessions.forEach(([token, session]: [string, any]) => {
          db.sessions.set(token, {
            userId: session.userId,
            expiresAt: new Date(session.expiresAt),
          })
        })
      }
      
      console.log('✅ Données chargées depuis le fichier')
    } else {
      console.log('📝 Aucun fichier de données trouvé, utilisation des données par défaut')
      saveData() // Sauvegarder les données par défaut
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des données:', error)
  }
}

// Charger les données au démarrage
loadData()

export const mockDB = {
  // Users
  findUserByEmail: (email: string): User | undefined => {
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  },

  findUserById: (id: string): User | undefined => {
    return db.users.find(u => u.id === id)
  },

  getAllUsers: (): User[] => {
    return [...db.users]
  },

  deleteUser: (id: string): boolean => {
    const index = db.users.findIndex(u => u.id === id)
    if (index === -1) return false
    const user = db.users[index]
    passwords.delete(user.email)
    db.users.splice(index, 1)
    saveData() // Sauvegarder après suppression
    return true
  },

  createUser: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): User => {
    const { password, ...userDataWithoutPassword } = userData
    const newUser: User = {
      ...userDataWithoutPassword,
      id: (db.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.users.push(newUser)
    passwords.set(userData.email, hashPassword(password))
    saveData() // Sauvegarder après création
    return newUser
  },

  verifyUserPassword: (email: string, password: string): boolean => {
    const hash = passwords.get(email)
    return hash ? verifyPassword(password, hash) : false
  },

  // Sessions
  createSession: (userId: string): string => {
    const token = generateToken()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 jours
    db.sessions.set(token, { userId, expiresAt })
    saveData() // Sauvegarder après création de session
    return token
  },

  getSession: (token: string): { userId: string; expiresAt: Date } | undefined => {
    const session = db.sessions.get(token)
    if (session && session.expiresAt > new Date()) {
      return session
    }
    if (session) {
      db.sessions.delete(token) // Supprimer session expirée
      saveData() // Sauvegarder après suppression
    }
    return undefined
  },

  deleteSession: (token: string): void => {
    db.sessions.delete(token)
    saveData() // Sauvegarder après suppression de session
  },

  // Products
  getAllProducts: (): Product[] => {
    return [...db.products]
  },

  getProductById: (id: string): Product | undefined => {
    return db.products.find(p => p.id === id)
  },

  getProductsByFarmer: (farmerId: string): Product[] => {
    return db.products.filter(p => p.farmerId === farmerId)
  },

  createProduct: (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: (db.products.length + 1).toString(),
      createdAt: new Date(),
    }
    db.products.push(newProduct)
    saveData() // Sauvegarder après création
    return newProduct
  },

  updateProduct: (id: string, updates: Partial<Product>): Product | undefined => {
    const index = db.products.findIndex(p => p.id === id)
    if (index === -1) return undefined
    db.products[index] = { ...db.products[index], ...updates }
    saveData() // Sauvegarder après mise à jour
    return db.products[index]
  },

  deleteProduct: (id: string): boolean => {
    const index = db.products.findIndex(p => p.id === id)
    if (index === -1) return false
    db.products.splice(index, 1)
    saveData() // Sauvegarder après suppression
    return true
  },

  // Orders
  // Helper pour enrichir les commandes avec les données produit
  enrichOrderWithProducts: (order: any) => {
    return {
      ...order,
      items: order.items.map((item: any) => {
        const product = db.products.find(p => p.id === item.productId)
        return {
          ...item,
          product: product || null
        }
      })
    }
  },

  getAllOrders: (): any[] => {
    return db.orders.map(mockDB.enrichOrderWithProducts)
  },

  getOrderById: (id: string): any | undefined => {
    const order = db.orders.find(o => o.id === id)
    return order ? mockDB.enrichOrderWithProducts(order) : undefined
  },

  getOrdersByBuyer: (buyerId: string): any[] => {
    return db.orders
      .filter(o => o.buyerId === buyerId)
      .map(mockDB.enrichOrderWithProducts)
  },

  getOrdersByFarmer: (farmerId: string): any[] => {
    return db.orders
      .filter(o => 
        o.items.some(item => {
          const product = db.products.find(p => p.id === item.productId)
          return product?.farmerId === farmerId
        })
      )
      .map(mockDB.enrichOrderWithProducts)
  },

  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${db.orders.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    db.orders.push(newOrder)
    
    // Mettre à jour le stock
    orderData.items.forEach(item => {
      const product = db.products.find(p => p.id === item.productId)
      if (product) {
        product.stock -= item.quantity
      }
    })
    
    saveData() // Sauvegarder après création
    return newOrder
  },

  updateOrderStatus: (id: string, status: string): Order | undefined => {
    const order = db.orders.find(o => o.id === id)
    if (!order) return undefined
    order.status = status
    order.updatedAt = new Date()
    saveData() // Sauvegarder après mise à jour
    return order
  },

  // Stats
  getStats: () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return {
      totalUsers: db.users.length,
      totalFarmers: db.users.filter(u => u.role === 'farmer').length,
      totalBuyers: db.users.filter(u => u.role === 'buyer').length,
      totalLogistics: db.users.filter(u => u.role === 'logistics').length,
      totalProducts: db.products.length,
      totalOrders: db.orders.length,
      totalRevenue: db.orders.reduce((sum, o) => sum + o.totalAmount, 0),
      activeOrders: db.orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
      pendingOrders: db.orders.filter(o => o.status === 'pending').length,
      lowStockProducts: db.products.filter(p => p.stock > 0 && p.stock <= 10).length,
      newUsersToday: db.users.filter(u => new Date(u.createdAt) >= today).length,
      ordersToday: db.orders.filter(o => new Date(o.createdAt) >= today).length,
    }
  },
}
