import { apiService } from './api'
import { Product, ProductFilter, PaginatedResponse } from '@/lib/types'

class ProductsService {
  async getProducts(filters?: ProductFilter): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams()
    
    if (filters?.category) queryParams.append('category', filters.category)
    if (filters?.searchQuery) queryParams.append('search', filters.searchQuery)
    if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString())
    if (filters?.location) queryParams.append('location', filters.location)
    if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) queryParams.append('sortOrder', filters.sortOrder)

    const url = `/products${queryParams.toString() ? `?${queryParams}` : ''}`
    return apiService.get<PaginatedResponse<Product>>(url)
  }

  async getProductById(id: string): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`)
  }

  async createProduct(productData: Partial<Product>): Promise<{ productId: string }> {
    return apiService.post<{ productId: string }>('/products', productData)
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<void> {
    return apiService.put<void>(`/products/${id}`, productData)
  }

  async deleteProduct(id: string): Promise<void> {
    return apiService.delete<void>(`/products/${id}`)
  }

  async uploadProductImages(productId: string, images: File[]): Promise<string[]> {
    const formData = new FormData()
    images.forEach((image) => {
      formData.append('images', image)
    })

    const response = await apiService.post<{ urls: string[] }>(
      `/products/${productId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.urls
  }

  async getFarmerProducts(farmerId: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/farmers/${farmerId}/products`)
  }
}

export const productsService = new ProductsService()
