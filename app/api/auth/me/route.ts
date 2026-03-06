import { mockDB } from '@/lib/db/mock-database'
import { cookies } from 'next/headers'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return Response.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    // Vérifier la session
    const session = mockDB.getSession(token)
    if (!session) {
      return Response.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      )
    }

    // Récupérer l'utilisateur
    const user = mockDB.findUserById(session.userId)
    if (!user) {
      return Response.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return Response.json(
      { success: false, message: 'Erreur lors de la vérification' },
      { status: 500 }
    )
  }
}
