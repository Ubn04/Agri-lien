'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
  ArrowRight,
  Plus,
} from 'lucide-react';

interface FarmerStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  ordersThisMonth: number;
}

export default function FarmerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<FarmerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      router.push('/login');
      return;
    }

    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/products');
      const productsData = await response.json();
      
      const ordersResponse = await fetch('/api/orders');
      const ordersData = await ordersResponse.json();

      const myProducts = productsData.products?.filter((p: any) => p.farmerId === user?.id) || [];
      const myOrders = ordersData.orders?.filter((o: any) => 
        o.items?.some((item: any) => myProducts.find((p: any) => p.id === item.product?.id))
      ) || [];

      const thisMonth = new Date();
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      setStats({
        totalProducts: myProducts.length,
        totalOrders: myOrders.length,
        totalRevenue: myOrders.reduce((sum: number, o: any) => sum + o.total, 0),
        pendingOrders: myOrders.filter((o: any) => o.status === 'pending').length,
        lowStockProducts: myProducts.filter((p: any) => p.stock > 0 && p.stock <= 10).length,
        ordersThisMonth: myOrders.filter((o: any) => new Date(o.createdAt) >= thisMonth).length,
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

  const statCards = [
    {
      title: 'Mes Produits',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      change: `${stats.lowStockProducts} en rupture`,
    },
    {
      title: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      change: `+${stats.ordersThisMonth} ce mois`,
    },
    {
      title: 'Revenus',
      value: `${stats.totalRevenue.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      change: `${stats.pendingOrders} en attente`,
    },
  ];

  const quickActions = [
    {
      title: 'Ajouter un Produit',
      description: 'Mettre en vente un nouveau produit',
      icon: Plus,
      href: '/farmer/products/add',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Mes Produits',
      description: 'Gérer mon catalogue de produits',
      icon: Package,
      href: '/farmer/products',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Voir les Commandes',
      description: 'Suivre et traiter les commandes',
      icon: ShoppingCart,
      href: '/farmer/orders',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Statistiques',
      description: 'Analyser mes performances',
      icon: Activity,
      href: '/farmer/stats',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de Bord Fermier
          </h1>
          <p className="text-gray-400">
            Bienvenue, {user?.name}. Voici un aperçu de votre activité.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-900/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-xs font-medium`}>
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Actif
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={() => router.push(action.href)}
                  className="group bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-gray-600 transition-all hover:shadow-xl hover:shadow-gray-900/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        {stats.lowStockProducts > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-400 mb-1">
                  Alerte Stock
                </h3>
                <p className="text-orange-300/80 text-sm">
                  {stats.lowStockProducts} produit(s) en rupture de stock nécessitent votre attention.
                </p>
                <button
                  onClick={() => router.push('/farmer/products')}
                  className="mt-3 text-sm text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-2"
                >
                  Voir les produits
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
