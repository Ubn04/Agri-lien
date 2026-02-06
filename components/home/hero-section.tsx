'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, MapPin, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-agri-green-50 via-white to-agri-gold-50 pt-24 pb-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-agri-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-agri-gold-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-agri-ochre-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-agri-green-100 text-agri-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Plateforme N°1 au Bénin</span>
            </div>

            <h1 className="font-poppins text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connectons les{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-green-600 to-agri-green-800">
                Agriculteurs
              </span>{' '}
              aux{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-ochre-500 to-agri-ochre-700">
                Marchés
              </span>
            </h1>

            <p className="font-inter text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              De la ferme à la table. Agri-Lien facilite la vente de produits locaux frais 
              entre agriculteurs et acheteurs urbains à travers tout le Bénin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-agri-green-500 hover:bg-agri-green-600 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-agri-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-agri-green-500 text-agri-green-700 hover:bg-agri-green-50 px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  Explorer le marché
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-agri-green-600">500+</div>
                  <TrendingUp className="w-5 h-5 text-agri-green-500" />
                </div>
                <div className="text-sm text-gray-600 font-medium">Agriculteurs actifs</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-agri-ochre-500">1.2K+</div>
                  <TrendingUp className="w-5 h-5 text-agri-ochre-500" />
                </div>
                <div className="text-sm text-gray-600 font-medium">Produits frais</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-agri-gold-600">12</div>
                  <MapPin className="w-5 h-5 text-agri-gold-600" />
                </div>
                <div className="text-sm text-gray-600 font-medium">Départements</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-agri-green-100 to-agri-gold-100 flex items-center justify-center text-8xl">
                  🌾🥕🍅
                </div>
                
                <div className="absolute -top-4 -right-4 bg-agri-gold-400 text-gray-900 px-6 py-3 rounded-full shadow-lg font-bold text-sm animate-bounce-slow">
                  ⭐ Qualité Premium
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-agri-green-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm">
                  🚚 Livraison 24h
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-agri-ochre-300 rounded-full opacity-50 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
