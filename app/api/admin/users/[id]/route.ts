import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface RouteParams {
  params: {
    id: string
  }
}

// DELETE - Supprimer un utilisateur (Admin uniquement)
export async function DELETE(request: Request, { params }: RouteParams) {
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

    const userToDelete = mockDB.findUserById(params.id)
    if (!userToDelete) {
      return NextResponse.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Empêcher la suppression de son propre compte
    if (params.id === user.id) {
      return NextResponse.json(
        { success: false, message: 'Vous ne pouvez pas supprimer votre propre compte' },
        { status: 400 }
      )
    }

    const deleted = mockDB.deleteUser(params.id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Échec de la suppression' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Utilisateur supprimé avec succès',
    })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression' },
      { status: 500 }
    )
  }
}
