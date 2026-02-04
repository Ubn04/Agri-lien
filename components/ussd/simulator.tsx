'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function USSDSimulator() {
  const [screen, setScreen] = useState('main')
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const screens: Record<string, any> = {
    main: {
      title: 'Agri-Lien USSD',
      content: [
        '1. Voir produits',
        '2. Mes commandes',
        '3. Mon compte',
        '4. Aide',
        '0. Quitter',
      ],
      prompt: 'Choisissez une option:',
    },
    products: {
      title: 'Produits Disponibles',
      content: [
        '1. Légumes',
        '2. Fruits',
        '3. Céréales',
        '4. Tubercules',
        '0. Retour',
      ],
      prompt: 'Choisissez une catégorie:',
    },
    vegetables: {
      title: 'Légumes',
      content: [
        '1. Tomates - 800 FCFA/kg',
        '2. Piment - 1500 FCFA/kg',
        '3. Oignon - 600 FCFA/kg',
        '0. Retour',
      ],
      prompt: 'Choisissez un produit:',
    },
    orders: {
      title: 'Mes Commandes',
      content: [
        '1. Commande en cours (2)',
        '2. Historique',
        '0. Retour',
      ],
      prompt: 'Choisissez une option:',
    },
    account: {
      title: 'Mon Compte',
      content: [
        'Nom: Jean Kouassi',
        'Tél: +229 XX XX XX XX',
        'Solde: 45,000 FCFA',
        '',
        '0. Retour',
      ],
      prompt: '',
    },
  }

  const navigate = (option: string) => {
    const routes: Record<string, Record<string, string>> = {
      main: {
        '1': 'products',
        '2': 'orders',
        '3': 'account',
        '0': 'exit',
      },
      products: {
        '1': 'vegetables',
        '0': 'main',
      },
      vegetables: {
        '0': 'products',
      },
      orders: {
        '0': 'main',
      },
      account: {
        '0': 'main',
      },
    }

    const nextScreen = routes[screen]?.[option]
    if (nextScreen) {
      setHistory([...history, screen])
      setScreen(nextScreen)
      setInput('')
    }
  }

  const handleKeyPress = (key: string) => {
    if (key === 'send') {
      navigate(input)
    } else if (key === 'clear') {
      setInput('')
    } else if (key === 'back') {
      if (history.length > 0) {
        const prev = history[history.length - 1]
        setHistory(history.slice(0, -1))
        setScreen(prev)
        setInput('')
      }
    } else {
      setInput(input + key)
    }
  }

  const currentScreen = screens[screen]

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Simulateur USSD</CardTitle>
          <div className="text-center text-sm text-gray-600">
            Composez: *123*456#
          </div>
        </CardHeader>
        <CardContent>
          {/* Phone Screen */}
          <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4 mb-4 min-h-[300px]">
            <div className="font-mono text-sm">
              <div className="font-bold mb-2 text-center">
                {currentScreen.title}
              </div>
              <div className="border-t border-green-600 pt-2 mb-3">
                {currentScreen.content.map((line: string, index: number) => (
                  <div key={index} className="py-0.5">
                    {line}
                  </div>
                ))}
              </div>
              {currentScreen.prompt && (
                <div className="border-t border-green-600 pt-2 mt-3">
                  <div className="mb-2">{currentScreen.prompt}</div>
                  <div className="bg-white px-2 py-1 rounded border border-gray-300">
                    {input}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="bg-gray-200 hover:bg-gray-300 p-4 rounded-lg font-bold text-xl"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              onClick={() => handleKeyPress('back')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-semibold"
            >
              Retour
            </button>
            <button
              onClick={() => handleKeyPress('send')}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
            >
              Envoyer
            </button>
            <button
              onClick={() => handleKeyPress('clear')}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold"
            >
              Effacer
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
