import { format, formatDistance, formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

export const formatDate = (date: Date | string, formatStr: string = 'PPP'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: fr })
}

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'PPP à HH:mm')
}

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: fr })
}

export const formatRelativeFull = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatRelative(dateObj, new Date(), { locale: fr })
}

export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

export const daysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
