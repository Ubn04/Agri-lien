'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data.user) {
          setUser(data.data.user)
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Échec de la connexion')
    }

    setUser(data.data.user)

    // Attendre un court instant pour que le cookie soit bien défini
    await new Promise(resolve => setTimeout(resolve, 100))

    // Rediriger selon le rôle
    switch (data.data.user.role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'farmer':
        router.push('/farmer/dashboard')
        break
      case 'buyer':
        router.push('/buyer/dashboard')
        break
      case 'logistics':
        router.push('/logistics/dashboard')
        break
      default:
        router.push('/')
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const register = async (data: any) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Échec de l\'inscription')
    }

    setUser(result.data.user)

    // Rediriger selon le rôle
    switch (result.data.user.role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'farmer':
        router.push('/farmer/dashboard')
        break
      case 'buyer':
        router.push('/buyer/dashboard')
        break
      case 'logistics':
        router.push('/logistics/dashboard')
        break
      default:
        router.push('/')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
