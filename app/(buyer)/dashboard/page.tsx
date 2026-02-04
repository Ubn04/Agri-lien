'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Package, TrendingUp, Users } from 'lucide-react'

export default function BuyerDashboard() {
  const stats = [
    {
      title: 'Commandes ce mois',
      value: '18',
      change: '+5',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Montant dépensé',
      value: '850,000 FCFA',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Fournisseurs actifs',
      value: '12',
      change: '+2',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Produits favoris',
      value: '8',
      change: '+1',
      icon: Package,
      color: 'text-orange-600',
    },
  ]

  const activeOrders = [
    {
      id: 'ORD-101',
      farmer: 'Koffi Mensah',
      products: '3 produits',
      amount: '45,000 FCFA',
      status: 'En livraison',
      deliveryDate: '5 Fév 2026',
    },
    {
      id: 'ORD-102',
      farmer: 'Aminata Diallo',
      products: '2 produits',
      amount: '30,000 FCFA',
      status: 'Confirmée',
      deliveryDate: '6 Fév 2026',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Acheteur</h1>
        <p className="text-gray-600">Restaurant Le Palmier</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold">{order.farmer}</div>
                  <div className="text-sm text-gray-600">{order.products}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-600">
                    {order.status}
                  </div>
                  <div className="text-xs text-gray-600">{order.deliveryDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{order.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
