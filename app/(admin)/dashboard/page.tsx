'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Utilisateurs totaux',
      value: '1,247',
      change: '+48',
      icon: Users,
      color: 'text-blue-600',
      breakdown: 'Fermiers: 487 | Acheteurs: 623 | Logistique: 137',
    },
    {
      title: 'Produits actifs',
      value: '2,845',
      change: '+124',
      icon: Package,
      color: 'text-green-600',
      breakdown: '12 catégories',
    },
    {
      title: 'Commandes (mois)',
      value: '3,456',
      change: '+15%',
      icon: ShoppingCart,
      color: 'text-purple-600',
      breakdown: 'Valeur: 145M FCFA',
    },
    {
      title: 'Revenus plateforme',
      value: '8.5M FCFA',
      change: '+22%',
      icon: TrendingUp,
      color: 'text-orange-600',
      breakdown: 'Commission moyenne: 5%',
    },
  ]

  const recentActivity = [
    {
      type: 'user',
      message: 'Nouveau fermier inscrit: Jean Kouassi',
      time: 'Il y a 5 min',
    },
    {
      type: 'order',
      message: 'Commande ORD-3456 créée (45,000 FCFA)',
      time: 'Il y a 12 min',
    },
    {
      type: 'product',
      message: 'Nouveau produit ajouté: Ananas bio',
      time: 'Il y a 25 min',
    },
    {
      type: 'payment',
      message: 'Paiement complété: ORD-3445 (78,000 FCFA)',
      time: 'Il y a 1h',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Admin</h1>
        <p className="text-gray-600">Vue d'ensemble de la plateforme</p>
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
              <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
              <div className="text-xs text-gray-500">{stat.breakdown}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium">{activity.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
