export function StatsSection() {
  const stats = [
    { value: '5M+', label: 'FCFA de transactions', color: 'text-blue-600' },
    { value: '95%', label: 'Satisfaction client', color: 'text-green-600' },
    { value: '12', label: 'Régions couvertes', color: 'text-purple-600' },
    { value: '24/7', label: 'Support disponible', color: 'text-orange-600' },
  ]

  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
