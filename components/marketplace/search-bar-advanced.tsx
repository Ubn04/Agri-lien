'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onToggleFilters: () => void
  resultsCount: number
}

export function SearchBarAdvanced({ searchQuery, setSearchQuery, onToggleFilters, resultsCount }: SearchBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barre de recherche principale */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher des produits (igname, tomate, maïs...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-agri-green-500 rounded-lg"
          />
        </div>

        {/* Bouton filtres */}
        <Button
          onClick={onToggleFilters}
          variant="outline"
          className="h-12 px-6 border-2 border-gray-200 hover:border-agri-green-500 hover:bg-agri-green-50 transition-all"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filtres
        </Button>

        {/* Bouton recherche */}
        <Button className="h-12 px-8 bg-agri-green-500 hover:bg-agri-green-600 text-white font-semibold">
          Rechercher
        </Button>
      </div>

      {/* Résultats */}
      {searchQuery && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-semibold text-agri-green-600">{resultsCount}</span> produit(s) trouvé(s)
        </div>
      )}
    </div>
  )
}
