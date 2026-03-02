'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, MapPin, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      {/* Image de fond avec overlay léger */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=1920&q=80" 
          alt="Agriculteur africain au travail dans un champ"
          className="w-full h-full object-cover brightness-75"
          loading="eager"
          fetchPriority="high"
        />
        {/* Overlay gradient léger pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-agri-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Plateforme N°1 au Bénin</span>
            </div>

            <h1 className="font-poppins text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Connectons les{' '}
              <span className="text-agri-green-400">
                Agriculteurs
              </span>{' '}
              aux{' '}
              <span className="text-agri-gold-400">
                Marchés
              </span>
            </h1>

            <p className="font-inter text-xl text-white/90 mb-10 leading-relaxed max-w-xl drop-shadow-lg">
              De la ferme à la table. Agri-Lien facilite la vente de produits locaux frais 
              entre agriculteurs et acheteurs urbains à travers tout le Bénin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-agri-green-500 hover:bg-agri-green-600 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-agri-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-agri-green-700 px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-xl"
                >
                  Explorer le marché
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-white drop-shadow-lg">500+</div>
                  <TrendingUp className="w-5 h-5 text-agri-green-400" />
                </div>
                <div className="text-sm text-white/80 font-medium">Agriculteurs actifs</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-white drop-shadow-lg">1.2K+</div>
                  <TrendingUp className="w-5 h-5 text-agri-gold-400" />
                </div>
                <div className="text-sm text-white/80 font-medium">Produits frais</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="text-4xl font-bold text-white drop-shadow-lg">12</div>
                  <MapPin className="w-5 h-5 text-agri-gold-400" />
                </div>
                <div className="text-sm text-white/80 font-medium">Départements</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up hidden lg:block">
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80" 
                    alt="Produits agricoles frais"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="absolute -top-4 -right-4 bg-agri-gold-400 text-gray-900 px-6 py-3 rounded-full shadow-xl font-bold text-sm animate-bounce-slow">
                  ⭐ Qualité Premium
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-agri-green-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm">
                  🚚 Livraison 24h
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-agri-gold-400/30 rounded-full blur-2xl -z-10"></div>
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
