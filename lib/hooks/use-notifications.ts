'use client'

import { useState, useEffect, useCallback } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchNotifications()
      // Setup real-time updates if WebSocket available
      // setupWebSocket()
    }
  }, [userId])

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      })
      
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
    } catch (err) {
      console.error('Failed to mark notification as read', err)
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
      })
      
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      )
    } catch (err) {
      console.error('Failed to mark all notifications as read', err)
    }
  }, [])

  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      })
      
      setNotifications(prev =>
        prev.filter(n => n.id !== notificationId)
      )
    } catch (err) {
      console.error('Failed to delete notification', err)
    }
  }, [])

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  }
}
