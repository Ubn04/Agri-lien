'use client'

import { useState, useEffect } from 'react'
import { Product, ProductFilter } from '@/lib/types'

export function useProducts(filters?: ProductFilter) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const queryParams = new URLSearchParams()
      
      if (filters?.category) queryParams.append('category', filters.category)
      if (filters?.searchQuery) queryParams.append('search', filters.searchQuery)
      if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString())
      if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString())

      const response = await fetch(`/api/products?${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async (productData: Partial<Product>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      const data = await response.json()
      await fetchProducts() // Refresh list
      return data
    } catch (err) {
      throw err
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      await fetchProducts() // Refresh list
    } catch (err) {
      throw err
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      await fetchProducts() // Refresh list
    } catch (err) {
      throw err
    }
  }

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
