import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const farmerId = searchParams.get('farmerId')
    
    let products = mockDB.getAllProducts()

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category)
    }

    if (farmerId) {
      products = products.filter(p => p.farmerId === farmerId)
    }

    return NextResponse.json({
      success: true,
      data: {
        products,
        total: products.length,
      },
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des produits' },
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
    if (!user || user.role !== 'farmer') {
      return NextResponse.json(
        { success: false, message: 'Seuls les fermiers peuvent ajouter des produits' },
        { status: 403 }
      )
    }

    const productData = await request.json()

    const newProduct = mockDB.createProduct({
      ...productData,
      farmerId: user.id,
      farmerName: `${user.firstName} ${user.lastName}`,
      images: productData.images || [],
    })

    return NextResponse.json({
      success: true,
      message: 'Produit créé avec succès',
      data: { product: newProduct },
    })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création du produit' },
      { status: 500 }
    )
  }
}
