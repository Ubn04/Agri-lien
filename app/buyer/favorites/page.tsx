'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { Heart, Package, MapPin, ShoppingCart, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  location: string;
}

export default function BuyerFavorites() {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      router.push('/login');
      return;
    }
    // Mock favorites - in real app, fetch from API
    setLoading(false);
  }, [user, router]);

  const removeFavorite = (productId: string) => {
    setFavorites(favorites.filter((p) => p.id !== productId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mes Favoris</h1>
          <p className="text-gray-400">{favorites.length} produit(s) favori(s)</p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun favori
            </h3>
            <p className="text-gray-400 mb-6">
              Ajoutez des produits à vos favoris pour les retrouver facilement
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-900/50 transition-all group"
              >
                <div className="relative h-48 bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-600" />
                  </div>
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {product.price.toLocaleString()} FCFA
                      </p>
                      <p className="text-xs text-gray-500">par {product.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-400">
                        {product.stock} disponible
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/buyer/catalog')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
