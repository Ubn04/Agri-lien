'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, MapPin, Star, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  image: string
  farmer: string
  location: string
  rating: number
  sales: number
  quality: string
  stock: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  viewMode: 'grid' | 'list'
}

export function ProductCardEnhanced({ product, onAddToCart, viewMode }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="hover-lift press-feedback border-2 border-gray-100 hover:border-agri-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            {/* Image */}
            <div className="w-32 h-32 bg-gradient-to-br from-agri-green-100 to-agri-gold-100 rounded-xl flex items-center justify-center text-6xl flex-shrink-0">
              {product.image}
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {product.farmer} • {product.location}
                  </p>
                </div>
                <Badge className="bg-agri-green-100 text-agri-green-700 border-agri-green-200">
                  {product.category}
                </Badge>
              </div>

              <div className="flex items-center gap-6 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.sales})</span>
                </div>
                <Badge variant="outline" className="border-agri-gold-300 text-agri-gold-700">
                  {product.quality}
                </Badge>
                <span className="text-sm text-gray-600">Stock: {product.stock} {product.unit}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-agri-green-600">
                    {product.price.toLocaleString()} <span className="text-lg text-gray-500">FCFA</span>
                  </div>
                  <div className="text-sm text-gray-500">par {product.unit}</div>
                </div>
                <Button
                  onClick={() => onAddToCart(product)}
                  className="bg-agri-green-500 hover:bg-agri-green-600 text-white px-8 py-6 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover-lift press-feedback border-2 border-gray-100 hover:border-agri-green-200 animate-scale-in">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-agri-green-100 to-agri-gold-100 rounded-t-xl flex items-center justify-center text-8xl">
            {product.image}
          </div>
          {/* Badge qualité */}
          <Badge className="absolute top-3 right-3 bg-agri-gold-400 text-gray-900 border-0">
            {product.quality}
          </Badge>
          {/* Badge promo si applicable */}
          {product.sales > 50 && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Populaire
            </Badge>
          )}
        </div>

        {/* Contenu */}
        <div className="p-5">
          {/* Catégorie */}
          <Badge variant="outline" className="mb-2 text-xs border-agri-green-200 text-agri-green-700">
            {product.category}
          </Badge>

          {/* Nom */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-agri-green-600 transition-colors">
            {product.name}
          </h3>

          {/* Agriculteur & Localisation */}
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {product.farmer} • {product.location}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.sales} ventes)</span>
          </div>

          {/* Prix */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-agri-green-600">
              {product.price.toLocaleString()} <span className="text-sm text-gray-500">FCFA</span>
            </div>
            <div className="text-sm text-gray-500">par {product.unit}</div>
          </div>

          {/* Stock */}
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Stock disponible:</span>
            <span className="font-semibold text-gray-900">{product.stock} {product.unit}</span>
          </div>

          {/* Bouton */}
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-agri-green-500 hover:bg-agri-green-600 text-white font-semibold py-3 group-hover:shadow-lg transition-all"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
