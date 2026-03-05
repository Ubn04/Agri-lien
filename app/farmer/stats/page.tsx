'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  revenueGrowth: number;
  ordersGrowth: number;
}

export default function FarmerStats() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      router.push('/login');
      return;
    }
    fetchStats();
  }, [user, router, timeRange]);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      // Vérifications de sécurité
      if (!productsData.success || !ordersData.success) {
        console.error('API error:', { productsData, ordersData });
        setLoading(false);
        return;
      }

      const allProducts = productsData.products || productsData.data?.products || [];
      const allOrders = ordersData.orders || ordersData.data?.orders || [];

      const myProducts = allProducts.filter((p: any) => p.farmerId === user?.id);
      const myOrders = allOrders.filter((o: any) =>
        o.items?.some((item: any) => {
          const productId = item.product?.id || item.productId;
          return myProducts.find((p: any) => p.id === productId);
        })
      );

      const totalRevenue = myOrders.reduce((sum: number, o: any) => {
        const amount = o.totalAmount || o.total || 0;
        return sum + (typeof amount === 'number' ? amount : 0);
      }, 0);
      
      const totalOrders = myOrders.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const productSales = myProducts.map((product: any) => {
        const sales = myOrders
          .flatMap((o: any) => o.items || [])
          .filter((item: any) => {
            const productId = item.product?.id || item.productId;
            return productId === product.id;
          })
          .reduce((sum: number, item: any) => {
            const quantity = item.quantity || 0;
            return sum + (typeof quantity === 'number' ? quantity : 0);
          }, 0);

        const price = product.price || 0;
        return {
          name: product.name || 'Produit sans nom',
          sales,
          revenue: sales * (typeof price === 'number' ? price : 0),
        };
      });

      const topProducts = productSales
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);

      const now = new Date();
      const monthlyData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthOrders = myOrders.filter((o: any) => {
          try {
            const orderDate = new Date(o.createdAt);
            if (isNaN(orderDate.getTime())) return false;
            return (
              orderDate.getMonth() === date.getMonth() &&
              orderDate.getFullYear() === date.getFullYear()
            );
          } catch {
            return false;
          }
        });
        const monthRevenue = monthOrders.reduce((sum: number, o: any) => {
          const amount = o.totalAmount || o.total || 0;
          return sum + (typeof amount === 'number' ? amount : 0);
        }, 0);

        monthlyData.push({
          month: date.toLocaleDateString('fr-FR', { month: 'short' }),
          revenue: monthRevenue,
        });
      }

      const lastMonthRevenue = monthlyData[monthlyData.length - 2]?.revenue || 0;
      const currentMonthRevenue = monthlyData[monthlyData.length - 1]?.revenue || 0;
      const revenueGrowth =
        lastMonthRevenue > 0
          ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          : 0;

      const lastMonthOrders = myOrders.filter((o: any) => {
        try {
          const orderDate = new Date(o.createdAt);
          if (isNaN(orderDate.getTime())) return false;
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return (
            orderDate.getMonth() === lastMonth.getMonth() &&
            orderDate.getFullYear() === lastMonth.getFullYear()
          );
        } catch {
          return false;
        }
      }).length;

      const currentMonthOrders = myOrders.filter((o: any) => {
        try {
          const orderDate = new Date(o.createdAt);
          if (isNaN(orderDate.getTime())) return false;
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        } catch {
          return false;
        }
      }).length;

      const ordersGrowth =
        lastMonthOrders > 0
          ? ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
          : 0;

      setStats({
        totalRevenue,
        totalOrders,
        totalProducts: myProducts.length,
        averageOrderValue,
        topProducts,
        monthlyRevenue: monthlyData,
        revenueGrowth,
        ordersGrowth,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...stats.monthlyRevenue.map((m) => m.revenue), 1);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Statistiques</h1>
            <p className="text-gray-400">Analysez vos performances de vente</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="week">7 derniers jours</option>
            <option value="month">30 derniers jours</option>
            <option value="year">12 derniers mois</option>
          </select>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stats.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stats.revenueGrowth >= 0 ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {Math.abs(stats.revenueGrowth).toFixed(1)}%
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Revenu Total</h3>
            <p className="text-3xl font-bold text-white">
              {stats.totalRevenue.toLocaleString()} <span className="text-xl">FCFA</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">vs mois dernier</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-400" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stats.ordersGrowth >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stats.ordersGrowth >= 0 ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {Math.abs(stats.ordersGrowth).toFixed(1)}%
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Commandes</h3>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
            <p className="text-xs text-gray-500 mt-2">vs mois dernier</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Produits Actifs</h3>
            <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
            <p className="text-xs text-gray-500 mt-2">au catalogue</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Panier Moyen</h3>
            <p className="text-3xl font-bold text-white">
              {stats.averageOrderValue.toLocaleString()} <span className="text-xl">FCFA</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">par commande</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Évolution du Revenu (6 derniers mois)
          </h2>
          <div className="space-y-4">
            {stats.monthlyRevenue.map((data, idx) => {
              const barWidth = (data.revenue / maxRevenue) * 100;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 w-12">{data.month}</span>
                    <span className="text-sm font-semibold text-white">
                      {data.revenue.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-400" />
            Top 5 Produits
          </h2>
          <div className="space-y-4">
            {stats.topProducts.length > 0 ? (
              stats.topProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-400">{product.sales} vendus</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-green-400">
                    {product.revenue.toLocaleString()} FCFA
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">
                Aucune vente enregistrée
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
