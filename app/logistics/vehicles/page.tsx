'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  Car, 
  Truck, 
  Wrench,
  Fuel,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Search
} from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  plateNumber: string;
  type: 'truck' | 'van' | 'motorcycle';
  status: 'active' | 'maintenance' | 'inactive';
  driver: string;
  capacity: string;
  fuelLevel: number;
  mileage: number;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedRoute?: string;
}

export default function VehiclesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Mock vehicles data
    setVehicles([
      {
        id: '1',
        name: 'Camion 1',
        plateNumber: 'VH-001',
        type: 'truck',
        status: 'active',
        driver: 'Chauffeur A',
        capacity: '5 tonnes',
        fuelLevel: 85,
        mileage: 45230,
        lastMaintenance: '2025-12-15',
        nextMaintenance: '2026-03-15',
        assignedRoute: 'Route Nord - Porto-Novo'
      },
      {
        id: '2',
        name: 'Camionnette 2',
        plateNumber: 'VH-002',
        type: 'van',
        status: 'active',
        driver: 'Chauffeur B',
        capacity: '2 tonnes',
        fuelLevel: 60,
        mileage: 32100,
        lastMaintenance: '2026-01-10',
        nextMaintenance: '2026-04-10',
        assignedRoute: 'Route Sud - Cotonou'
      },
      {
        id: '3',
        name: 'Camion 3',
        plateNumber: 'VH-003',
        type: 'truck',
        status: 'maintenance',
        driver: 'Non assigné',
        capacity: '5 tonnes',
        fuelLevel: 20,
        mileage: 52890,
        lastMaintenance: '2026-02-01',
        nextMaintenance: '2026-02-10'
      },
      {
        id: '4',
        name: 'Moto 4',
        plateNumber: 'VH-004',
        type: 'motorcycle',
        status: 'active',
        driver: 'Chauffeur D',
        capacity: '100 kg',
        fuelLevel: 95,
        mileage: 18450,
        lastMaintenance: '2026-01-20',
        nextMaintenance: '2026-04-20',
        assignedRoute: 'Route Est - Sèmè-Kpodji'
      },
      {
        id: '5',
        name: 'Camionnette 5',
        plateNumber: 'VH-005',
        type: 'van',
        status: 'active',
        driver: 'Chauffeur E',
        capacity: '2 tonnes',
        fuelLevel: 75,
        mileage: 28900,
        lastMaintenance: '2025-12-28',
        nextMaintenance: '2026-03-28'
      },
      {
        id: '6',
        name: 'Camion 6',
        plateNumber: 'VH-006',
        type: 'truck',
        status: 'inactive',
        driver: 'Non assigné',
        capacity: '5 tonnes',
        fuelLevel: 0,
        mileage: 68200,
        lastMaintenance: '2025-11-15',
        nextMaintenance: '2026-02-15'
      }
    ]);
    setLoading(false);
  }, [user, router]);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchQuery, statusFilter]);

  const filterVehicles = () => {
    let filtered = [...vehicles];

    if (searchQuery) {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driver.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(v => v.status === statusFilter);
    }

    setFilteredVehicles(filtered);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { label: 'En service', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      maintenance: { label: 'Maintenance', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Wrench },
      inactive: { label: 'Inactif', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: AlertCircle },
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

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck':
        return Truck;
      case 'van':
        return Car;
      case 'motorcycle':
        return Car;
      default:
        return Truck;
    }
  };

  const getFuelColor = (level: number) => {
    if (level >= 70) return 'bg-green-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion de la Flotte</h1>
          <p className="text-gray-400">Gérez et suivez tous vos véhicules</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Ajouter un véhicule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Véhicules</span>
            <Truck className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">En service</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">En maintenance</span>
            <Wrench className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.maintenance}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Inactifs</span>
            <AlertCircle className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.inactive}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, immatriculation ou chauffeur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">En service</option>
            <option value="maintenance">En maintenance</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle) => {
          const VehicleIcon = getVehicleIcon(vehicle.type);
          
          return (
            <div key={vehicle.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                    <VehicleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                    <p className="text-sm text-gray-400">{vehicle.plateNumber}</p>
                  </div>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>

              {/* Driver & Capacity */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Chauffeur</p>
                  <p className="text-sm font-medium text-white">{vehicle.driver}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Capacité</p>
                  <p className="text-sm font-medium text-white">{vehicle.capacity}</p>
                </div>
              </div>

              {/* Assigned Route */}
              {vehicle.assignedRoute && (
                <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-xs text-orange-400 mb-1">Route assignée</p>
                  <p className="text-sm font-medium text-white">{vehicle.assignedRoute}</p>
                </div>
              )}

              {/* Fuel Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Niveau de carburant</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{vehicle.fuelLevel}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getFuelColor(vehicle.fuelLevel)}`}
                    style={{ width: `${vehicle.fuelLevel}%` }}
                  ></div>
                </div>
              </div>

              {/* Mileage & Maintenance */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <p className="text-xs text-gray-400">Kilométrage</p>
                  </div>
                  <p className="text-lg font-bold text-white">{vehicle.mileage.toLocaleString()} km</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-orange-400" />
                    <p className="text-xs text-gray-400">Prochaine maintenance</p>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {new Date(vehicle.nextMaintenance).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {/* Maintenance Alert */}
              {new Date(vehicle.nextMaintenance) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-400">Maintenance bientôt requise</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Dernière maintenance: {new Date(vehicle.lastMaintenance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 text-sm font-medium">
                  Modifier
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium">
                  Historique
                </button>
                {vehicle.status === 'active' && (
                  <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm font-medium">
                    Maintenance
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Aucun véhicule trouvé</h3>
          <p className="text-gray-400">Ajustez vos filtres ou ajoutez un nouveau véhicule</p>
        </div>
      )}
    </div>
  );
}
