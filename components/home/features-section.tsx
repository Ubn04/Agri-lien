import { ShoppingCart, Truck, Users, Smartphone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function FeaturesSection() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Marketplace Digital',
      description: 'Achetez directement auprès des fermiers locaux avec des prix transparents.',
    },
    {
      icon: Truck,
      title: 'Livraison Intégrée',
      description: 'Services logistiques fiables pour assurer la fraîcheur des produits.',
    },
    {
      icon: Users,
      title: 'Communauté Active',
      description: 'Rejoignez un réseau croissant de fermiers et acheteurs engagés.',
    },
    {
      icon: Smartphone,
      title: 'Accès USSD',
      description: 'Accessible même sans internet grâce à notre service USSD.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Agri-Lien ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une solution complète pour digitaliser l'agriculture béninoise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
