export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  method: PaymentMethod
  provider: PaymentProvider
  status: PaymentStatus
  transactionId?: string
  phoneNumber?: string
  metadata?: Record<string, any>
  createdAt: Date
  completedAt?: Date
}

export enum PaymentMethod {
  MOBILE_MONEY = 'MOBILE_MONEY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  CARD = 'CARD',
}

export enum PaymentProvider {
  MTN_MOMO = 'MTN_MOMO',
  MOOV_MONEY = 'MOOV_MONEY',
  CELTIIS = 'CELTIIS',
  BANK = 'BANK',
  CASH = 'CASH',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}
