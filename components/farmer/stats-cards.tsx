'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react'

export function StatsCards() {
  // NOTE: Statistiques en temps réel pour l'agriculteur
  const stats = [
    {
      title: 'Revenus du mois',
      value: '450.000',
      unit: 'FCFA',
      change: '+12.5%',
      icon: DollarSign,
      bgColor: 'bg-agri-green-50',
      iconColor: 'text-agri-green-600',
      changePositive: true,
    },
    {
      title: 'Produits actifs',
      value: '24',
      unit: 'produits',
      change: '+3 ce mois',
      icon: Package,
      bgColor: 'bg-agri-ochre-50',
      iconColor: 'text-agri-ochre-600',
      changePositive: true,
    },
    {
      title: 'Commandes',
      value: '47',
      unit: 'commandes',
      change: '+8 cette semaine',
      icon: ShoppingCart,
      bgColor: 'bg-agri-gold-50',
      iconColor: 'text-agri-gold-700',
      changePositive: true,
    },
    {
      title: 'Taux de vente',
      value: '94',
      unit: '%',
      change: '+5% vs mois dernier',
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      changePositive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover-lift press-feedback border-2 border-gray-100 animate-scale-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {stat.unit}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={`w-4 h-4 ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-sm font-medium ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.bgColor} ${stat.iconColor} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
