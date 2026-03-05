'use client';

import UssdPhoneSimulator from '@/components/ussd/ussd-phone-simulator';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export default function UssdPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-agri-green-50/20 to-agri-ochre-50/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-agri-green-100 text-agri-green-700 rounded-full text-sm font-medium mb-4">
              📱 Service USSD
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simulateur USSD Agri-Lien
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Testez notre service USSD accessible sur tous les téléphones, même sans connexion internet. 
              Une solution simple et efficace pour gérer votre activité agricole.
            </p>
          </div>
          
          <UssdPhoneSimulator />

          {/* Bénéfices */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-lg mb-2">Accessible partout</h3>
              <p className="text-gray-600 text-sm">
                Fonctionne sur tous les téléphones, même les plus basiques. Pas besoin de smartphone.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">📶</div>
              <h3 className="font-semibold text-lg mb-2">Sans internet</h3>
              <p className="text-gray-600 text-sm">
                Aucune connexion internet requise. Utilisez le réseau GSM standard uniquement.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Instantané</h3>
              <p className="text-gray-600 text-sm">
                Réponses en temps réel. Consultez prix, commandes et portefeuille immédiatement.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
