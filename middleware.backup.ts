/**
 * Middleware Next.js pour l'authentification et l'autorisation
 * Protège les routes selon les rôles d'utilisateur
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from '@/lib/services'

// Configuration des routes et leurs permissions requises
const routePermissions: Record<string, string[]> = {
  // Routes admin
  '/admin': ['admin'],
  '/api/admin': ['admin'],
  
  // Routes fermiers
  '/farmer': ['farmer'],
  '/api/farmer': ['farmer'],
  
  // Routes acheteurs
  '/buyer': ['buyer'],
  '/api/buyer': ['buyer'],
  
  // Routes logistique
  '/logistics': ['logistics'],
  '/api/logistics': ['logistics'],
  
  // Routes authentifiées (tous les rôles connectés)
  '/profile': ['farmer', 'buyer', 'logistics', 'admin'],
  '/api/orders': ['farmer', 'buyer', 'logistics'],
  '/api/products': ['farmer', 'buyer'],
  '/api/notifications': ['farmer', 'buyer', 'logistics', 'admin'],
}

// Routes publiques (pas besoin d'authentification)
const publicRoutes = [
  '/',
  '/about',
  '/marketplace',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/health',
  '/api/products/public', // Catalogue public
]

// Routes d'assets (images, styles, etc.)
const assetRoutes = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/icons',
  '/manifest.json'
]

/**
 * Vérifier si une route est publique
 */
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => 
    route === pathname || pathname.startsWith(route + '/')
  )
}

/**
 * Vérifier si c'est un asset
 */
function isAssetRoute(pathname: string): boolean {
  return assetRoutes.some(route => pathname.startsWith(route))
}

/**
 * Obtenir les permissions requises pour une route
 */
function getRequiredPermissions(pathname: string): string[] | null {
  // Chercher la route la plus spécifique
  const matchingRoutes = Object.keys(routePermissions)
    .filter(route => pathname.startsWith(route))
    .sort((a, b) => b.length - a.length) // Plus spécifique en premier
  
  return matchingRoutes.length > 0 ? routePermissions[matchingRoutes[0]] : null
}

/**
 * Middleware principal
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignorer les assets et fichiers statiques
  if (isAssetRoute(pathname)) {
    return NextResponse.next()
  }
  
  // Routes publiques
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }
  
  // Obtenir le token d'authentification
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    // Rediriger vers la page de connexion pour les routes web
    if (!pathname.startsWith('/api/')) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Retourner une erreur pour les API
    return NextResponse.json(
      { error: 'Token d\'authentification requis' },
      { status: 401 }
    )
  }
  
  try {
    // Vérifier le token et obtenir l'utilisateur
    const user = await AuthService.getCurrentUser(token)
    
    if (!user) {
      throw new Error('Utilisateur non trouvé ou inactif')
    }
    
    // Vérifier les permissions pour cette route
    const requiredPermissions = getRequiredPermissions(pathname)
    
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = AuthService.validateAccess(user.role, requiredPermissions)
      
      if (!hasPermission) {
        // Redirection selon le rôle pour les routes web
        if (!pathname.startsWith('/api/')) {
          let redirectPath = '/'
          
          switch (user.role) {
            case 'admin':
              redirectPath = '/admin/dashboard'
              break
            case 'farmer':
              redirectPath = '/farmer/dashboard'
              break
            case 'buyer':
              redirectPath = '/buyer/dashboard'
              break
            case 'logistics':
              redirectPath = '/logistics/dashboard'
              break
          }
          
          return NextResponse.redirect(new URL(redirectPath, request.url))
        }
        
        // Erreur d'autorisation pour les API
        return NextResponse.json(
          { error: 'Permissions insuffisantes' },
          { status: 403 }
        )
      }
    }
    
    // Ajouter les informations utilisateur aux headers pour les API routes
    const response = NextResponse.next()
    
    if (pathname.startsWith('/api/')) {
      response.headers.set('x-user-id', user.id)
      response.headers.set('x-user-role', user.role)
      response.headers.set('x-user-email', user.email)
    }
    
    return response
    
  } catch (error) {
    console.error('Erreur middleware auth:', error)
    
    // Token invalide - nettoyer et rediriger
    if (!pathname.startsWith('/api/')) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
    
    // Erreur d'authentification pour les API
    return NextResponse.json(
      { error: 'Token invalide ou expiré' },
      { status: 401 }
    )
  }
}

/**
 * Configuration du matcher
 * Définit les routes où le middleware s'applique
 */
export const config = {
  matcher: [
    /*
     * Matcher pour toutes les routes sauf :
     * - api (gérées individuellement)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images) 
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

/**
 * Hook personnalisé pour obtenir l'utilisateur dans les composants
 */
export function useAuthUser() {
  // Cette fonction sera implémentée côté client
  // Pour accéder aux informations utilisateur depuis les composants React
}