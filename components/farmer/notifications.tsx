'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react'

export function Notifications() {
  // NOTE: Notifications importantes pour l'agriculteur
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'Nouvelle commande',
      message: 'Restaurant Le Palmier a commandé 50kg d\'igname',
      time: 'Il y a 5 min',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 2,
      type: 'info',
      icon: Info,
      title: 'Stock faible',
      message: 'Ananas : Plus que 5 unités disponibles',
      time: 'Il y a 1h',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertCircle,
      title: 'Mise à jour requise',
      message: 'Mettez à jour les prix de vos tomates',
      time: 'Il y a 3h',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 4,
      type: 'trend',
      icon: TrendingUp,
      title: 'Performance',
      message: 'Vos ventes sont en hausse de 23% cette semaine',
      time: 'Aujourd\'hui',
      color: 'text-agri-green-600',
      bgColor: 'bg-agri-green-50',
    },
  ]

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-poppins flex items-center gap-2">
            <Bell className="w-6 h-6 text-agri-green-600" />
            Notifications
          </CardTitle>
          <span className="px-3 py-1 bg-agri-green-100 text-agri-green-700 text-xs font-bold rounded-full">
            {notifications.length} nouvelles
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${notification.bgColor} rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-gray-200`}
            >
              <div className="flex items-start gap-4">
                <div className={`${notification.color} mt-1`}>
                  <notification.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold ${notification.color}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton voir tout */}
        <div className="mt-6 text-center">
          <button className="text-agri-green-600 hover:text-agri-green-700 font-semibold text-sm">
            Voir toutes les notifications →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
