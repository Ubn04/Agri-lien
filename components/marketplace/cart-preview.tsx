'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Plus, Minus } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  farmer: string
}

interface CartPreviewProps {
  items?: CartItem[]
  onClose?: () => void
}

export function CartPreview({ items = [], onClose }: CartPreviewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryFee = 2000
  const total = subtotal + deliveryFee

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Panier ({cartItems.length})</CardTitle>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Votre panier est vide
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.farmer}</div>
                    <div className="text-sm font-semibold text-primary-600">
                      {item.price.toLocaleString('fr-BJ')} FCFA/{item.unit}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString('fr-BJ')} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{deliveryFee.toLocaleString('fr-BJ')} FCFA</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>{total.toLocaleString('fr-BJ')} FCFA</span>
              </div>
            </div>

            <Button className="w-full mt-6">
              Passer la commande
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
