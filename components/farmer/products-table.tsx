'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: string
  unit: string
  status: 'Disponible' | 'Épuisé' | 'En attente'
  sales: number
}

export function ProductsTable() {
  // NOTE: Données des produits - À remplacer par API
  const [products] = useState<Product[]>([
    {
      id: 'P001',
      name: 'Igname fraîche',
      category: 'Tubercules',
      price: 500,
      quantity: '120',
      unit: 'kg',
      status: 'Disponible',
      sales: 85,
    },
    {
      id: 'P002',
      name: 'Tomates',
      category: 'Légumes',
      price: 400,
      quantity: '50',
      unit: 'kg',
      status: 'Disponible',
      sales: 62,
    },
    {
      id: 'P003',
      name: 'Maïs',
      category: 'Céréales',
      price: 300,
      quantity: '200',
      unit: 'kg',
      status: 'Disponible',
      sales: 93,
    },
    {
      id: 'P004',
      name: 'Ananas',
      category: 'Fruits',
      price: 250,
      quantity: '0',
      unit: 'unité',
      status: 'Épuisé',
      sales: 100,
    },
    {
      id: 'P005',
      name: 'Piment',
      category: 'Épices',
      price: 800,
      quantity: '15',
      unit: 'kg',
      status: 'Disponible',
      sales: 45,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Épuisé':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-poppins">Mes Produits</CardTitle>
          <Link href="/farmer/products/add">
            <Button className="bg-agri-green-500 hover:bg-agri-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Produit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Catégorie</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Prix</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ventes</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-agri-green-100 rounded-lg flex items-center justify-center text-xl">
                        🌾
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                    {product.price.toLocaleString()} FCFA/{product.unit}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {product.quantity} {product.unit}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-agri-green-500 h-full rounded-full"
                          style={{ width: `${product.sales}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {product.sales}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-agri-green-600 hover:bg-agri-green-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
