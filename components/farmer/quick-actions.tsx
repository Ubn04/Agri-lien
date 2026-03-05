'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, ShoppingBag, Smartphone, Package, TrendingUp, MapPin } from 'lucide-react'

export function QuickActions() {
  // NOTE: Actions rapides pour l'agriculteur
  const actions = [
    {
      title: 'Ajouter un produit',
      description: 'Publier un nouveau produit',
      icon: Plus,
      href: '/farmer/products/add',
      color: 'bg-agri-green-500',
      hoverColor: 'hover:bg-agri-green-600',
    },
    {
      title: 'Voir le marché',
      description: 'Explorer les prix',
      icon: ShoppingBag,
      href: '/marketplace',
      color: 'bg-agri-ochre-500',
      hoverColor: 'hover:bg-agri-ochre-600',
    },
    {
      title: 'USSD',
      description: 'Accéder via *123#',
      icon: Smartphone,
      href: '/ussd',
      color: 'bg-agri-gold-500',
      hoverColor: 'hover:bg-agri-gold-600',
    },
    {
      title: 'Mes commandes',
      description: 'Voir toutes les commandes',
      icon: Package,
      href: '/farmer/orders',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      title: 'Analytics',
      description: 'Statistiques détaillées',
      icon: TrendingUp,
      href: '/farmer/analytics',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      title: 'Ma ferme',
      description: 'Localisation & infos',
      icon: MapPin,
      href: '/farmer/profile',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
  ]

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <CardTitle className="text-2xl font-poppins">Actions rapides</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className={`${action.color} ${action.hoverColor} text-white rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 cursor-pointer`}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{action.title}</h4>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
