export function Testimonials() {
  const testimonials = [
    {
      name: 'Koffi Mensah',
      role: 'Fermier, Zou',
      content: 'Grâce à Agri-Lien, j\'ai pu augmenter mes ventes de 300%. Je vends maintenant directement aux restaurants de Cotonou.',
      avatar: '👨‍🌾',
    },
    {
      name: 'Aminata Diallo',
      role: 'Restaurant Le Palmier',
      content: 'Des produits frais, locaux et à prix justes. La livraison est toujours ponctuelle. Je recommande fortement!',
      avatar: '👩‍🍳',
    },
    {
      name: 'Serge Ahoussou',
      role: 'Logistique Express',
      content: 'L\'application facilite énormément la gestion de mes livraisons. Je peux optimiser mes trajets et gagner du temps.',
      avatar: '🚚',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600">
            Des témoignages authentiques de notre communauté
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
