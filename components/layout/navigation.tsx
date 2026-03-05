'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">🌾 Agri-Lien</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-700 hover:text-primary-600 font-medium">
              Marketplace
            </Link>
            <Link href="/ussd" className="text-gray-700 hover:text-primary-600 font-medium">
              USSD
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              À propos
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button 
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300 hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 transition-colors"
              >
                <User className="h-5 w-5 mr-2" />
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button>S'inscrire</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/marketplace" className="block text-gray-700 hover:text-primary-600 font-medium">
              Marketplace
            </Link>
            <Link href="/ussd" className="block text-gray-700 hover:text-primary-600 font-medium">
              USSD
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary-600 font-medium">
              À propos
            </Link>
            <div className="pt-3 space-y-2">
              <Link href="/login" className="block">
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-100 text-gray-700 border-gray-300 hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 transition-colors"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full">S'inscrire</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
