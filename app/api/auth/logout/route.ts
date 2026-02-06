import { mockDB } from '@/lib/db/mock-database'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (token) {
      // Supprimer la session
      mockDB.deleteSession(token)
    }

    // Supprimer le cookie
    cookieStore.delete('auth_token')

    return Response.json({
      success: true,
      message: 'Déconnexion réussie',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return Response.json(
      { success: false, message: 'Erreur lors de la déconnexion' },
      { status: 500 }
    )
  }
}
