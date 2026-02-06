import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, Users, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-agri-green-600 via-agri-green-700 to-agri-green-800 relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-9xl">🌾</div>
        <div className="absolute bottom-20 right-20 text-9xl">🥕</div>
        <div className="absolute top-1/2 left-1/2 text-9xl transform -translate-x-1/2 -translate-y-1/2">🍅</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-agri-gold-400 text-gray-900 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>100% Gratuit pour commencer</span>
          </div>

          <h2 className="font-poppins text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Prêt à révolutionner votre agriculture ?
          </h2>

          <p className="font-inter text-xl text-agri-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rejoignez dès maintenant la plus grande communauté d'agriculteurs 
            et d'acheteurs connectés au Bénin. Inscription gratuite et sans engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register/farmer">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-white text-agri-green-700 hover:bg-agri-gold-400 hover:text-gray-900 px-10 py-7 text-lg font-bold shadow-2xl press-feedback"
              >
                Je suis agriculteur
                <Users className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-3 border-white text-white hover:bg-white hover:text-agri-green-700 px-10 py-7 text-lg font-bold press-feedback"
              >
                Je suis acheteur
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-8 h-8 bg-agri-gold-400 rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-medium">Inscription gratuite</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-8 h-8 bg-agri-gold-400 rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-medium">Accessible via USSD</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-8 h-8 bg-agri-gold-400 rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-medium">Support 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 35C1200 30 1320 30 1380 30L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
