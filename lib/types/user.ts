export interface User {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  LOGISTICS = 'LOGISTICS',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
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
  RESTAURANT = 'RESTAURANT',
  HOTEL = 'HOTEL',
  SUPERMARKET = 'SUPERMARKET',
  DISTRIBUTOR = 'DISTRIBUTOR',
  OTHER = 'OTHER',
}

export interface LogisticsProfile extends User {
  companyName: string
  vehicleTypes: VehicleType[]
  coverageAreas: string[]
  rating: number
  totalDeliveries: number
}

export enum VehicleType {
  MOTORCYCLE = 'MOTORCYCLE',
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
}

export interface Location {
  address: string
  city: string
  region: string
  country: string
  latitude: number
  longitude: number
}
