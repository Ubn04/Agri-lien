'use client'

import { useState } from 'react'
import { useOrders } from '@/lib/hooks/use-orders'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'

export default function FarmerOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { orders, isLoading, updateOrderStatus } = useOrders()

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    confirmed: orders.filter(o => o.status === 'CONFIRMED').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
      CONFIRMED: { color: 'bg-blue-100 text-blue-800', text: 'Confirmée' },
      IN_PROGRESS: { color: 'bg-purple-100 text-purple-800', text: 'En cours' },
      COMPLETED: { color: 'bg-green-100 text-green-800', text: 'Terminée' },
      CANCELLED: { color: 'bg-red-100 text-red-800', text: 'Annulée' },
    }

    const variant = variants[status] || variants.PENDING
    return <Badge className={variant.color}>{variant.text}</Badge>
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mes Commandes</h1>
        <p className="text-gray-600">Gérez vos commandes clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Package className="h-10 w-10 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">En attente</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="h-10 w-10 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Confirmées</p>
              <p className="text-2xl font-bold">{stats.confirmed}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Terminées</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Rechercher par numéro ou client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Toutes
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            En attente
          </Button>
          <Button
            variant={filter === 'confirmed' ? 'default' : 'outline'}
            onClick={() => setFilter('confirmed')}
          >
            Confirmées
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Terminées
          </Button>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune commande trouvée
          </h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "Vous n'avez pas encore de commandes"
              : `Aucune commande ${filter}`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Client: {order.buyer?.name}</p>
                    <p>Date: {formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items.length} produit(s)
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span className="font-medium">
                        {formatCurrency(item.pricePerUnit * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link href={`/orders/${order.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Voir détails
                    </Button>
                  </Link>
                  
                  {order.status === 'PENDING' && (
                    <Button
                      onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                      className="flex-1"
                    >
                      Confirmer
                    </Button>
                  )}

                  {order.status === 'CONFIRMED' && (
                    <Button
                      onClick={() => handleStatusChange(order.id, 'IN_PROGRESS')}
                      className="flex-1"
                    >
                      Préparer
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
