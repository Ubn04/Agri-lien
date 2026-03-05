import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface RouteParams {
  params: {
    id: string
  }
}

// PATCH - Mettre à jour le statut d'une commande
export async function PATCH(request: Request, { params }: RouteParams) {
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
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Statut requis' },
        { status: 400 }
      )
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Statut invalide' },
        { status: 400 }
      )
    }

    const updatedOrder = mockDB.updateOrderStatus(params.id, status)

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: {
        order: updatedOrder,
      },
    })
  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
