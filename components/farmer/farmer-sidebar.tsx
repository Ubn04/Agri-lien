'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  TrendingUp,
  LogOut,
  Sprout
} from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/farmer/dashboard' },
  { icon: Package, label: 'Mes Produits', href: '/farmer/products' },
  { icon: ShoppingCart, label: 'Commandes', href: '/farmer/orders' },
  { icon: BarChart3, label: 'Statistiques', href: '/farmer/stats' },
  { icon: Settings, label: 'Paramètres', href: '/farmer/settings' },
];

export function FarmerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/farmer/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-green-500/50 transition-all">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Agri-Lien</h1>
            <p className="text-xs text-gray-400">Espace Fermier</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
