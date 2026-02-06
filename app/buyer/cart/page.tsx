'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  MapPin,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export default function BuyerCart() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock cart data - in real app, this would come from state management or API
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      productId: 'p1',
      name: 'Tomates fraîches',
      price: 500,
      unit: 'kg',
      quantity: 3,
      stock: 50,
      farmerId: 'f1',
      location: 'Cotonou, Bénin',
    },
    {
      id: '2',
      productId: 'p2',
      name: 'Oignons',
      price: 300,
      unit: 'kg',
      quantity: 2,
      stock: 30,
      farmerId: 'f1',
      location: 'Cotonou, Bénin',
    },
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState('');

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert('Veuillez entrer une adresse de livraison');
      return;
    }

    if (cartItems.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        buyerId: user?.id,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        deliveryAddress,
        total: calculateTotal(),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Commande passée avec succès !');
        setCartItems([]);
        router.push('/buyer/orders');
      } else {
        alert(data.message || 'Erreur lors de la commande');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mon Panier</h1>
          <p className="text-gray-400">
            {cartItems.length} article(s) dans votre panier
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-400 mb-6">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <button
              onClick={() => router.push('/buyer/catalog')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <Package className="w-5 h-5" />
              Parcourir le Catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-900/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-10 h-10 text-gray-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-bold text-white">
                          {item.price.toLocaleString()} FCFA
                          <span className="text-sm text-gray-400 ml-1">
                            / {item.unit}
                          </span>
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg min-w-[60px] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Sous-total</span>
                          <span className="text-xl font-bold text-blue-400">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Récapitulatif
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Articles ({cartItems.length})</span>
                    <span>{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Livraison</span>
                    <span className="text-green-400">Gratuite</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-2xl font-bold text-white">
                        {calculateTotal().toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse de livraison <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Entrez votre adresse complète..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading || !deliveryAddress.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Passer la Commande
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Paiement à la livraison uniquement
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
