import { mockDB } from '@/lib/db/mock-database'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log('🔐 Tentative de connexion pour:', email)

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Vérifier l'utilisateur
    const user = mockDB.findUserByEmail(email)
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', email)
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }
    
    console.log('✅ Utilisateur trouvé:', user.email, '- Rôle:', user.role)

    // Vérifier le mot de passe
    const isPasswordValid = mockDB.verifyUserPassword(email, password)
    console.log('🔑 Mot de passe valide:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('❌ Mot de passe incorrect pour:', email)
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Créer une session
    const token = mockDB.createSession(user.id)
    console.log('🎫 Session créée, token:', token.substring(0, 10) + '...')

    // Définir le cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })
    
    console.log('✅ Connexion réussie pour:', email)

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la connexion' },
      { status: 500 }
    )
  }
}
