import { TrendingUp, Users, MapPin, Clock } from 'lucide-react'

export function StatsSection() {
  const stats = [
    { 
      icon: TrendingUp,
      value: '15M+', 
      label: 'FCFA de transactions', 
      color: 'text-agri-green-600',
      bgColor: 'bg-agri-green-50',
    },
    { 
      icon: Users,
      value: '98%', 
      label: 'Satisfaction client', 
      color: 'text-agri-ochre-600',
      bgColor: 'bg-agri-ochre-50',
    },
    { 
      icon: MapPin,
      value: '12', 
      label: 'Départements couverts', 
      color: 'text-agri-gold-600',
      bgColor: 'bg-agri-gold-50',
    },
    { 
      icon: Clock,
      value: '24/7', 
      label: 'Support disponible', 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-agri-green-600 via-agri-green-700 to-agri-green-800 text-white relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-7xl">🌾</div>
        <div className="absolute top-20 right-20 text-7xl">🥕</div>
        <div className="absolute bottom-10 left-1/4 text-7xl">🍅</div>
        <div className="absolute bottom-20 right-1/4 text-7xl">🌽</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl font-bold mb-4">
            Agri-Lien en chiffres
          </h2>
          <p className="font-inter text-agri-green-100 text-lg">
            Des résultats concrets pour toute la communauté
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              {/* Icône */}
              <div className="inline-flex h-16 w-16 bg-white/20 rounded-2xl items-center justify-center mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>

              {/* Valeur */}
              <div className="text-5xl lg:text-6xl font-bold mb-3 font-poppins">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-agri-green-100 font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
