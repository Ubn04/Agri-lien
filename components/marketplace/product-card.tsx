import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  unit: string
  image: string
  farmer: string
  location: string
  rating: number
  available: number
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <Link href={`/marketplace/product/${product.id}`}>
          <div className="text-6xl text-center mb-4">{product.image}</div>
          
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-600">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-primary-600">
              {product.price.toLocaleString('fr-BJ')} FCFA
            </div>
            <div className="text-sm text-gray-600">par {product.unit}</div>
          </div>
          <div className="flex items-center text-yellow-600">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <div className="border-t pt-3 space-y-2 mb-4">
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

        <Button 
          className="w-full"
          onClick={() => onAddToCart?.(product)}
        >
          Ajouter au panier
        </Button>
      </CardContent>
    </Card>
  )
}
