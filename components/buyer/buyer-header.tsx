'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { useTheme } from '@/components/providers/theme-provider';
import { NotificationDropdown } from '@/components/shared/notification-dropdown';
import { Search, Settings, Sun, Moon, ShoppingCart } from 'lucide-react';

export default function BuyerHeader() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart Icon */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">{user ? `${user.firstName} ${user.lastName}` : 'Acheteur'}</p>
              <p className="text-gray-400 text-xs">Acheteur</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
