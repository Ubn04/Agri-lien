import { db } from '../db'
import { Order, OrderStatus, OrderItem, PaymentStatus } from '../types/order'
import { UserRole } from '../types/user'
import ProductService from './productService'
import { v4 as uuidv4 } from 'uuid'

export interface CreateOrderData {
  buyerId: string
  items: OrderItem[]
  deliveryAddress: string
  deliveryDate?: Date
  notes?: string
}

export interface OrderFilters {
  buyerId?: string
  farmerId?: string
  logisticsId?: string
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  dateFrom?: Date
  dateTo?: Date
}

export class OrderService {
  // Créer une commande
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    return await db.transaction(async (client) => {
      // Calculer le total et vérifier la disponibilité
      let subtotal = 0
      const validatedItems: OrderItem[] = []
      
      for (const item of orderData.items) {
        const product = await ProductService.getProductById(item.productId)
        
        if (!product) {
          throw new Error(`Produit ${item.productId} introuvable`)
        }
        
        if (product.availableQuantity < item.quantity) {
          throw new Error(`Stock insuffisant pour ${product.name}. Disponible: ${product.availableQuantity}`)
        }
        
        if (item.quantity < product.minimumOrder) {
          throw new Error(`Commande minimum pour ${product.name}: ${product.minimumOrder} ${product.unit}`)
        }
        
        const itemTotal = product.pricePerUnit * item.quantity
        subtotal += itemTotal
        
        validatedItems.push({
          ...item,
          productName: product.name,
          price: product.pricePerUnit,
          unit: product.unit
        })
      }
      
      // Générer un numéro de commande unique
      const orderNumber = await this.generateOrderNumber()
      
      // Obtenir le fermier (on assume qu'une commande concerne un seul fermier pour l'instant)
      const firstProduct = await ProductService.getProductById(validatedItems[0].productId)
      const farmerId = firstProduct!.farmerId
      
      // Calculer les frais de livraison (logique simple pour l'exemple)
      const deliveryFee = 0 // Peut être calculé selon la distance, le poids, etc.
      const totalAmount = subtotal + deliveryFee
      
      // Créer la commande
      const orderQuery = `
        INSERT INTO orders (
          order_number, buyer_id, farmer_id, items, subtotal, 
          delivery_fee, total_amount, status, payment_status,
          delivery_address, delivery_date, notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `
      
      const orderValues = [
        orderNumber,
        orderData.buyerId,
        farmerId,
        JSON.stringify(validatedItems),
        subtotal,
        deliveryFee,
        totalAmount,
        OrderStatus.PENDING,
        PaymentStatus.PENDING,
        orderData.deliveryAddress,
        orderData.deliveryDate || null,
        orderData.notes || null
      ]
      
      const orderResult = await client.query<any>(orderQuery, orderValues)
      const order = orderResult.rows[0]
      
      // Réduire les quantités des produits
      for (const item of validatedItems) {
        await ProductService.reduceQuantity(item.productId, item.quantity)
      }
      
      return this.mapOrderFromDb(order)
    })
  }

  // Obtenir une commande par ID
  static async getOrderById(id: string): Promise<Order | null> {
    const query = `
      SELECT 
        o.*,
        ub.first_name || ' ' || ub.last_name as buyer_name,
        ub.phone as buyer_phone,
        uf.first_name || ' ' || uf.last_name as farmer_name,
        uf.phone as farmer_phone,
        fp.farm_name,
        ul.first_name || ' ' || ul.last_name as logistics_name
      FROM orders o
      JOIN users ub ON o.buyer_id = ub.id
      JOIN users uf ON o.farmer_id = uf.id
      JOIN farmer_profiles fp ON uf.id = fp.user_id
      LEFT JOIN users ul ON o.logistics_id = ul.id
      WHERE o.id = $1
    `
    
    const result = await db.query(query, [id])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapOrderFromDb(result.rows[0])
  }

  // Obtenir les commandes avec filtres et pagination
  static async getOrders(
    filters: OrderFilters = {},
    page: number = 1,
    limit: number = 10
  ): Promise<{ orders: Order[]; total: number }> {
    const offset = (page - 1) * limit
    
    let whereConditions: string[] = []
    let values: any[] = []
    let valueIndex = 1
    
    if (filters.buyerId) {
      whereConditions.push(`o.buyer_id = $${valueIndex}`)
      values.push(filters.buyerId)
      valueIndex++
    }
    
    if (filters.farmerId) {
      whereConditions.push(`o.farmer_id = $${valueIndex}`)
      values.push(filters.farmerId)
      valueIndex++
    }
    
    if (filters.logisticsId) {
      whereConditions.push(`o.logistics_id = $${valueIndex}`)
      values.push(filters.logisticsId)
      valueIndex++
    }
    
    if (filters.status) {
      whereConditions.push(`o.status = $${valueIndex}`)
      values.push(filters.status)
      valueIndex++
    }
    
    if (filters.paymentStatus) {
      whereConditions.push(`o.payment_status = $${valueIndex}`)
      values.push(filters.paymentStatus)
      valueIndex++
    }
    
    if (filters.dateFrom) {
      whereConditions.push(`o.created_at >= $${valueIndex}`)
      values.push(filters.dateFrom)
      valueIndex++
    }
    
    if (filters.dateTo) {
      whereConditions.push(`o.created_at <= $${valueIndex}`)
      values.push(filters.dateTo)
      valueIndex++
    }
    
    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : ''
    
    const query = `
      SELECT 
        o.*,
        ub.first_name || ' ' || ub.last_name as buyer_name,
        ub.phone as buyer_phone,
        uf.first_name || ' ' || uf.last_name as farmer_name,
        uf.phone as farmer_phone,
        fp.farm_name,
        ul.first_name || ' ' || ul.last_name as logistics_name
      FROM orders o
      JOIN users ub ON o.buyer_id = ub.id
      JOIN users uf ON o.farmer_id = uf.id
      JOIN farmer_profiles fp ON uf.id = fp.user_id
      LEFT JOIN users ul ON o.logistics_id = ul.id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `
    
    const countQuery = `
      SELECT COUNT(*) as total
      FROM orders o
      JOIN users ub ON o.buyer_id = ub.id
      JOIN users uf ON o.farmer_id = uf.id
      ${whereClause}
    `
    
    values.push(limit, offset)
    
    const [ordersResult, countResult] = await Promise.all([
      db.query(query, values),
      db.query<{ total: string }>(countQuery, values.slice(0, -2))
    ])
    
    return {
      orders: ordersResult.rows.map(row => this.mapOrderFromDb(row)),
      total: parseInt(countResult.rows[0].total)
    }
  }

  // Mettre à jour le statut d'une commande
  static async updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
    const query = `
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `
    
    const result = await db.query<any>(query, [status, id])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapOrderFromDb(result.rows[0])
  }

  // Mettre à jour le statut de paiement
  static async updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null> {
    const query = `
      UPDATE orders 
      SET payment_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `
    
    const result = await db.query<any>(query, [paymentStatus, id])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapOrderFromDb(result.rows[0])
  }

  // Assigner un livreur à une commande
  static async assignLogistics(orderId: string, logisticsId: string): Promise<Order | null> {
    const query = `
      UPDATE orders 
      SET logistics_id = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `
    
    const result = await db.query<any>(query, [logisticsId, orderId])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapOrderFromDb(result.rows[0])
  }

  // Obtenir les statistiques des commandes
  static async getOrderStats(userId?: string, role?: string): Promise<any> {
    let whereClause = ''
    const values: any[] = []
    
    if (userId && role) {
      if (role === UserRole.FARMER) {
        whereClause = 'WHERE farmer_id = $1'
      } else if (role === UserRole.BUYER) {
        whereClause = 'WHERE buyer_id = $1'
      } else if (role === UserRole.LOGISTICS) {
        whereClause = 'WHERE logistics_id = $1'
      }
      values.push(userId)
    }
    
    const query = `
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN status = 'CONFIRMED' THEN 1 END) as confirmed_orders,
        COUNT(CASE WHEN status = 'IN_TRANSIT' THEN 1 END) as in_transit_orders,
        COUNT(CASE WHEN status = 'DELIVERED' THEN 1 END) as delivered_orders,
        COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) as cancelled_orders,
        COUNT(CASE WHEN payment_status = 'COMPLETED' THEN 1 END) as paid_orders,
        SUM(CASE WHEN payment_status = 'COMPLETED' THEN total_amount ELSE 0 END) as total_revenue,
        AVG(total_amount) as average_order_value
      FROM orders
      ${whereClause}
    `
    
    const result = await db.query(query, values)
    return result.rows[0]
  }

  // Annuler une commande
  static async cancelOrder(id: string, reason?: string): Promise<Order | null> {
    return await db.transaction(async (client) => {
      // Obtenir la commande
      const orderQuery = 'SELECT * FROM orders WHERE id = $1'
      const orderResult = await client.query<any>(orderQuery, [id])
      
      if (orderResult.rows.length === 0) {
        throw new Error('Commande introuvable')
      }
      
      const order = orderResult.rows[0]
      
      // Vérifier si la commande peut être annulée
      if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
        throw new Error('Cette commande ne peut plus être annulée')
      }
      
      // Restaurer les quantités des produits
      const items = JSON.parse(order.items)
      for (const item of items) {
        const restoreQuery = `
          UPDATE products 
          SET available_quantity = available_quantity + $1,
              total_sales = total_sales - $1,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
        `
        await client.query(restoreQuery, [item.quantity, item.productId])
      }
      
      // Mettre à jour la commande
      const updateQuery = `
        UPDATE orders 
        SET status = 'CANCELLED', notes = COALESCE(notes || '. ', '') || 'Annulée: ' || $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `
      
      const updateResult = await client.query<any>(updateQuery, [reason || 'Aucune raison fournie', id])
      
      return this.mapOrderFromDb(updateResult.rows[0])
    })
  }

  // Générer un numéro de commande unique
  private static async generateOrderNumber(): Promise<string> {
    const prefix = 'CMD'
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    
    return `${prefix}-${timestamp}-${random}`
  }

  // Mapper les données de la base vers l'objet Order
  private static mapOrderFromDb(row: any): Order {
    return {
      id: row.id,
      orderNumber: row.order_number,
      buyerId: row.buyer_id,
      farmerId: row.farmer_id,
      logisticsId: row.logistics_id,
      items: JSON.parse(row.items),
      subtotal: parseFloat(row.subtotal),
      deliveryFee: parseFloat(row.delivery_fee || 0),
      totalAmount: parseFloat(row.total_amount),
      status: row.status as OrderStatus,
      paymentStatus: row.payment_status as PaymentStatus,
      deliveryAddress: row.delivery_address,
      deliveryDate: row.delivery_date,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      // Données des utilisateurs
      buyerName: row.buyer_name,
      buyerPhone: row.buyer_phone,
      farmerName: row.farmer_name,
      farmerPhone: row.farmer_phone,
      farmName: row.farm_name,
      logisticsName: row.logistics_name
    } as Order
  }
}

export default OrderService