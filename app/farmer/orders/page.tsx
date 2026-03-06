'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MapPin,
  User,
  DollarSign,
  Filter,
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    product?: any;
  }>;
  total: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
}

export default function FarmerOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      router.push('/login');
      return;
    }
    fetchData();
  }, [user, router]);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      const allProducts = productsData.products || productsData.data?.products || [];
      const allOrders = ordersData.orders || ordersData.data?.orders || [];

      const myProducts = allProducts.filter((p: any) => p.farmerId === user?.id);
      setProducts(myProducts);

      const myOrders = allOrders.filter((o: any) =>
        o.items?.some((item: any) => {
          const productId = item.product?.id || item.productId;
          return myProducts.find((p: any) => p.id === productId);
        })
      );
      setOrders(myOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === statusFilter));
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { icon: any; color: string; label: string }> = {
      pending: {
        icon: Clock,
        color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
        label: 'En attente',
      },
      confirmed: {
        icon: CheckCircle,
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        label: 'Confirmée',
      },
      processing: {
        icon: Package,
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        label: 'En préparation',
      },
      shipped: {
        icon: Truck,
        color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        label: 'Expédiée',
      },
      delivered: {
        icon: CheckCircle,
        color: 'bg-green-500/10 text-green-400 border-green-500/30',
        label: 'Livrée',
      },
      cancelled: {
        icon: XCircle,
        color: 'bg-red-500/10 text-red-400 border-red-500/30',
        label: 'Annulée',
      },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${badge.color} text-xs font-medium`}
      >
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const getNextStatus = (currentStatus: string): string | null => {
    const statusFlow: Record<string, string> = {
      pending: 'confirmed',
      confirmed: 'processing',
      processing: 'shipped',
      shipped: 'delivered',
    };
    return statusFlow[currentStatus] || null;
  };

  const getNextStatusLabel = (currentStatus: string): string => {
    const labels: Record<string, string> = {
      pending: 'Confirmer',
      confirmed: 'Préparer',
      processing: 'Expédier',
      shipped: 'Livrer',
    };
    return labels[currentStatus] || 'Mettre à jour';
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

  const statusOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'processing', label: 'En préparation' },
    { value: 'shipped', label: 'Expédiées' },
    { value: 'delivered', label: 'Livrées' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mes Commandes</h1>
          <p className="text-gray-400">{orders.length} commande(s) au total</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-2xl font-bold text-white">{orders.length}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">En attente</p>
            <p className="text-2xl font-bold text-yellow-400">
              {orders.filter((o) => o.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Confirmées</p>
            <p className="text-2xl font-bold text-blue-400">
              {orders.filter((o) => o.status === 'CONFIRMED').length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">En cours</p>
            <p className="text-2xl font-bold text-purple-400">
              {orders.filter((o) => o.status === 'PREPARING' || o.status === 'IN_TRANSIT').length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Livrées</p>
            <p className="text-2xl font-bold text-green-400">
              {orders.filter((o) => o.status === 'DELIVERED').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-white" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-gray-400">
              {statusFilter !== 'all'
                ? 'Essayez de changer le filtre'
                : 'Les commandes apparaîtront ici'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-900/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Commande #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Items */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Articles commandés
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-300">
                            {item.product?.name || 'Produit'} x {item.quantity}
                          </span>
                          <span className="text-white font-medium">
                            {((item.product?.price || 0) * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-white">
                        Total: {order.total.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {nextStatus && order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateOrderStatus(order.id, nextStatus)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/50"
                      >
                        {getNextStatusLabel(order.status)}
                      </button>
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
