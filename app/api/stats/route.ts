import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET - Récupérer les statistiques
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    const session = mockDB.getSession(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      )
    }

    const stats = mockDB.getStats()

    return NextResponse.json({
      success: true,
      data: { stats },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}
