'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  newUsersToday: number;
  ordersToday: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (data.success && data.data.stats) {
        setStats(data.data.stats);
      }
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
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      change: `+${stats.newUsersToday} aujourd'hui`,
    },
    {
      title: 'Produits',
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
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      change: `+${stats.ordersToday} aujourd'hui`,
    },
    {
      title: 'Revenus',
      value: `${stats.totalRevenue.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
      change: `${stats.pendingOrders} en attente`,
    },
  ];

  const quickActions = [
    {
      title: 'Gérer les Utilisateurs',
      description: 'Voir, modifier et supprimer les utilisateurs',
      icon: Users,
      href: '/admin/users',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Gérer les Produits',
      description: 'Gérer le catalogue de produits',
      icon: Package,
      href: '/admin/products',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Gérer les Commandes',
      description: 'Suivre et traiter les commandes',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Voir les Statistiques',
      description: 'Analyser les performances de la plateforme',
      icon: Activity,
      href: '/admin/stats',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de Bord Admin
          </h1>
          <p className="text-gray-400">
            Bienvenue, {user?.firstName} {user?.lastName}. Voici un aperçu de votre plateforme.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* System Health */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">État du Système</h2>
            <div className="flex items-center gap-2 text-green-400">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">Opérationnel</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">API</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  Actif
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Base de données</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  Actif
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Paiements</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  Actif
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
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
                  onClick={() => router.push('/admin/products')}
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
