'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react'

export default function FarmerDashboard() {
  const stats = [
    {
      title: 'Revenus du mois',
      value: '450,000 FCFA',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Produits actifs',
      value: '24',
      change: '+3',
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Commandes',
      value: '47',
      change: '+8',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Taux de vente',
      value: '94%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      buyer: 'Restaurant Le Palmier',
      product: 'Igname',
      quantity: '50 kg',
      amount: '25,000 FCFA',
      status: 'En cours',
    },
    {
      id: 'ORD-002',
      buyer: 'Hôtel Marina',
      product: 'Tomates',
      quantity: '30 kg',
      amount: '15,000 FCFA',
      status: 'Livrée',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Fermier</h1>
        <p className="text-gray-600">Bienvenue, Koffi Mensah</p>
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

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold">{order.buyer}</div>
                  <div className="text-sm text-gray-600">
                    {order.product} - {order.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{order.amount}</div>
                  <div className="text-sm text-gray-600">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
