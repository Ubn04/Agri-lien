export interface Product {
  id: string
  farmerId: string
  name: string
  category: ProductCategory
  description: string
  images: string[]
  unit: Unit
  pricePerUnit: number
  availableQuantity: number
  minimumOrder: number
  harvestDate?: Date
  expiryDate?: Date
  certifications: string[]
  status: ProductStatus
  rating: number
  totalSales: number
  createdAt: Date
  updatedAt: Date
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
