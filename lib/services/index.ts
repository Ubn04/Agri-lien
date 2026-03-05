// Export de tous les services
export { default as UserService } from './userService'
export { default as ProductService } from './productService'  
export { default as OrderService } from './orderService'
export { default as AuthService } from './authService'

// Export des types et interfaces
export type {
  CreateUserData,
  CreateFarmerProfileData,
  CreateBuyerProfileData
} from './userService'

export type {
  CreateProductData,
  UpdateProductData,
  ProductFilters
} from './productService'

export type {
  CreateOrderData,
  OrderFilters
} from './orderService'

export type {
  LoginCredentials,
  AuthTokens,
  JWTPayload
} from './authService'