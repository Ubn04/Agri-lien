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
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
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
