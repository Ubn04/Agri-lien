import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connectons les Fermiers Béninois
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              La plateforme qui relie les producteurs agricoles aux acheteurs
              et facilite la distribution de produits locaux frais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explorer le marché
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Fermiers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-gray-600">Produits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">200+</div>
                <div className="text-sm text-gray-600">Acheteurs</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-primary-100 flex items-center justify-center text-6xl">
              🌾🥕🍅
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
