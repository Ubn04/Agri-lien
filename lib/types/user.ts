export interface User {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
  password_hash?: string // Propriété incluse côté serveur seulement
  first_name?: string // Version DB snake_case 
  last_name?: string // Version DB snake_case
  created_at?: Date // Version DB snake_case
  updated_at?: Date // Version DB snake_case
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  FARMER = 'farmer',
  BUYER = 'buyer',
  LOGISTICS = 'logistics',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

export interface FarmerProfile extends User {
  farmName: string
  farmLocation: Location
  farmSize: number
  certifications: string[]
  specialties: string[]
  rating: number
  totalSales: number
}

export interface BuyerProfile extends User {
  businessName: string
  businessType: BusinessType
  location: Location
  taxId?: string
}

export enum BusinessType {
  RESTAURANT = 'restaurant',
  HOTEL = 'hotel',
  SUPERMARKET = 'supermarket',
  DISTRIBUTOR = 'distributor',
  OTHER = 'other',
}

export interface LogisticsProfile extends User {
  companyName: string
  vehicleTypes: VehicleType[]
  coverageAreas: string[]
  rating: number
  totalDeliveries: number
}

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  VAN = 'van',
  TRUCK = 'truck',
}

export interface Location {
  address: string
  city: string
  region: string
  country: string
  latitude: number
  longitude: number
}
