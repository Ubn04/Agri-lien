import { mockDB } from '@/lib/db/mock-database'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface RouteParams {
  params: {
    id: string
  }
}

// GET - Récupérer un produit spécifique
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const product = mockDB.getProductById(params.id)

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { product },
    })
  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour un produit
export async function PATCH(request: Request, { params }: RouteParams) {
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

    const product = mockDB.getProductById(params.id)
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    const user = mockDB.findUserById(session.userId)
    if (!user || (user.role !== 'farmer' && user.role !== 'admin') || (user.role === 'farmer' && product.farmerId !== user.id)) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 403 }
      )
    }

    const updates = await request.json()
    const updatedProduct = mockDB.updateProduct(params.id, updates)

    return NextResponse.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: { product: updatedProduct },
    })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un produit
export async function DELETE(request: Request, { params }: RouteParams) {
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

    const product = mockDB.getProductById(params.id)
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    const user = mockDB.findUserById(session.userId)
    if (!user || (user.role !== 'farmer' && user.role !== 'admin') || (user.role === 'farmer' && product.farmerId !== user.id)) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 403 }
      )
    }

    mockDB.deleteProduct(params.id)

    return NextResponse.json({
      success: true,
      message: 'Produit supprimé avec succès',
    })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    )
  }
}
