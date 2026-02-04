export default function USSDPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Service USSD Agri-Lien</h1>
          <p className="text-xl text-gray-600">
            Accédez à nos services même sans internet
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Comment utiliser ?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Composez le code</h3>
                  <p className="text-gray-600">Tapez *123*456# sur votre téléphone</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Suivez le menu</h3>
                  <p className="text-gray-600">Naviguez avec les chiffres proposés</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 text-primary-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Commandez facilement</h3>
                  <p className="text-gray-600">
                    Consultez produits et passez commande sans internet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Essayez le simulateur
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Testez notre service USSD directement depuis votre navigateur
          </p>
        </div>

        <USSDSimulator />
      </div>
    </div>
  )
}

import { USSDSimulator } from '@/components/ussd/simulator'
