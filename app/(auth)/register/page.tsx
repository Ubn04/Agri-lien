import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Users, ShoppingBag, Truck } from 'lucide-react'

export default function RegisterPage() {
  const roles = [
    {
      icon: Users,
      title: 'Fermier',
      description: 'Vendez vos produits directement aux acheteurs',
      href: '/register/farmer',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: ShoppingBag,
      title: 'Acheteur',
      description: 'Achetez des produits frais locaux',
      href: '/register/buyer',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Truck,
      title: 'Logistique',
      description: 'Offrez des services de livraison',
      href: '/register/logistics',
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Rejoignez Agri-Lien</h1>
          <p className="text-gray-600">Choisissez votre type de compte</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Link key={index} href={role.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className={`h-16 w-16 ${role.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <role.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-600">Vous avez déjà un compte? </span>
          <Link href="/login" className="text-primary-600 hover:underline font-medium">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}
