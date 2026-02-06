'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, MapPin, DollarSign, Star } from 'lucide-react'

interface FilterPanelProps {
  filters: {
    category: string
    region: string
    priceRange: [number, number]
    quality: string
  }
  setFilters: (filters: any) => void
  onClose: () => void
}

export function FilterPanelAdvanced({ filters, setFilters, onClose }: FilterPanelProps) {
  const categories = ['Tous', 'Tubercules', 'Légumes', 'Fruits', 'Céréales', 'Épices']
  const regions = ['Toutes', 'Atlantique', 'Littoral', 'Ouémé', 'Zou', 'Collines', 'Plateau', 'Alibori', 'Borgou', 'Donga', 'Atacora', 'Couffo', 'Mono']
  const qualities = ['Toutes', 'Premium', 'Standard', 'Bio']

  const resetFilters = () => {
    setFilters({
      category: 'Tous',
      region: 'Toutes',
      priceRange: [0, 100000],
      quality: 'Toutes',
    })
  }

  return (
    <Card className="border-2 border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-poppins">Filtres</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Catégorie */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            📦 Catégorie
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  filters.category === cat
                    ? 'bg-agri-green-500 text-white border-agri-green-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-agri-green-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Région */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Région
          </h3>
          <select
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-agri-green-500 focus:outline-none"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Prix */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Prix (FCFA)
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
              className="w-full accent-agri-green-500"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">0 FCFA</span>
              <span className="font-bold text-agri-green-600">
                {filters.priceRange[1].toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </div>

        {/* Qualité */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" /> Qualité
          </h3>
          <div className="space-y-2">
            {qualities.map((quality) => (
              <label
                key={quality}
                className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="quality"
                  checked={filters.quality === quality}
                  onChange={() => setFilters({ ...filters, quality })}
                  className="w-4 h-4 text-agri-green-500 focus:ring-agri-green-500"
                />
                <span className="text-sm font-medium text-gray-700">{quality}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex-1 border-2"
          >
            Réinitialiser
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-agri-green-500 hover:bg-agri-green-600"
          >
            Appliquer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
