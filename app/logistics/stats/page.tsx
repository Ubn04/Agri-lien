'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  TrendingDown,
  Package,
  Truck,
  Clock,
  CheckCircle,
  DollarSign,
  BarChart3
} from 'lucide-react';

export default function StatsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [user, router]);

  const stats = {
    deliveriesThisMonth: 142,
    deliveriesLastMonth: 128,
    deliveriesChange: 10.9,
    averageDeliveryTime: '2h 15min',
    deliveryTimeChange: -8.5,
    completionRate: 96.5,
    completionRateChange: 2.3,
    totalDistance: 3840,
    distanceChange: 12.4,
    activeDays: 23,
    averagePerDay: 6.2
  };

  const performanceData = [
    { month: 'Jan', deliveries: 98, onTime: 94 },
    { month: 'Fév', deliveries: 112, onTime: 96 },
    { month: 'Mar', deliveries: 128, onTime: 95 },
    { month: 'Avr', deliveries: 142, onTime: 97 }
  ];

  const topDrivers = [
    { name: 'Chauffeur A', deliveries: 45, rating: 4.8 },
    { name: 'Chauffeur B', deliveries: 42, rating: 4.7 },
    { name: 'Chauffeur E', deliveries: 38, rating: 4.9 },
    { name: 'Chauffeur C', deliveries: 35, rating: 4.6 },
    { name: 'Chauffeur D', deliveries: 28, rating: 4.5 }
  ];

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
        <h1 className="text-3xl font-bold text-white mb-2">Statistiques & Performances</h1>
        <p className="text-gray-400">Analysez vos performances logistiques</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.deliveriesChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.deliveriesChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(stats.deliveriesChange)}%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.deliveriesThisMonth}</h3>
          <p className="text-gray-400 text-sm">Livraisons ce mois</p>
          <p className="text-xs text-gray-500 mt-2">{stats.deliveriesLastMonth} le mois dernier</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.deliveryTimeChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.deliveryTimeChange <= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              {Math.abs(stats.deliveryTimeChange)}%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.averageDeliveryTime}</h3>
          <p className="text-gray-400 text-sm">Temps moyen</p>
          <p className="text-xs text-gray-500 mt-2">Par livraison</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.completionRateChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.completionRateChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(stats.completionRateChange)}%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.completionRate}%</h3>
          <p className="text-gray-400 text-sm">Taux de réussite</p>
          <p className="text-xs text-gray-500 mt-2">Livraisons réussies</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.distanceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.distanceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(stats.distanceChange)}%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.totalDistance} km</h3>
          <p className="text-gray-400 text-sm">Distance parcourue</p>
          <p className="text-xs text-gray-500 mt-2">Ce mois-ci</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-orange-500" />
          Performance des 4 derniers mois
        </h2>
        <div className="space-y-4">
          {performanceData.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">{data.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{data.deliveries} livraisons</span>
                  <span className="text-sm text-green-400">{data.onTime}% à temps</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                    style={{ width: `${(data.deliveries / 150) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${data.onTime}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers & Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Drivers */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            Top Chauffeurs
          </h2>
          <div className="space-y-3">
            {topDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{driver.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{driver.deliveries} livraisons</span>
                      <span className="text-xs text-yellow-400">★ {driver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-500" />
            Métriques Additionnelles
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Jours actifs ce mois</span>
                <span className="text-2xl font-bold text-white">{stats.activeDays}</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{ width: `${(stats.activeDays / 30) * 100}%` }}></div>
              </div>
            </div>

            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Livraisons par jour</span>
                <span className="text-2xl font-bold text-white">{stats.averagePerDay}</span>
              </div>
              <p className="text-xs text-gray-500">Moyenne quotidienne</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Excellente performance</span>
              </div>
              <p className="text-sm text-gray-300">Votre équipe logistique dépasse les objectifs mensuels de 10%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          Insights & Recommandations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium mb-1">Optimisation des routes</p>
              <p className="text-sm text-gray-300">Réduction de 8.5% du temps de livraison grâce à l'optimisation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium mb-1">Taux de satisfaction</p>
              <p className="text-sm text-gray-300">96.5% de livraisons réussies à temps ce mois-ci</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium mb-1">Utilisation de la flotte</p>
              <p className="text-sm text-gray-300">Taux d'utilisation optimal des véhicules à 87%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <div>
              <p className="text-white font-medium mb-1">Efficacité énergétique</p>
              <p className="text-sm text-gray-300">Consommation de carburant réduite de 5% ce mois</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
