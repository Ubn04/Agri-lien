'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
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
  images: string[];
  createdAt: string;
}

export default function FarmerProducts() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [user, router]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter, stockFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        const allProducts = data.data?.products || data.products || [];
        const myProducts = allProducts.filter((p: Product) => p.farmerId === user?.id);
        setProducts(myProducts);
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

    if (stockFilter === 'in-stock') {
      filtered = filtered.filter((p) => p.stock > 10);
    } else if (stockFilter === 'low-stock') {
      filtered = filtered.filter((p) => p.stock > 0 && p.stock <= 10);
    } else if (stockFilter === 'out-of-stock') {
      filtered = filtered.filter((p) => p.stock === 0);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
          <XCircle className="w-3 h-3" />
          Rupture
        </span>
      );
    } else if (stock <= 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
          <AlertCircle className="w-3 h-3" />
          Stock faible
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          En stock
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const categories = ['all', 'Légumes', 'Fruits', 'Céréales', 'Tubercules'];
  const stockFilters = [
    { value: 'all', label: 'Tous' },
    { value: 'in-stock', label: 'En stock' },
    { value: 'low-stock', label: 'Stock faible' },
    { value: 'out-of-stock', label: 'Rupture' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mes Produits</h1>
            <p className="text-gray-400">{products.length} produit(s) au total</p>
          </div>
          <button
            onClick={() => router.push('/farmer/products/add')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/50"
          >
            <Plus className="w-5 h-5" />
            Ajouter un Produit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Total Produits</p>
            <p className="text-2xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">En Stock</p>
            <p className="text-2xl font-bold text-green-400">
              {products.filter((p) => p.stock > 10).length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Stock Faible</p>
            <p className="text-2xl font-bold text-orange-400">
              {products.filter((p) => p.stock > 0 && p.stock <= 10).length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Rupture</p>
            <p className="text-2xl font-bold text-red-400">
              {products.filter((p) => p.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white mb-4">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {stockFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
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
            <p className="text-gray-400 mb-6">
              {searchQuery || categoryFilter !== 'all' || stockFilter !== 'all'
                ? 'Essayez de modifier vos filtres'
                : 'Commencez par ajouter votre premier produit'}
            </p>
            {!searchQuery && categoryFilter === 'all' && stockFilter === 'all' && (
              <button
                onClick={() => router.push('/farmer/products/add')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Ajouter un Produit
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-900/50 transition-all group"
              >
                <div className="relative h-48 bg-gray-700">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {getStockBadge(product.stock)}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {product.price.toLocaleString()} FCFA
                      </p>
                      <p className="text-xs text-gray-500">par {product.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{product.stock}</p>
                      <p className="text-xs text-gray-500">en stock</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/farmer/products/edit/${product.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
