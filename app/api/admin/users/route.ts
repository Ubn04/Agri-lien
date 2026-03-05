import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// GET - Récupérer tous les utilisateurs (Admin uniquement)
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const session = mockDB.getSession(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Session invalide' },
        { status: 401 }
      )
    }

    const user = mockDB.findUserById(session.userId)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès refusé - Admin uniquement' },
        { status: 403 }
      )
    }

    const users = mockDB.getAllUsers()

    return NextResponse.json({
      success: true,
      data: {
        users,
        total: users.length,
      },
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}
