import { db } from '../db'
import { Product, ProductCategory, ProductStatus } from '../types/product'
import { v4 as uuidv4 } from 'uuid'

export interface CreateProductData {
  farmerId: string
  name: string
  category: ProductCategory
  description?: string
  images?: string[]
  unit: string
  pricePerUnit: number
  availableQuantity: number
  minimumOrder?: number
  harvestDate?: Date
  expiryDate?: Date
  certifications?: string[]
}

export interface UpdateProductData {
  name?: string
  description?: string
  images?: string[]
  pricePerUnit?: number
  availableQuantity?: number
  minimumOrder?: number
  harvestDate?: Date
  expiryDate?: Date
  certifications?: string[]
  status?: ProductStatus
}

export interface ProductFilters {
  category?: ProductCategory
  farmerId?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  available?: boolean
  search?: string
}

export class ProductService {
  // Créer un produit
  static async createProduct(productData: CreateProductData): Promise<Product> {
    const query = `
      INSERT INTO products (
        farmer_id, name, category, description, images, unit,
        price_per_unit, available_quantity, minimum_order,
        harvest_date, expiry_date, certifications, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'AVAILABLE')
      RETURNING *
    `
    
    const values = [
      productData.farmerId,
      productData.name,
      productData.category,
      productData.description || null,
      productData.images || [],
      productData.unit,
      productData.pricePerUnit,
      productData.availableQuantity,
      productData.minimumOrder || 1,
      productData.harvestDate || null,
      productData.expiryDate || null,
      productData.certifications || []
    ]
    
    const result = await db.query<any>(query, values)
    return this.mapProductFromDb(result.rows[0])
  }

  // Obtenir un produit par ID
  static async getProductById(id: string): Promise<Product | null> {
    const query = `
      SELECT 
        p.*,
        u.first_name || ' ' || u.last_name as farmer_name,
        fp.farm_name,
        fp.farm_location
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      JOIN farmer_profiles fp ON u.id = fp.user_id
      WHERE p.id = $1
    `
    
    const result = await db.query(query, [id])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapProductFromDb(result.rows[0])
  }

