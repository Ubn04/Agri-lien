'use client'

import { useState, useEffect } from 'react'

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    // Check initial state
    setIsOffline(!navigator.onLine)

    const handleOnline = () => {
      setIsOffline(false)
      setWasOffline(true)
      
      // Clear the flag after showing reconnection message
      setTimeout(() => setWasOffline(false), 3000)
    }

    const handleOffline = () => {
      setIsOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOffline,
    isOnline: !isOffline,
    wasOffline,
  }
}
