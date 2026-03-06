export interface Order {
  id: string
  orderNumber: string
  order_number?: string // Version DB snake_case
  buyerId: string
  buyer_id?: string // Version DB snake_case
  farmerId: string
  farmer_id?: string // Version DB snake_case
  logisticsId?: string
  logistics_id?: string // Version DB snake_case
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  delivery_fee?: number // Version DB snake_case
  totalAmount: number
  total_amount?: number // Version DB snake_case
  status: OrderStatus
  paymentStatus: PaymentStatus
  payment_status?: PaymentStatus // Version DB snake_case
  deliveryAddress: string
  delivery_address?: string // Version DB snake_case
  deliveryDate?: Date
  delivery_date?: Date // Version DB snake_case
  notes?: string
  createdAt: Date
  created_at?: Date // Version DB snake_case
  updatedAt: Date
  updated_at?: Date // Version DB snake_case
}

export interface OrderItem {
  productId: string
  product_id?: string // Version DB snake_case
  productName: string
  product_name?: string // Version DB snake_case
  quantity: number
  unit: string
  pricePerUnit: number
  price_per_unit?: number // Version DB snake_case
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
  CANCELLED = 'CANCELLED',
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
