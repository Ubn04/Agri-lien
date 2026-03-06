export interface Product {
  id: string
  farmerId: string
  farmer_id?: string // Version DB snake_case
  name: string
  category: ProductCategory
  description: string
  images: string[]
  unit: Unit
  pricePerUnit: number
  price_per_unit?: number // Version DB snake_case
  availableQuantity: number
  available_quantity?: number // Version DB snake_case
  minimumOrder: number
  minimum_order?: number // Version DB snake_case
  harvestDate?: Date
  harvest_date?: Date // Version DB snake_case
  expiryDate?: Date
  expiry_date?: Date // Version DB snake_case
  certifications: string[]
  status: ProductStatus
  rating: number
  totalSales: number
  total_sales?: number // Version DB snake_case
  createdAt: Date
  created_at?: Date // Version DB snake_case
  updatedAt: Date
  updated_at?: Date // Version DB snake_case
}

export enum ProductCategory {
  VEGETABLES = 'VEGETABLES',
  FRUITS = 'FRUITS',
  CEREALS = 'CEREALS',
  TUBERS = 'TUBERS',
  LEGUMES = 'LEGUMES',
  SPICES = 'SPICES',
  NUTS = 'NUTS',
  OTHER = 'OTHER',
}

export enum Unit {
  KG = 'KG',
  GRAM = 'GRAM',
  TON = 'TON',
  PIECE = 'PIECE',
  BUNDLE = 'BUNDLE',
  SACK = 'SACK',
  LITER = 'LITER',
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  COMING_SOON = 'COMING_SOON',
  DISCONTINUED = 'DISCONTINUED',
}

export interface ProductFilter {
  category?: ProductCategory
  minPrice?: number
  maxPrice?: number
  location?: string
  searchQuery?: string
  sortBy?: 'price' | 'rating' | 'date'
  sortOrder?: 'asc' | 'desc'
}
