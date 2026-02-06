'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react'

export function WeatherWidget() {
  // NOTE: Données météo - À remplacer par une vraie API météo
  const weather = {
    location: 'Abomey, Zou',
    temperature: 28,
    condition: 'Ensoleillé',
    humidity: 65,
    wind: 12,
    forecast: [
      { day: 'Lun', temp: 29, icon: Sun, condition: 'Ensoleillé' },
      { day: 'Mar', temp: 27, icon: CloudRain, condition: 'Pluie' },
      { day: 'Mer', temp: 28, icon: Cloud, condition: 'Nuageux' },
      { day: 'Jeu', temp: 30, icon: Sun, condition: 'Ensoleillé' },
    ],
  }

  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="border-b border-blue-100">
        <CardTitle className="text-xl font-poppins flex items-center gap-2 text-blue-700">
          <Cloud className="w-5 h-5" />
          Météo locale
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Météo actuelle */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">☀️</div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {weather.temperature}°C
          </div>
          <div className="text-gray-600 mb-4">{weather.condition}</div>
          <div className="text-sm text-gray-500">📍 {weather.location}</div>
        </div>

        {/* Détails */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <CloudRain className="w-4 h-4" />
              <span className="text-xs font-medium">Humidité</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{weather.humidity}%</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-xs font-medium">Vent</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{weather.wind} km/h</div>
          </div>
        </div>

        {/* Prévisions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Prévisions 4 jours</h4>
          <div className="grid grid-cols-4 gap-2">
            {weather.forecast.map((day, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-3 text-center border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                <day.icon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-bold text-gray-900">{day.temp}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseil agricole */}
        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="text-xs font-bold text-green-700 mb-1">💡 Conseil du jour</div>
          <p className="text-sm text-green-800">
            Conditions idéales pour la récolte. Profitez du temps sec !
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
