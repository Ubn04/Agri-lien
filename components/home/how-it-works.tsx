export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Inscription',
      description: 'Créez votre compte en tant que fermier, acheteur ou prestataire logistique.',
    },
    {
      number: '2',
      title: 'Publication/Recherche',
      description: 'Les fermiers publient leurs produits, les acheteurs recherchent ce dont ils ont besoin.',
    },
    {
      number: '3',
      title: 'Commande',
      description: 'Passez commande facilement avec paiement Mobile Money sécurisé.',
    },
    {
      number: '4',
      title: 'Livraison',
      description: 'Suivez votre livraison en temps réel jusqu\'à réception.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600">
            Quatre étapes simples pour commencer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="h-16 w-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