  // Obtenir les produits avec filtres et pagination
  static async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number }> {
    const offset = (page - 1) * limit
    
    let whereConditions: string[] = ["p.status = 'AVAILABLE'"]
    let values: any[] = []
    let valueIndex = 1
    
    if (filters.category) {
      whereConditions.push(`p.category = $${valueIndex}`)
      values.push(filters.category)
      valueIndex++
    }
    
    if (filters.farmerId) {
      whereConditions.push(`p.farmer_id = $${valueIndex}`)
      values.push(filters.farmerId)
      valueIndex++
    }
    
    if (filters.minPrice) {
      whereConditions.push(`p.price_per_unit >= $${valueIndex}`)
      values.push(filters.minPrice)
      valueIndex++
    }
    
    if (filters.maxPrice) {
      whereConditions.push(`p.price_per_unit <= $${valueIndex}`)
      values.push(filters.maxPrice)
      valueIndex++
    }
    
    if (filters.available) {
      whereConditions.push(`p.available_quantity > 0`)
    }
    
    if (filters.search) {
      whereConditions.push(`(
        p.name ILIKE $${valueIndex} OR 
        p.description ILIKE $${valueIndex} OR
        fp.farm_name ILIKE $${valueIndex}
      )`)
      values.push(`%${filters.search}%`)
      valueIndex++
    }
    
    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}`
      : ''
    
    const query = `
      SELECT 
        p.*,
        u.first_name || ' ' || u.last_name as farmer_name,
        fp.farm_name,
        fp.farm_location
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      JOIN farmer_profiles fp ON u.id = fp.user_id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `
    
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      JOIN farmer_profiles fp ON u.id = fp.user_id
      ${whereClause}
    `
    
    values.push(limit, offset)
    
    const [productsResult, countResult] = await Promise.all([
      db.query(query, values),
      db.query<{ total: string }>(countQuery, values.slice(0, -2))
    ])
    
    return {
      products: productsResult.rows.map(row => this.mapProductFromDb(row)),
      total: parseInt(countResult.rows[0].total)
    }
  }

  // Obtenir les produits d'un fermier
  static async getProductsByFarmer(
    farmerId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number }> {
    return this.getProducts({ farmerId }, page, limit)
  }

  // Mettre à jour un produit
  static async updateProduct(id: string, updateData: UpdateProductData): Promise<Product | null> {
    const fields: string[] = []
    const values: any[] = []
    let valueIndex = 1
    
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbField = this.camelToSnake(key)
        fields.push(`${dbField} = $${valueIndex}`)
        values.push(value)
        valueIndex++
      }
    })
    
    if (fields.length === 0) {
      throw new Error('Aucune donnée à mettre à jour')
    }
    
    fields.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)
    
    const query = `
      UPDATE products 
      SET ${fields.join(', ')}
      WHERE id = $${valueIndex}
      RETURNING *
    `
    
    const result = await db.query<any>(query, values)
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapProductFromDb(result.rows[0])
  }

  // Mettre à jour la quantité disponible
  static async updateAvailableQuantity(id: string, quantity: number): Promise<Product | null> {
    const query = `
      UPDATE products 
      SET available_quantity = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `
    
    const result = await db.query<any>(query, [quantity, id])
    
    if (result.rows.length === 0) {
      return null
    }
    
    return this.mapProductFromDb(result.rows[0])
  }

  // Réduire la quantité (lors d'une commande)
  static async reduceQuantity(id: string, quantity: number): Promise<Product | null> {
    const query = `
      UPDATE products 
      SET 
        available_quantity = available_quantity - $1,
        total_sales = total_sales + $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND available_quantity >= $1
      RETURNING *
    `
    
    const result = await db.query<any>(query, [quantity, id])
    
    if (result.rows.length === 0) {
      throw new Error('Stock insuffisant ou produit introuvable')
    }
    
    return this.mapProductFromDb(result.rows[0])
  }

  // Désactiver un produit
  static async deactivateProduct(id: string): Promise<boolean> {
    const query = `
      UPDATE products 
      SET status = 'INACTIVE', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `
    
    const result = await db.query(query, [id])
    return result.rowCount !== null && result.rowCount > 0
  }

  // Obtenir les produits populaires
  static async getPopularProducts(limit: number = 10): Promise<Product[]> {
    const query = `
      SELECT 
        p.*,
        u.first_name || ' ' || u.last_name as farmer_name,
        fp.farm_name,
        fp.farm_location
      FROM products p
      JOIN users u ON p.farmer_id = u.id
      JOIN farmer_profiles fp ON u.id = fp.user_id
      WHERE p.status = 'AVAILABLE' AND p.available_quantity > 0
      ORDER BY p.total_sales DESC, p.rating DESC
      LIMIT $1
    `
    
    const result = await db.query(query, [limit])
    return result.rows.map(row => this.mapProductFromDb(row))
  }

  // Obtenir les statistiques des produits
  static async getProductStats(): Promise<any> {
    const query = `
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN status = 'AVAILABLE' THEN 1 END) as available_products,
        COUNT(CASE WHEN available_quantity = 0 THEN 1 END) as out_of_stock,
        AVG(price_per_unit) as average_price,
        SUM(total_sales) as total_sales_volume
      FROM products
    `
    
    const result = await db.query(query)
    return result.rows[0]
  }

  // Rechercher des produits
  static async searchProducts(
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number }> {
    return this.getProducts({ search: searchTerm }, page, limit)
  }

  // Mapper les données de la base vers l'objet Product
  private static mapProductFromDb(row: any): Product {
    return {
      id: row.id,
      farmerId: row.farmer_id,
      name: row.name,
      category: row.category,
      description: row.description,
      images: row.images || [],
      unit: row.unit,
      pricePerUnit: parseFloat(row.price_per_unit),
      availableQuantity: parseFloat(row.available_quantity),
      minimumOrder: parseFloat(row.minimum_order || 1),
      harvestDate: row.harvest_date,
      expiryDate: row.expiry_date,
      certifications: row.certifications || [],
      status: row.status as ProductStatus,
      rating: parseFloat(row.rating || 0),
      totalSales: parseInt(row.total_sales || 0),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      // Données du fermier
      farmerName: row.farmer_name,
      farmName: row.farm_name,
      farmLocation: row.farm_location
    } as Product
  }

  // Convertir camelCase en snake_case
  private static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }
}

export default ProductService