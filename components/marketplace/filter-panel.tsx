'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])

  const regions = ['Alibori', 'Atacora', 'Atlantique', 'Borgou', 'Collines', 'Couffo', 'Donga', 'Littoral', 'Mono', 'Ouémé', 'Plateau', 'Zou']
  
  const certifications = ['Bio', 'Commerce équitable', 'Local', 'Sans pesticide']

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    )
  }

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev =>
      prev.includes(cert)
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    )
  }

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 10000 })
    setSelectedRegions([])
    setSelectedCertifications([])
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Filtres</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-primary-600 hover:underline"
          >
            Réinitialiser
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Prix (FCFA)</h4>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-24"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-24"
            />
          </div>
        </div>

        {/* Regions */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Régions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {regions.map((region) => (
              <label key={region} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  className="mr-2 rounded"
                />
                <span className="text-sm">{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-medium mb-3">Certifications</h4>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <label key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCertifications.includes(cert)}
                  onChange={() => toggleCertification(cert)}
                  className="mr-2 rounded"
                />
                <span className="text-sm">{cert}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
