'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  Heart,
  TrendingUp,
  Store,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface BuyerStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalSpent: number;
  favoriteProducts: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
    items: any[];
  }>;
}

export default function BuyerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<BuyerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      router.push('/login');
      return;
    }
    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      const myOrders = data.orders?.filter((o: any) => o.buyerId === user?.id) || [];

      setStats({
        totalOrders: myOrders.length,
        pendingOrders: myOrders.filter((o: any) => o.status === 'pending' || o.status === 'confirmed').length,
        completedOrders: myOrders.filter((o: any) => o.status === 'delivered').length,
        totalSpent: myOrders.reduce((sum: number, o: any) => sum + o.total, 0),
        favoriteProducts: 0,
        recentOrders: myOrders.slice(0, 5),
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
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Commandes Totales',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      change: `${stats.pendingOrders} en cours`,
    },
    {
      title: 'Commandes Livrées',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      change: 'Terminées',
    },
    {
      title: 'Montant Total',
      value: `${stats.totalSpent.toLocaleString()} FCFA`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      change: 'Dépensé',
    },
  ];

  const quickActions = [
    {
      title: 'Parcourir le Catalogue',
      description: 'Découvrir les produits disponibles',
      icon: Store,
      href: '/buyer/catalog',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Mon Panier',
      description: 'Voir et finaliser mes achats',
      icon: ShoppingCart,
      href: '/buyer/cart',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Mes Commandes',
      description: 'Suivre l\'état de mes commandes',
      icon: Package,
      href: '/buyer/orders',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Mes Favoris',
      description: 'Accéder à mes produits favoris',
      icon: Heart,
      href: '/buyer/favorites',
      color: 'from-red-500 to-red-600',
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string; icon: any }> = {
      pending: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', label: 'En attente', icon: Clock },
      confirmed: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', label: 'Confirmée', icon: CheckCircle },
      processing: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/30', label: 'En préparation', icon: Package },
      shipped: { color: 'bg-orange-500/10 text-orange-400 border-orange-500/30', label: 'Expédiée', icon: Package },
      delivered: { color: 'bg-green-500/10 text-green-400 border-green-500/30', label: 'Livrée', icon: CheckCircle },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${badge.color} text-xs font-medium`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de Bord Acheteur
          </h1>
          <p className="text-gray-400">
            Bienvenue, {user?.name}. Gérez vos achats et commandes.
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

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Commandes Récentes</h2>
            <button
              onClick={() => router.push('/buyer/orders')}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-900/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Commande #{order.orderNumber}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                      {order.items.length} article(s)
                    </p>
                    <p className="text-white font-bold">
                      {order.total.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucune commande
              </h3>
              <p className="text-gray-400 mb-6">
                Commencez vos achats dès maintenant
              </p>
              <button
                onClick={() => router.push('/buyer/catalog')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <Store className="w-5 h-5" />
                Parcourir le Catalogue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
