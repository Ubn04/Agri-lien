import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { OrderService } from '@/lib/services/orderService'
export const dynamic = 'force-dynamic'
import { UserService } from '@/lib/services/userService'
import { AuthService } from '@/lib/services/authService'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    const user = await AuthService.getCurrentUser(token)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      )
    }

    let orders: any[] = []

    // Filtrer selon le rôle
    if (user.role === 'admin') {
      const result = await OrderService.getOrders({}, 1, 1000) // Limite élevée pour admin
      orders = result.orders
    } else if (user.role === 'buyer') {
      const result = await OrderService.getOrders({ buyerId: user.id })
      orders = result.orders
    } else if (user.role === 'farmer') {
      const result = await OrderService.getOrders({ farmerId: user.id })
      orders = result.orders
    }

    return NextResponse.json({
      success: true,
      data: {
        orders,
        total: orders.length,
      },
    })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    const user = await AuthService.getCurrentUser(token)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      )
    }

    if (user.role !== 'buyer') {
      return NextResponse.json(
        { success: false, message: 'Seuls les acheteurs peuvent créer des commandes' },
        { status: 403 }
      )
    }

    const orderData = await request.json()

    // Créer la commande
    const newOrder = await OrderService.createOrder({
      ...orderData,
      buyerId: user.id,
      status: 'pending',
    })

    return NextResponse.json({
      success: true,
      message: 'Commande créée avec succès',
      data: { order: newOrder },
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création de la commande' },
      { status: 500 }
    )
  }
}
