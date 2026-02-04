import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Prêt à rejoindre Agri-Lien ?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Que vous soyez fermier, acheteur ou prestataire logistique,
          commencez votre parcours avec nous aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register/farmer">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
              Je suis Fermier
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register/buyer">
            <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
              Je suis Acheteur
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
