'use client'

import { Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewToggleProps {
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  totalResults: number
}

export function ViewToggle({ viewMode, setViewMode, totalResults }: ViewToggleProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border-2 border-gray-100 p-4">
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{totalResults}</span> produit(s) trouvé(s)
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 mr-2">Affichage:</span>
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'bg-agri-green-500 hover:bg-agri-green-600' : ''}
        >
          <Grid className="w-4 h-4 mr-1" />
          Grille
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'bg-agri-green-500 hover:bg-agri-green-600' : ''}
        >
          <List className="w-4 h-4 mr-1" />
          Liste
        </Button>
      </div>
    </div>
  )
}
