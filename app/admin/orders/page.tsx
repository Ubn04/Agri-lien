'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { Order } from '@/lib/types';
import { 
  ShoppingCart, Search, Clock, CheckCircle, Package as PackageIcon, 
  Truck, XCircle, DollarSign, MapPin, User
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map(o => 
          o.id === orderId ? { ...o, status: newStatus } : o
        ));
        alert('Statut de la commande mis à jour');
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { 
        icon: Clock, 
        color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
        label: 'En attente'
      },
      confirmed: { 
        icon: CheckCircle, 
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        label: 'Confirmée'
      },
      processing: { 
        icon: PackageIcon, 
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        label: 'En préparation'
      },
      shipped: { 
        icon: Truck, 
        color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        label: 'Expédiée'
      },
      delivered: { 
        icon: CheckCircle, 
        color: 'bg-green-500/10 text-green-400 border-green-500/30',
        label: 'Livrée'
      },
      cancelled: { 
        icon: XCircle, 
        color: 'bg-red-500/10 text-red-400 border-red-500/30',
        label: 'Annulée'
      },
    };

    const config = configs[status as keyof typeof configs] || configs.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getAvailableActions = (status: string) => {
    const actions: { [key: string]: { status: string; label: string; color: string }[] } = {
      pending: [
        { status: 'confirmed', label: 'Confirmer', color: 'from-blue-500 to-blue-600' },
        { status: 'cancelled', label: 'Annuler', color: 'from-red-500 to-red-600' },
      ],
      confirmed: [
        { status: 'processing', label: 'Préparer', color: 'from-purple-500 to-purple-600' },
        { status: 'cancelled', label: 'Annuler', color: 'from-red-500 to-red-600' },
      ],
      processing: [
        { status: 'shipped', label: 'Expédier', color: 'from-orange-500 to-orange-600' },
      ],
      shipped: [
        { status: 'delivered', label: 'Livrer', color: 'from-green-500 to-green-600' },
      ],
    };

    return actions[status] || [];
  };

  const stats = {
    total: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'delivered').length,
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

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion des Commandes</h1>
          <p className="text-gray-400">{filteredOrders.length} commande(s) trouvée(s)</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Commandes</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Revenus Totaux</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">FCFA</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">En attente</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Complétées</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par ID, acheteur ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="processing">En préparation</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-900/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      Commande #{order.id.slice(0, 8)}
                    </h3>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-300">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {order.buyer.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {order.deliveryAddress || 'Adresse non spécifiée'}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(order.createdAt).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Montant total</p>
                  <p className="text-2xl font-bold text-green-400">{order.total.toLocaleString()} FCFA</p>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Articles</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-white">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-gray-300">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {getAvailableActions(order.status).length > 0 && (
                <div className="flex gap-2">
                  {getAvailableActions(order.status).map((action) => (
                    <button
                      key={action.status}
                      onClick={() => updateOrderStatus(order.id, action.status)}
                      className={`px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-lg hover:shadow-lg transition-all`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <ShoppingCart className="mx-auto w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">Aucune commande trouvée</h3>
            <p className="text-sm text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}
