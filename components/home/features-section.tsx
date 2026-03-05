import Link from 'next/link'
import { ShoppingCart, Truck, Users, Smartphone, Shield, BarChart3, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FeaturesSection() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Marketplace Digital',
      description: 'Achetez directement auprès des agriculteurs avec des prix transparents et équitables.',
      color: 'bg-agri-green-100 text-agri-green-600',
      borderColor: 'border-agri-green-200',
    },
    {
      icon: Truck,
      title: 'Livraison Intégrée',
      description: 'Réseau de transporteurs fiables pour garantir la fraîcheur de vos produits agricoles.',
      color: 'bg-agri-ochre-100 text-agri-ochre-600',
      borderColor: 'border-agri-ochre-200',
    },
    {
      icon: Smartphone,
      title: 'Accès USSD Offline',
      description: 'Passez commande sans internet via *123# - Accessible sur tous les téléphones.',
      color: 'bg-agri-gold-100 text-agri-gold-700',
      borderColor: 'border-agri-gold-300',
    },
    {
      icon: Users,
      title: 'Communauté Active',
      description: 'Rejoignez plus de 500 agriculteurs et acheteurs à travers tout le Bénin.',
      color: 'bg-green-100 text-green-600',
      borderColor: 'border-green-200',
    },
    {
      icon: Shield,
      title: 'Paiements Sécurisés',
      description: 'Mobile Money (Flooz, MTN Money) et transactions sécurisées garanties.',
      color: 'bg-blue-100 text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Suivez vos ventes, revenus et performances en temps réel sur votre dashboard.',
      color: 'bg-purple-100 text-purple-600',
      borderColor: 'border-purple-200',
    },
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="font-poppins text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi choisir{' '}
            <span className="text-agri-green-600">Agri-Lien</span> ?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une solution complète et accessible pour digitaliser l'agriculture 
            et connecter tous les acteurs de la chaîne de valeur agricole.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white border-2 ${feature.borderColor} rounded-2xl p-8 hover-lift press-feedback animate-fade-in cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex h-16 w-16 ${feature.color} rounded-2xl items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <feature.icon className="h-8 w-8" />
              </div>

              <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="font-inter text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-6 h-6 text-agri-green-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/register">
            <Button 
              size="lg"
              className="bg-agri-green-500 hover:bg-agri-green-600 text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Rejoindre la communauté
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
