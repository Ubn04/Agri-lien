'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SalesChart() {
  // NOTE: Données des ventes des 7 derniers jours
  const data = [
    { name: 'Lun', ventes: 12000, commandes: 8 },
    { name: 'Mar', ventes: 19000, commandes: 12 },
    { name: 'Mer', ventes: 15000, commandes: 10 },
    { name: 'Jeu', ventes: 25000, commandes: 15 },
    { name: 'Ven', ventes: 32000, commandes: 18 },
    { name: 'Sam', ventes: 45000, commandes: 25 },
    { name: 'Dim', ventes: 38000, commandes: 20 },
  ]

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-poppins">Ventes de la semaine</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Évolution des revenus sur 7 jours
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-agri-green-600">
              186.000 <span className="text-sm text-gray-500">FCFA</span>
            </div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className="text-xs font-medium text-green-600">↗ +23%</span>
              <span className="text-xs text-gray-500">vs semaine passée</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E8B57" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2E8B57" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#666"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'Ventes']}
            />
            <Area 
              type="monotone" 
              dataKey="ventes" 
              stroke="#2E8B57" 
              strokeWidth={3}
              fill="url(#colorVentes)" 
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Légende personnalisée */}
        <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-agri-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Revenus (FCFA)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-agri-ochre-500 rounded"></div>
            <span className="text-sm text-gray-600">Commandes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
