import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Users, ShoppingBag, Truck, CheckCircle, Leaf } from 'lucide-react'

export default function RegisterPage() {
  const roles = [
    {
      icon: Users,
      title: 'Fermier',
      description: 'Vendez vos produits directement aux acheteurs',
      href: '/register/farmer',
      color: 'bg-agri-green-100 text-agri-green-600',
      gradient: 'from-agri-green-400 to-agri-green-600',
      borderColor: 'border-agri-green-200 hover:border-agri-green-400',
      shadowColor: 'hover:shadow-agri-green-200',
      benefits: ['Vendre sans intermédiaire', 'Gérer vos stocks', 'Suivi des commandes'],
    },
    {
      icon: ShoppingBag,
      title: 'Acheteur',
      description: 'Achetez des produits frais locaux',
      href: '/register/buyer',
      color: 'bg-blue-100 text-blue-600',
      gradient: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-200 hover:border-blue-400',
      shadowColor: 'hover:shadow-blue-200',
      benefits: ['Produits frais', 'Prix directs fermiers', 'Livraison rapide'],
    },
    {
      icon: Truck,
      title: 'Logistique',
      description: 'Offrez des services de livraison',
      href: '/register/logistics',
      color: 'bg-agri-ochre-100 text-agri-ochre-600',
      gradient: 'from-agri-ochre-400 to-agri-ochre-600',
      borderColor: 'border-agri-ochre-200 hover:border-agri-ochre-400',
      shadowColor: 'hover:shadow-agri-ochre-200',
      benefits: ['Revenus supplémentaires', 'Routes optimisées', 'Paiements sécurisés'],
    },
  ]

  return (
    <div className="min-h-screen bg-white page-transition">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 font-poppins">
            Rejoignez Agri-Lien
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez votre type de compte et commencez à révolutionner l'agriculture au Bénin
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {roles.map((role, index) => (
            <Link key={index} href={role.href}>
              <Card 
                className={`bg-white hover-lift press-feedback cursor-pointer h-full border-[3px] ${role.borderColor} ${role.shadowColor} shadow-lg hover:shadow-2xl transition-all group animate-scale-in rounded-2xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 bg-white">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`h-20 w-20 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                      <role.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-center mb-3 text-gray-900 font-poppins group-hover:text-agri-green-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {role.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {role.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-agri-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`text-center py-2 px-4 rounded-lg ${role.color} font-medium group-hover:shadow-md transition-shadow`}>
                    S'inscrire comme {role.title}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Banner */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Pourquoi choisir Agri-Lien?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-14 w-14 bg-agri-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">100% Local</h3>
                <p className="text-sm text-gray-600">Produits béninois de qualité</p>
              </div>
              <div className="text-center">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accessible</h3>
                <p className="text-sm text-gray-600">USSD sans connexion Internet</p>
              </div>
              <div className="text-center">
                <div className="h-14 w-14 bg-agri-ochre-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
                <p className="text-sm text-gray-600">Paiements Mobile Money</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte?{' '}
            <Link 
              href="/login" 
              className="font-semibold text-agri-green-600 hover:text-agri-green-700 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
