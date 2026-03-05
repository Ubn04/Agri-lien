/**
 * Middleware Next.js temporairement désactivé pour le développement
 * Version simplifiée qui laisse passer toutes les requêtes
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporairement désactivé - laisser passer toutes les requêtes
  console.log('🔧 Middleware temporairement désactivé pour le développement')
  return NextResponse.next()
}

// Configuration minimale des routes à intercepter
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}