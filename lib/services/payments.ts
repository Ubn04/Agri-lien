import { apiService } from './api'
import { Payment, PaymentMethod, PaymentProvider } from '@/lib/types'

interface InitiatePaymentData {
  orderId: string
  amount: number
  method: PaymentMethod
  provider: PaymentProvider
  phoneNumber?: string
}

class PaymentsService {
  async initiatePayment(paymentData: InitiatePaymentData): Promise<{ paymentId: string; paymentUrl?: string }> {
    return apiService.post<{ paymentId: string; paymentUrl?: string }>('/payments/initiate', paymentData)
  }

  async verifyPayment(paymentId: string): Promise<Payment> {
    return apiService.get<Payment>(`/payments/${paymentId}/verify`)
  }

  async getPaymentStatus(paymentId: string): Promise<{ status: string }> {
    return apiService.get<{ status: string }>(`/payments/${paymentId}/status`)
  }

  async processRefund(paymentId: string, reason?: string): Promise<void> {
    return apiService.post<void>(`/payments/${paymentId}/refund`, { reason })
  }

  async getPaymentHistory(userId: string): Promise<Payment[]> {
    return apiService.get<Payment[]>(`/payments/history?userId=${userId}`)
  }

  // Mobile Money specific
  async initiateMoMoPayment(data: {
    orderId: string
    amount: number
    phoneNumber: string
    provider: 'MTN_MOMO' | 'MOOV_MONEY' | 'CELTIIS'
  }): Promise<{ transactionId: string; message: string }> {
    return apiService.post<{ transactionId: string; message: string }>('/payments/mobile-money', data)
  }

  async checkMoMoStatus(transactionId: string): Promise<{ status: string; message: string }> {
    return apiService.get<{ status: string; message: string }>(`/payments/mobile-money/${transactionId}/status`)
  }
}

export const paymentsService = new PaymentsService()
