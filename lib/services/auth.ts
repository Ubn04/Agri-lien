import { apiService } from './api'
import { User } from '@/lib/types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  role: string
  [key: string]: any
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await apiService.post<any>('/auth/login', credentials)
    
    if (response.success && response.data.token) {
      this.setToken(response.data.token)
    }
    
    return response.data
  }

  async register(userData: RegisterData): Promise<{ userId: string }> {
    const response = await apiService.post<any>('/auth/register', userData)
    return response.data
  }

  async logout(): Promise<void> {
    await apiService.post('/auth/logout')
    this.clearToken()
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<any>('/auth/me')
      return response.data
    } catch (error) {
      return null
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await apiService.post('/auth/forgot-password', { email })
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/reset-password', { token, newPassword })
  }

  async verifyEmail(token: string): Promise<void> {
    await apiService.post('/auth/verify-email', { token })
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
