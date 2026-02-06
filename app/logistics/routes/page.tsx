'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Route as RouteIcon, 
  Navigation, 
  Clock,
  Truck,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  MapPinned
} from 'lucide-react';

interface RouteData {
  id: string;
  name: string;
  status: 'planned' | 'active' | 'completed';
  driver: string;
  vehicle: string;
  deliveries: number;
  distance: number;
  estimatedTime: string;
  currentLocation?: string;
  waypoints: string[];
  startTime?: string;
  endTime?: string;
}

export default function RoutesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Mock routes data
    setRoutes([
      {
        id: '1',
        name: 'Route Nord - Porto-Novo',
        status: 'active',
        driver: 'Chauffeur A',
        vehicle: 'VH-001',
        deliveries: 8,
        distance: 45,
        estimatedTime: '2h 30min',
        currentLocation: 'Akpakpa',
        waypoints: ['Porto-Novo Centre', 'Ouando', 'Avrankou', 'Adjarra'],
        startTime: '08:00'
      },
      {
        id: '2',
        name: 'Route Sud - Cotonou',
        status: 'active',
        driver: 'Chauffeur B',
        vehicle: 'VH-002',
        deliveries: 12,
        distance: 38,
        estimatedTime: '2h 15min',
        currentLocation: 'Fidjrossè',
        waypoints: ['Cotonou Centre', 'Fidjrossè', 'Cadjèhoun', 'Godomey'],
        startTime: '07:30'
      },
      {
        id: '3',
        name: 'Route Ouest - Abomey-Calavi',
        status: 'planned',
        driver: 'Chauffeur C',
        vehicle: 'VH-003',
        deliveries: 6,
        distance: 25,
        estimatedTime: '1h 45min',
        waypoints: ['Calavi Centre', 'Akassato', 'Godomey', 'Togbin']
      },
      {
        id: '4',
        name: 'Route Est - Sèmè-Kpodji',
        status: 'planned',
        driver: 'Chauffeur D',
        vehicle: 'VH-004',
        deliveries: 5,
        distance: 32,
        estimatedTime: '2h 00min',
        waypoints: ['Sèmè', 'Kpodji', 'Djèrègbé', 'Togoudo']
      },
      {
        id: '5',
        name: 'Route Centre - Ouidah',
        status: 'completed',
        driver: 'Chauffeur E',
        vehicle: 'VH-005',
        deliveries: 10,
        distance: 42,
        estimatedTime: '2h 20min',
        waypoints: ['Ouidah Centre', 'Pahou', 'Savi', 'Djègbadji'],
        startTime: '06:00',
        endTime: '15:30'
      }
    ]);
    setLoading(false);
  }, [user, router]);

  const getStatusBadge = (status: string) => {
    const badges = {
      planned: { label: 'Planifiée', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Clock },
      active: { label: 'En cours', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Navigation },
      completed: { label: 'Terminée', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
    };

    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const stats = {
    total: routes.length,
    active: routes.filter(r => r.status === 'active').length,
    planned: routes.filter(r => r.status === 'planned').length,
    completed: routes.filter(r => r.status === 'completed').length,
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
        <h1 className="text-3xl font-bold text-white mb-2">Gestion des Itinéraires</h1>
        <p className="text-gray-400">Planifiez et optimisez vos routes de livraison</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Routes</span>
            <RouteIcon className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">En cours</span>
            <Navigation className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Planifiées</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.planned}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Terminées</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.completed}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Actions Rapides</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 font-medium">
              Nouvelle Route
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
              Optimiser Routes
            </button>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{route.name}</h3>
                  {getStatusBadge(route.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>{route.driver} • {route.vehicle}</span>
                  </div>
                  {route.startTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Départ: {route.startTime}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Livraisons</p>
                <p className="text-2xl font-bold text-orange-400">{route.deliveries}</p>
              </div>
            </div>

            {/* Route Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-700/30 rounded-lg">
              <div>
                <p className="text-xs text-gray-400 mb-1">Distance totale</p>
                <p className="text-lg font-semibold text-white">{route.distance} km</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Temps estimé</p>
                <p className="text-lg font-semibold text-white">{route.estimatedTime}</p>
              </div>
              {route.currentLocation && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Position actuelle</p>
                  <p className="text-lg font-semibold text-green-400">{route.currentLocation}</p>
                </div>
              )}
            </div>

            {/* Waypoints */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                <MapPinned className="w-4 h-4 text-orange-500" />
                Points d'arrêt
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {route.waypoints.map((waypoint, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-300">{waypoint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar for Active Routes */}
            {route.status === 'active' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progression</span>
                  <span className="text-sm font-semibold text-orange-400">45%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
              {route.status === 'planned' && (
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 text-sm font-medium">
                  Démarrer la route
                </button>
              )}
              {route.status === 'active' && (
                <>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 text-sm font-medium flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Suivre en temps réel
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200 text-sm font-medium">
                    Marquer terminée
                  </button>
                </>
              )}
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium">
                Modifier
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Voir sur la carte
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Route Optimization Tips */}
      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Conseils d'optimisation</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Regroupez les livraisons par zone géographique</li>
              <li>• Planifiez les routes en tenant compte du trafic</li>
              <li>• Optimisez l'ordre des arrêts pour réduire la distance</li>
              <li>• Utilisez le suivi GPS pour ajuster en temps réel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
