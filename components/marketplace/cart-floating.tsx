'use client'

import { useState } from 'react'
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
}

interface CartFloatingProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartFloating({ items, onUpdateQuantity, onRemove }: CartFloatingProps) {
  const [isOpen, setIsOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-agri-green-500 hover:bg-agri-green-600 text-white rounded-full p-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50 group"
      >
        <ShoppingCart className="w-7 h-7" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-bounce">
            {itemCount}
          </span>
        )}
      </button>

      {/* Panel du panier */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-end">
          <Card className="w-full md:w-[450px] h-full md:h-auto md:max-h-[90vh] md:m-4 bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-agri-green-500 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-bold">Mon Panier</h2>
                  <p className="text-sm opacity-90">{itemCount} article(s)</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Panier vide
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ajoutez des produits pour commencer
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-agri-green-500 hover:bg-agri-green-600"
                  >
                    Continuer mes achats
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-100 hover:border-agri-green-200 transition-colors"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 bg-gradient-to-br from-agri-green-100 to-agri-gold-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                        {item.image}
                      </div>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.price.toLocaleString()} FCFA / {item.unit}
                        </p>

                        {/* Quantité */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-7 h-7 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Prix total & Supprimer */}
                      <div className="text-right">
                        <div className="font-bold text-agri-green-600 mb-2">
                          {(item.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-agri-green-600">
                      {total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">FCFA</div>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full bg-agri-green-500 hover:bg-agri-green-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all">
                    Passer la commande
                  </Button>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-3 text-gray-600 hover:text-gray-900 font-medium py-2"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
