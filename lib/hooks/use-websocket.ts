'use client'

import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseWebSocketOptions {
  url?: string
  autoConnect?: boolean
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001', autoConnect = true } = options
  
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (autoConnect && !socketRef.current) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect])

  const connect = () => {
    if (socketRef.current?.connected) return

    socketRef.current = io(url)

    socketRef.current.on('connect', () => {
      setIsConnected(true)
    })

    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
    })

    socketRef.current.on('message', (data: any) => {
      setLastMessage(data)
    })
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }

  const emit = (event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
    }
  }

  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback)
    }
  }

  const off = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event)
    }
  }

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect,
    emit,
    on,
    off,
  }
}
