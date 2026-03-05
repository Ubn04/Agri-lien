export const formatCurrency = (amount: number, currency: string = 'XOF'): string => {
  return new Intl.NumberFormat('fr-BJ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-BJ').format(value)
}

export const formatPhone = (phone: string): string => {
  // Format: +229 XX XX XX XX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('229')) {
    const local = cleaned.slice(3)
    return `+229 ${local.slice(0, 2)} ${local.slice(2, 4)} ${local.slice(4, 6)} ${local.slice(6, 8)}`
  }
  return phone
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatAddress = (address: {
  address: string
  city: string
  region: string
}): string => {
  return `${address.address}, ${address.city}, ${address.region}`
}

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
