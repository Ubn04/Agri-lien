'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Truck, 
  Route, 
  Car, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';

const navigation = [
  { name: 'Tableau de Bord', href: '/logistics/dashboard', icon: LayoutDashboard },
  { name: 'Livraisons', href: '/logistics/deliveries', icon: Truck },
  { name: 'Itinéraires', href: '/logistics/routes', icon: Route },
  { name: 'Véhicules', href: '/logistics/vehicles', icon: Car },
  { name: 'Statistiques', href: '/logistics/stats', icon: BarChart3 },
  { name: 'Paramètres', href: '/logistics/settings', icon: Settings },
];

export default function LogisticsSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Agri-Lien</h1>
          <p className="text-xs text-gray-400">Espace Logistique</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/50' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
