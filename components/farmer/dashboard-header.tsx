'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bell, Menu, X, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/farmer/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-agri-green-600">🌾 Agri-Lien</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/farmer/dashboard" className="text-gray-700 hover:text-agri-green-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/farmer/products" className="text-gray-700 hover:text-agri-green-600 font-medium transition-colors">
              Mes produits
            </Link>
            <Link href="/farmer/orders" className="text-gray-700 hover:text-agri-green-600 font-medium transition-colors">
              Commandes
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-agri-green-600 font-medium transition-colors">
              Marché
            </Link>
          </div>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Menu profil */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-agri-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  K
                </div>
                <span className="text-sm font-medium text-gray-700">Koffi M.</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Dropdown menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <Link href="/farmer/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="w-4 h-4" />
                    Mon profil
                  </Link>
                  <Link href="/farmer/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Link>
                  <hr className="my-2" />
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <Link href="/farmer/dashboard" className="block text-gray-700 hover:text-agri-green-600 font-medium">
              Dashboard
            </Link>
            <Link href="/farmer/products" className="block text-gray-700 hover:text-agri-green-600 font-medium">
              Mes produits
            </Link>
            <Link href="/farmer/orders" className="block text-gray-700 hover:text-agri-green-600 font-medium">
              Commandes
            </Link>
            <Link href="/marketplace" className="block text-gray-700 hover:text-agri-green-600 font-medium">
              Marché
            </Link>
            <hr />
            <Link href="/farmer/profile" className="block text-gray-700 hover:text-agri-green-600">
              Mon profil
            </Link>
            <button className="block text-red-600 hover:text-red-700 w-full text-left">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
