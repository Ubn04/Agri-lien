import { apiService } from './api'
import { Order, OrderStatus } from '@/lib/types'

interface CreateOrderData {
  items: Array<{
    productId: string
    quantity: number
  }>
  deliveryAddress: string
  notes?: string
}

class OrdersService {
  async getOrders(userId?: string, status?: OrderStatus): Promise<Order[]> {
    const queryParams = new URLSearchParams()
    if (userId) queryParams.append('userId', userId)
    if (status) queryParams.append('status', status)

    const url = `/orders${queryParams.toString() ? `?${queryParams}` : ''}`
    return apiService.get<Order[]>(url)
  }

  async getOrderById(id: string): Promise<Order> {
    return apiService.get<Order>(`/orders/${id}`)
  }

  async createOrder(orderData: CreateOrderData): Promise<{ orderId: string; orderNumber: string }> {
    return apiService.post<{ orderId: string; orderNumber: string }>('/orders', orderData)
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    return apiService.patch<void>(`/orders/${orderId}/status`, { status })
  }

  async cancelOrder(orderId: string, reason?: string): Promise<void> {
    return apiService.post<void>(`/orders/${orderId}/cancel`, { reason })
  }

  async assignLogistics(orderId: string, logisticsId: string): Promise<void> {
    return apiService.post<void>(`/orders/${orderId}/assign-logistics`, { logisticsId })
  }

  async trackOrder(orderId: string): Promise<any> {
    return apiService.get<any>(`/orders/${orderId}/track`)
  }

  async getFarmerOrders(farmerId: string): Promise<Order[]> {
    return apiService.get<Order[]>(`/farmers/${farmerId}/orders`)
  }

  async getBuyerOrders(buyerId: string): Promise<Order[]> {
    return apiService.get<Order[]>(`/buyers/${buyerId}/orders`)
  }

  async getLogisticsDeliveries(logisticsId: string): Promise<Order[]> {
    return apiService.get<Order[]>(`/logistics/${logisticsId}/deliveries`)
  }
}

export const ordersService = new OrdersService()
