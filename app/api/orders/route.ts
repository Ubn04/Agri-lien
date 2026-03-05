import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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

    const session = mockDB.getSession(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
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

    let orders: any[] = []

    // Filtrer selon le rôle
    if (user.role === 'admin') {
      orders = mockDB.getAllOrders()
    } else if (user.role === 'buyer') {
      orders = mockDB.getOrdersByBuyer(user.id)
    } else if (user.role === 'farmer') {
      orders = mockDB.getOrdersByFarmer(user.id)
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

    const session = mockDB.getSession(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Session expirée' },
        { status: 401 }
      )
    }

    const user = mockDB.findUserById(session.userId)
    if (!user || user.role !== 'buyer') {
      return NextResponse.json(
        { success: false, message: 'Seuls les acheteurs peuvent créer des commandes' },
        { status: 403 }
      )
    }

    const orderData = await request.json()

    // Vérifier le stock
    for (const item of orderData.items) {
      const product = mockDB.getProductById(item.productId)
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Produit ${item.productId} non trouvé` },
          { status: 404 }
        )
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Stock insuffisant pour ${product.name}` },
          { status: 400 }
        )
      }
    }

    const newOrder = mockDB.createOrder({
      ...orderData,
      buyerId: user.id,
      buyerName: `${user.firstName} ${user.lastName}`,
      buyerPhone: user.phone,
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
