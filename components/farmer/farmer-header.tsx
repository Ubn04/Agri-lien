'use client'

import { Search, Settings, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { useTheme } from '@/components/providers/theme-provider'
import { NotificationDropdown } from '@/components/shared/notification-dropdown'

export function FarmerHeader() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit, commande..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
            <div className="text-right">
              <div className="text-sm font-medium text-white">{user ? `${user.firstName} ${user.lastName}` : 'Fermier'}</div>
              <div className="text-xs text-gray-400">Fermier</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold">
              {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : 'F'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
