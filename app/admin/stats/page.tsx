'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, TrendingUp, Users, Package, ShoppingCart, DollarSign,
  Activity, Calendar
} from 'lucide-react';

export default function AdminStatsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [user, router]);

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
          <h1 className="text-3xl font-bold text-white mb-2">Statistiques Avancées</h1>
          <p className="text-gray-400">Analyses et rapports détaillés</p>
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <div className="mb-6">
            <BarChart3 className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Statistiques Détaillées</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Cette fonctionnalité est en cours de développement. Vous pourrez bientôt accéder à des 
            graphiques détaillés, des rapports personnalisés et des analyses approfondies.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Croissance</p>
                <p className="text-2xl font-bold text-white">+25%</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Activité</p>
                <p className="text-2xl font-bold text-white">Élevée</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Période</p>
                <p className="text-2xl font-bold text-white">30j</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
