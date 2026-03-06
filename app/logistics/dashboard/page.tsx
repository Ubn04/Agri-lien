'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  Car,
  TrendingUp,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface DeliveryStats {
  totalDeliveries: number;
  pendingDeliveries: number;
  inTransitDeliveries: number;
  completedDeliveries: number;
  activeVehicles: number;
  totalDistance: number;
  recentDeliveries: any[];
}

export default function LogisticsDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DeliveryStats>({
    totalDeliveries: 0,
    pendingDeliveries: 0,
    inTransitDeliveries: 0,
    completedDeliveries: 0,
    activeVehicles: 0,
    totalDistance: 0,
    recentDeliveries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchStats();
  }, [user, router]);

  const fetchStats = async () => {
    try {
      // Fetch orders for delivery management
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (data.success && data.data) {
        const orders = data.data;
        
        // Calculate delivery stats
        const pending = orders.filter((o: any) => o.status === 'CONFIRMED').length;
        const inTransit = orders.filter((o: any) => o.status === 'IN_TRANSIT').length;
        const completed = orders.filter((o: any) => o.status === 'delivered').length;

        setStats({
          totalDeliveries: orders.length,
          pendingDeliveries: pending,
          inTransitDeliveries: inTransit,
          completedDeliveries: completed,
          activeVehicles: 8, // Mock data
          totalDistance: 1250, // Mock data in km
          recentDeliveries: orders.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
      confirmed: { label: 'Confirmée', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: CheckCircle },
      processing: { label: 'En préparation', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Package },
      shipped: { label: 'En transit', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Truck },
      delivered: { label: 'Livrée', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      cancelled: { label: 'Annulée', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertCircle },
    };

    const badge = badges[status as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de Bord Logistique</h1>
        <p className="text-gray-400">Bienvenue, {user?.firstName} {user?.lastName}. Gérez vos livraisons et votre flotte.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.totalDeliveries}</h3>
          <p className="text-gray-400 text-sm">Livraisons totales</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
              En attente
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.pendingDeliveries}</h3>
          <p className="text-gray-400 text-sm">À livrer</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
              En cours
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.inTransitDeliveries}</h3>
          <p className="text-gray-400 text-sm">En transit</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
              Terminées
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.completedDeliveries}</h3>
          <p className="text-gray-400 text-sm">Livrées avec succès</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => router.push('/logistics/deliveries')}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-200 group"
        >
          <Truck className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Livraisons</h3>
          <p className="text-orange-100 text-sm">Gérer les livraisons</p>
        </button>

        <button
          onClick={() => router.push('/logistics/routes')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 group"
        >
          <MapPin className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Itinéraires</h3>
          <p className="text-blue-100 text-sm">Planifier les routes</p>
        </button>

        <button
          onClick={() => router.push('/logistics/vehicles')}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-200 group"
        >
          <Car className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Véhicules</h3>
          <p className="text-purple-100 text-sm">Gérer la flotte</p>
        </button>

        <button
          onClick={() => router.push('/logistics/stats')}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-green-500/20 transition-all duration-200 group"
        >
          <TrendingUp className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Statistiques</h3>
          <p className="text-green-100 text-sm">Voir les performances</p>
        </button>
      </div>

      {/* Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Car className="w-6 h-6 text-orange-500" />
            État de la Flotte
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Véhicules actifs</p>
                <p className="text-sm text-gray-400">En service actuellement</p>
              </div>
              <span className="text-2xl font-bold text-green-400">{stats.activeVehicles}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Distance parcourue</p>
                <p className="text-sm text-gray-400">Ce mois-ci</p>
              </div>
              <span className="text-2xl font-bold text-orange-400">{stats.totalDistance} km</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-white font-medium">Maintenance</p>
                <p className="text-sm text-gray-400">Véhicules en révision</p>
              </div>
              <span className="text-2xl font-bold text-yellow-400">2</span>
            </div>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Truck className="w-6 h-6 text-orange-500" />
            Livraisons Récentes
          </h2>
          {stats.recentDeliveries.length > 0 ? (
            <div className="space-y-3">
              {stats.recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Commande #{delivery.orderNumber}</span>
                    {getStatusBadge(delivery.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{delivery.deliveryAddress?.substring(0, 40)}...</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(delivery.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Aucune livraison récente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
