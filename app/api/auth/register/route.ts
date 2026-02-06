import { mockDB } from '@/lib/db/mock-database'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    // Validation
    const { email, password, firstName, lastName, phone, role } = userData
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      return NextResponse.json(
        { success: false, message: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = mockDB.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Un compte avec cet email existe déjà' },
        { status: 400 }
      )
    }

    // Créer l'utilisateur
    const newUser = mockDB.createUser(userData)

    // Créer une session automatiquement après inscription
    const token = mockDB.createSession(newUser.id)

    // Définir le cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie',
      data: {
        user: newUser,
        token,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}
