'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Smartphone, Hash } from 'lucide-react'

export function UssdWidget() {
  return (
    <Card className="border-2 border-agri-green-200 bg-gradient-to-br from-agri-green-50 to-white">
      <CardHeader className="border-b border-agri-green-100">
        <CardTitle className="text-xl font-poppins flex items-center gap-2 text-agri-green-700">
          <Smartphone className="w-5 h-5" />
          Accès USSD
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          {/* Téléphone visuel */}
          <div className="inline-block bg-gray-900 rounded-3xl p-4 shadow-xl mb-6">
            <div className="bg-green-900 text-green-300 font-mono text-sm p-4 rounded-lg w-48 h-64 flex flex-col">
              <div className="text-xs mb-4">MENU AGRI-LIEN</div>
              <div className="flex-1 space-y-2 text-xs">
                <div>1. Mes produits</div>
                <div>2. Nouvelles commandes</div>
                <div>3. Mes revenus</div>
                <div>4. Ajouter produit</div>
                <div>5. Support</div>
                <div className="pt-4 border-t border-green-700">
                  0. Retour
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <div className="bg-agri-green-100 text-agri-green-800 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Hash className="w-5 h-5" />
                <span className="text-2xl font-bold">*123#</span>
              </div>
              <p className="text-sm">
                Composez ce code sur votre téléphone
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-bold text-agri-green-600 mb-1">✓ Sans internet</div>
                <div className="text-xs text-gray-600">Fonctionne partout</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-bold text-agri-green-600 mb-1">✓ Gratuit</div>
                <div className="text-xs text-gray-600">Aucun frais</div>
              </div>
            </div>

            <button className="w-full bg-agri-green-600 hover:bg-agri-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Guide d'utilisation USSD
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
