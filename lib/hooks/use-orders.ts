'use client'

import { useState, useEffect } from 'react'
import { Order } from '@/lib/types'

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [userId])

  const fetchOrders = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const queryParams = userId ? `?userId=${userId}` : ''
      const response = await fetch(`/api/orders${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await response.json()
      setOrders(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setIsLoading(false)
    }
  }

  const createOrder = async (orderData: any) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()
      await fetchOrders() // Refresh list
      return data
    } catch (err) {
      throw err
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update order')
      }

      await fetchOrders() // Refresh list
    } catch (err) {
      throw err
    }
  }

  const cancelOrder = async (orderId: string) => {
    return updateOrderStatus(orderId, 'CANCELLED')
  }

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
  }
}
