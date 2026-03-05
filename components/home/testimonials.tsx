import { Star, Quote, TrendingUp } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Koffi Mensah',
      role: 'Producteur d\'igname, Zou',
      location: 'Abomey',
      content: 'Depuis que j\'utilise Agri-Lien, mes ventes ont triplé ! Je vends maintenant directement aux restaurants de Cotonou sans intermédiaire. Le paiement via Flooz est très pratique.',
      avatar: '👨🏿‍🌾',
      rating: 5,
      revenue: '+300% de revenus',
    },
    {
      name: 'Aminata Diallo',
      role: 'Cheffe cuisinière',
      location: 'Cotonou',
      content: 'Produits frais livrés en 24h, qualité exceptionnelle et prix justes. J\'adore soutenir directement nos agriculteurs locaux. Mon restaurant n\'a jamais été aussi bien approvisionné !',
      avatar: '👩🏿‍🍳',
      rating: 5,
      revenue: 'Économie de 40%',
    },
    {
      name: 'Serge Ahoussou',
      role: 'Transporteur',
      location: 'Parakou',
      content: 'L\'application me permet d\'optimiser mes trajets de livraison. Je gagne du temps et de l\'argent. L\'interface est simple, même ma grand-mère pourrait l\'utiliser !',
      avatar: '🚛',
      rating: 5,
      revenue: '+50% efficacité',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-agri-green-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 bg-agri-gold-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-agri-green-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-agri-gold-100 text-agri-ochre-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Témoignages authentiques</span>
          </div>
          
          <h2 className="font-poppins text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ils ont transformé leur{' '}
            <span className="text-agri-green-600">agriculture</span>
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Agri-Lien change la vie de centaines d'agriculteurs 
            et d'acheteurs à travers le Bénin.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-agri-green-100" />

              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-poppins font-bold text-lg text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-agri-green-600 font-medium mt-1">
                    📍 {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-agri-gold-500 fill-current" />
                ))}
              </div>

              <p className="font-inter text-gray-700 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="inline-flex items-center gap-2 bg-agri-green-50 text-agri-green-700 px-4 py-2 rounded-full text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                {testimonial.revenue}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-3xl p-12 shadow-xl border-2 border-agri-green-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-agri-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Note moyenne</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-agri-ochre-500 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Avis positifs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-agri-gold-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support actif</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
