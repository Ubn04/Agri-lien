import { z } from 'zod'

export const emailSchema = z.string().email('Email invalide')

export const phoneSchema = z
  .string()
  .regex(/^(\+229|00229)?[0-9]{8}$/, 'Numéro de téléphone invalide')

export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')

export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success
}

export const validatePhone = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success
}

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success
}

export const normalizePhone = (phone: string): string => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')
  
  // Remove country code if present
  if (cleaned.startsWith('229')) {
    cleaned = cleaned.slice(3)
  }
  
  // Add country code
  return `+229${cleaned}`
}
