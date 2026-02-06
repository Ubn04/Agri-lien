import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Leaf, Target, Users, Globe, TrendingUp, Shield, 
  Heart, Smartphone, Award, CheckCircle, ArrowRight 
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Durabilité',
      description: 'Nous promouvons des pratiques agricoles durables et respectueuses de l\'environnement',
      color: 'bg-agri-green-100 text-agri-green-600',
    },
    {
      icon: Shield,
      title: 'Transparence',
      description: 'Des transactions claires et équitables pour tous les acteurs de la chaîne',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous créons un réseau fort entre fermiers, acheteurs et livreurs',
      color: 'bg-agri-ochre-100 text-agri-ochre-600',
    },
    {
      icon: Heart,
      title: 'Impact Social',
      description: 'Améliorer les conditions de vie des agriculteurs béninois',
      color: 'bg-red-100 text-red-600',
    },
  ]

  const stats = [
    { value: '1,000+', label: 'Fermiers Actifs' },
    { value: '5,000+', label: 'Acheteurs Satisfaits' },
    { value: '200+', label: 'Livreurs Partenaires' },
    { value: '50,000+', label: 'Commandes Traitées' },
  ]

  const features = [
    {
      icon: Smartphone,
      title: 'Technologie Accessible',
      description: 'Une plateforme web moderne combinée à un système USSD pour l\'accessibilité sans Internet',
    },
    {
      icon: Globe,
      title: 'Couverture Nationale',
      description: 'Présent dans toutes les régions du Bénin pour connecter les zones rurales aux centres urbains',
    },
    {
      icon: Award,
      title: 'Qualité Garantie',
      description: 'Produits frais, locaux et vérifiés pour une traçabilité complète',
    },
    {
      icon: TrendingUp,
      title: 'Croissance Continue',
      description: 'Innovation constante pour améliorer l\'expérience de tous nos utilisateurs',
    },
  ]

  const team = [
    {
      name: 'Urbain BODJRENOU',
      role: 'Fondateur & CEO',
      emoji: '👨‍💼',
      bio: 'Passionné par l\'agriculture et la technologie',
    },
    {
      name: 'Équipe Tech',
      role: 'Développement',
      emoji: '💻',
      bio: 'Experts en solutions digitales innovantes',
    },
    {
      name: 'Équipe Support',
      role: 'Service Client',
      emoji: '🤝',
      bio: 'Dédiés à votre satisfaction 24/7',
    },
    {
      name: 'Équipe Terrain',
      role: 'Relations Fermiers',
      emoji: '🌾',
      bio: 'En contact direct avec nos agriculteurs',
    },
  ]

  return (
    <div className="min-h-screen bg-white page-transition">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-agri-green-600 via-agri-green-700 to-agri-green-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-agri-gold-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Leaf className="h-10 w-10 text-agri-green-900" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins">
              À Propos d'Agri-Lien
            </h1>
            <p className="text-xl lg:text-2xl text-agri-green-100 mb-8 leading-relaxed">
              Nous révolutionnons l'agriculture au Bénin en connectant directement 
              les fermiers aux consommateurs grâce à la technologie
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-agri-gold-500 hover:bg-agri-gold-600 text-gray-900 font-semibold px-8 py-6 text-lg press-feedback">
                  Rejoignez-nous
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg press-feedback">
                  Découvrir le Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-agri-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-agri-green-100 text-agri-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                  <Target className="h-4 w-4" />
                  Notre Mission
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 font-poppins">
                  Transformer l'Agriculture au Bénin
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Agri-Lien est né d'une vision simple mais puissante : permettre aux agriculteurs 
                  béninois de vendre leurs produits directement aux consommateurs, sans intermédiaires 
                  qui réduisent leurs marges.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  En combinant une plateforme web moderne avec un système USSD accessible même 
                  sans connexion Internet, nous rendons le commerce agricole simple, transparent 
                  et équitable pour tous.
                </p>
                <div className="space-y-3">
                  {[
                    'Éliminer les intermédiaires coûteux',
                    'Garantir des prix justes pour les fermiers',
                    'Offrir des produits frais aux consommateurs',
                    'Créer des emplois dans la logistique',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-agri-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative animate-scale-in">
                <div className="bg-gradient-to-br from-agri-green-100 to-agri-green-200 rounded-3xl p-8 lg:p-12">
                  <div className="text-6xl mb-6">🌾</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    L'Agriculture Digitale pour Tous
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous croyons que chaque agriculteur mérite d'avoir accès aux outils 
                    numériques modernes pour développer son activité et améliorer ses revenus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="hover-lift press-feedback border-2 hover:border-agri-green-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`h-14 w-14 ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Comment Nous Faisons la Différence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions innovantes pour un impact réel
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-agri-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des passionnés dédiés à votre réussite
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="hover-lift press-feedback animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-agri-green-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-agri-green-600 to-agri-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 font-poppins">
              Prêt à Transformer l'Agriculture avec Nous?
            </h2>
            <p className="text-xl text-agri-green-100 mb-8">
              Rejoignez des milliers d'agriculteurs, acheteurs et livreurs qui font déjà confiance à Agri-Lien
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-agri-gold-500 hover:bg-agri-gold-600 text-gray-900 font-semibold px-8 py-6 text-lg press-feedback">
                  Créer un compte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg press-feedback">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
