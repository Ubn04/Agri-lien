'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package,
  AlertCircle,
  Search,
  Filter,
  Phone,
  User
} from 'lucide-react';

interface Delivery {
  id: string;
  orderNumber: string;
  status: string;
  buyerName: string;
  buyerPhone: string;
  deliveryAddress: string;
  items: any[];
  total: number;
  createdAt: string;
  deliveryDate?: string;
  driver?: string;
  vehicle?: string;
}

export default function DeliveriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchDeliveries();
  }, [user, router]);

  useEffect(() => {
    filterDeliveries();
  }, [deliveries, searchQuery, statusFilter]);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (data.success && data.data) {
        // Map orders to deliveries format
        const deliveriesData = data.data.map((order: any) => ({
          ...order,
          buyerName: 'Acheteur', // Mock data
          buyerPhone: '+229 XX XX XX XX',
          driver: order.status === 'IN_TRANSIT' || order.status === 'DELIVERED' ? 'Chauffeur A' : null,
          vehicle: order.status === 'IN_TRANSIT' || order.status === 'DELIVERED' ? 'VH-001' : null,
        }));

        setDeliveries(deliveriesData);
      }
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDeliveries = () => {
    let filtered = [...deliveries];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }

    setFilteredDeliveries(filtered);
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

  const updateDeliveryStatus = async (deliveryId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${deliveryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh deliveries
        fetchDeliveries();
      }
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  const stats = {
    total: deliveries.length,
    pending: deliveries.filter(d => d.status === 'CONFIRMED').length,
    inTransit: deliveries.filter(d => d.status === 'IN_TRANSIT').length,
    delivered: deliveries.filter(d => d.status === 'DELIVERED').length,
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
        <h1 className="text-3xl font-bold text-white mb-2">Gestion des Livraisons</h1>
        <p className="text-gray-400">Suivez et gérez toutes vos livraisons en temps réel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total</span>
            <Truck className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">En attente</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">En transit</span>
            <Package className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.inTransit}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Livrées</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par numéro ou adresse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="confirmed">Confirmées</option>
              <option value="shipped">En transit</option>
              <option value="delivered">Livrées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">Commande #{delivery.orderNumber}</h3>
                    {getStatusBadge(delivery.status)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(delivery.createdAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-400">{delivery.total.toLocaleString()} FCFA</p>
                  <p className="text-sm text-gray-400">{delivery.items.length} article(s)</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{delivery.buyerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{delivery.buyerPhone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                    <span className="text-sm">{delivery.deliveryAddress}</span>
                  </div>
                </div>

                {delivery.driver && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Truck className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Chauffeur: {delivery.driver}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Véhicule: {delivery.vehicle}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Articles</h4>
                <div className="space-y-1">
                  {delivery.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{item.productName} x{item.quantity}</span>
                      <span className="text-gray-400">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                {delivery.status === 'CONFIRMED' && (
                  <button
                    onClick={() => updateDeliveryStatus(delivery.id, 'shipped')}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 text-sm font-medium"
                  >
                    Marquer en transit
                  </button>
                )}
                {delivery.status === 'IN_TRANSIT' && (
                  <button
                    onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-200 text-sm font-medium"
                  >
                    Marquer livrée
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium">
                  Voir les détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <Truck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Aucune livraison trouvée</h3>
            <p className="text-gray-400">
              {statusFilter !== 'all' 
                ? 'Aucune livraison avec ce statut' 
                : 'Aucune livraison disponible pour le moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
