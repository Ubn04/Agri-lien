export interface Order {
  id: string
  orderNumber: string
  buyerId: string
  farmerId: string
  logisticsId?: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  deliveryAddress: string
  deliveryDate?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unit: string
  pricePerUnit: number
  subtotal: number
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'processing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  IN_TRANSIT = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
}

export interface CartItem {
  productId: string
  productName: string
  farmerId: string
  farmerName: string
  quantity: number
  unit: string
  pricePerUnit: number
  subtotal: number
  image?: string
}
