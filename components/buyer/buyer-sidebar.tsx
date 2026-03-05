'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Package,
  Heart,
  Settings,
  LogOut,
  Store,
} from 'lucide-react';

export default function BuyerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/buyer/dashboard' },
    { icon: Store, label: 'Catalogue', href: '/buyer/catalog' },
    { icon: ShoppingCart, label: 'Mon Panier', href: '/buyer/cart' },
    { icon: Package, label: 'Mes Commandes', href: '/buyer/orders' },
    { icon: Heart, label: 'Favoris', href: '/buyer/favorites' },
    { icon: Settings, label: 'Paramètres', href: '/buyer/settings' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Agri-Lien</h1>
            <p className="text-gray-400 text-xs">Espace Acheteur</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
