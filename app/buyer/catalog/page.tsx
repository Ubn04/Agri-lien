'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  MapPin,
  Star,
  Plus,
  Minus,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  farmerId: string;
  location: string;
  image: string;
}

export default function BuyerCatalog() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [user, router]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();

      if (data.success) {
        const availableProducts = data.products?.filter((p: Product) => p.stock > 0) || [];
        setProducts(availableProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartQuantity = (productId: string) => cart[productId] || 0;

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

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

  const categories = ['all', 'Légumes', 'Fruits', 'Céréales', 'Tubercules'];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Catalogue Produits</h1>
            <p className="text-gray-400">{products.length} produit(s) disponible(s)</p>
          </div>
          {totalItems > 0 && (
            <button
              onClick={() => router.push('/buyer/cart')}
              className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              <ShoppingCart className="w-5 h-5" />
              Voir le Panier ({totalItems})
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white mb-4">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-400">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const quantity = getCartQuantity(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-900/50 transition-all group"
                >
                  <div className="relative h-48 bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-600" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                        {product.category}
                      </span>
                    </div>
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
                          {product.stock} {product.unit}
                        </p>
                        <p className="text-xs text-gray-500">disponible</p>
                      </div>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/50"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Ajouter au Panier
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg">
                          {quantity}
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
