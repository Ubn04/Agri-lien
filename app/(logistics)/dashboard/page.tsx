'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Truck, MapPin, CheckCircle, Clock } from 'lucide-react'

export default function LogisticsDashboard() {
  const stats = [
    {
      title: 'Livraisons du jour',
      value: '8',
      change: '+2',
      icon: Truck,
      color: 'text-blue-600',
    },
    {
      title: 'En cours',
      value: '3',
      change: '-1',
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      title: 'Complétées',
      value: '45',
      change: '+12',
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Distance parcourue',
      value: '245 km',
      change: '+35 km',
      icon: MapPin,
      color: 'text-purple-600',
    },
  ]

  const activeDeliveries = [
    {
      id: 'DEL-001',
      order: 'ORD-101',
      pickup: 'Abomey-Calavi',
      destination: 'Cotonou Centre',
      status: 'En route',
      eta: '30 min',
    },
    {
      id: 'DEL-002',
      order: 'ORD-105',
      pickup: 'Parakou',
      destination: 'Porto-Novo',
      status: 'Ramassage',
      eta: '2h',
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Logistique</h1>
        <p className="text-gray-600">Logistique Express Bénin</p>
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

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Livraisons actives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold">{delivery.order}</div>
                  <div className="text-sm text-gray-600">
                    {delivery.pickup} → {delivery.destination}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-600">
                    {delivery.status}
                  </div>
                  <div className="text-xs text-gray-600">ETA: {delivery.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
