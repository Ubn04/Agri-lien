export const APP_NAME = 'Agri-Lien'
export const APP_DESCRIPTION = 'Connectons les Fermiers Béninois'

export const ROLES = {
  FARMER: 'FARMER',
  BUYER: 'BUYER',
  LOGISTICS: 'LOGISTICS',
  ADMIN: 'ADMIN',
} as const

export const ORDER_STATUSES = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmée',
  PREPARING: 'En préparation',
  READY_FOR_PICKUP: 'Prête pour enlèvement',
  IN_TRANSIT: 'En transit',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
  REFUNDED: 'Remboursée',
} as const

export const PAYMENT_STATUSES = {
  PENDING: 'En attente',
  PROCESSING: 'En cours',
  COMPLETED: 'Complété',
  FAILED: 'Échoué',
  REFUNDED: 'Remboursé',
  CANCELLED: 'Annulé',
} as const

export const PRODUCT_CATEGORIES = {
  VEGETABLES: 'Légumes',
  FRUITS: 'Fruits',
  CEREALS: 'Céréales',
  TUBERS: 'Tubercules',
  LEGUMES: 'Légumineuses',
  SPICES: 'Épices',
  NUTS: 'Noix',
  OTHER: 'Autre',
} as const

export const UNITS = {
  KG: 'Kilogramme',
  GRAM: 'Gramme',
  TON: 'Tonne',
  PIECE: 'Pièce',
  BUNDLE: 'Botte',
  SACK: 'Sac',
  LITER: 'Litre',
} as const

export const CURRENCY = 'XOF'
export const CURRENCY_SYMBOL = 'FCFA'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES: 5,
} as const

export const BENIN_REGIONS = [
  'Alibori',
  'Atacora',
  'Atlantique',
  'Borgou',
  'Collines',
  'Couffo',
  'Donga',
  'Littoral',
  'Mono',
  'Ouémé',
  'Plateau',
  'Zou',
] as const

export const BUSINESS_TYPES = {
  RESTAURANT: 'Restaurant',
  HOTEL: 'Hôtel',
  SUPERMARKET: 'Supermarché',
  DISTRIBUTOR: 'Distributeur',
  OTHER: 'Autre',
} as const
