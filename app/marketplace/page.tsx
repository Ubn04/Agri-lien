'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tout', emoji: '🌾' },
    { id: 'vegetables', name: 'Légumes', emoji: '🥬' },
    { id: 'fruits', name: 'Fruits', emoji: '🍎' },
    { id: 'cereals', name: 'Céréales', emoji: '🌽' },
    { id: 'tubers', name: 'Tubercules', emoji: '🥔' },
  ]

  const products = [
    {
      id: '1',
      name: 'Igname fraîche',
      price: 500,
      unit: 'kg',
      image: '🍠',
      farmer: 'Koffi Mensah',
      location: 'Zou',
      rating: 4.8,
      available: 100,
    },
    {
      id: '2',
      name: 'Tomates bio',
      price: 800,
      unit: 'kg',
      image: '🍅',
      farmer: 'Aminata Diallo',
      location: 'Ouémé',
      rating: 4.9,
      available: 50,
    },
    {
      id: '3',
      name: 'Maïs jaune',
      price: 350,
      unit: 'kg',
      image: '🌽',
      farmer: 'Jean Kouassi',
      location: 'Atlantique',
      rating: 4.7,
      available: 200,
    },
    {
      id: '4',
      name: 'Ananas victoria',
      price: 1200,
      unit: 'pièce',
      image: '🍍',
      farmer: 'Marie Houessou',
      location: 'Mono',
      rating: 5.0,
      available: 80,
    },
    {
      id: '5',
      name: 'Piment rouge',
      price: 1500,
      unit: 'kg',
      image: '🌶️',
      farmer: 'Serge Ahoussou',
      location: 'Borgou',
      rating: 4.6,
      available: 30,
    },
    {
      id: '6',
      name: 'Mangues kent',
      price: 600,
      unit: 'kg',
      image: '🥭',
      farmer: 'Fatou Diop',
      location: 'Alibori',
      rating: 4.8,
      available: 120,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/marketplace/product/${product.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="text-6xl text-center mb-4">{product.image}</div>
                  
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">
                        {product.price} FCFA
                      </div>
                      <div className="text-sm text-gray-600">par {product.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-yellow-600">★ {product.rating}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="text-sm text-gray-600">
                      Par {product.farmer}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                    <div className="text-sm text-green-600">
                      {product.available} {product.unit} disponibles
                    </div>
                  </div>

                  <Button className="w-full mt-4">Ajouter au panier</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
