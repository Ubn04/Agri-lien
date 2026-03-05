'use client';

import { useState } from 'react';
import { Phone, Hash, X, Send, Clock, Power, Signal, Battery, ChevronLeft } from 'lucide-react';

interface UssdSession {
  id: string;
  timestamp: Date;
  code: string;
  responses: { input: string; output: string }[];
}

const USSD_MENUS = {
  '*123#': {
    title: 'Agri-Lien - Menu Principal',
    options: [
      '1. Consulter mes produits',
      '2. Vendre un produit',
      '3. Voir commandes',
      '4. Mon portefeuille',
      '5. Prix du marché',
      '6. Météo agricole',
      '0. Quitter'
    ]
  },
  '1': {
    title: 'Mes Produits',
    content: 'Tomates: 500kg\nMaïs: 1200kg\nRiz: 300kg\n\n0. Retour\n00. Menu'
  },
  '2': {
    title: 'Vendre un Produit',
    options: [
      '1. Tomates',
      '2. Maïs',
      '3. Riz',
      '4. Manioc',
      '5. Arachides',
      '0. Retour'
    ]
  },
  '3': {
    title: 'Mes Commandes',
    content: 'Commande #1234\n50kg Tomates\nStatut: En cours\nMontant: 25,000 XOF\n\n0. Retour'
  },
  '4': {
    title: 'Mon Portefeuille',
    content: 'Solde: 125,500 XOF\nDernière vente: 25,000 XOF\nCommissions: -2,500 XOF\n\n0. Retour'
  },
  '5': {
    title: 'Prix du Marché',
    content: 'Tomates: 500 XOF/kg\nMaïs: 200 XOF/kg\nRiz: 450 XOF/kg\nManioc: 150 XOF/kg\n\n0. Retour'
  },
  '6': {
    title: 'Météo Agricole',
    content: 'Cotonou: 28°C Ensoleillé\nPluie prévue: Demain\nHumidité: 75%\nConseil: Arrosage léger\n\n0. Retour'
  }
};

export default function UssdPhoneSimulator() {
  const [input, setInput] = useState('');
  const [screen, setScreen] = useState('');
  const [menuPath, setMenuPath] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState<UssdSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleKeyPress = (key: string | number) => {
    setInput(prev => prev + key);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (input === '*123#') {
      // Démarrer une nouvelle session
      setIsActive(true);
      const menu = USSD_MENUS['*123#'];
      setScreen(`${menu.title}\n\n${menu.options.join('\n')}`);
      setMenuPath([]);
      setInput('');
      return;
    }

    if (isActive) {
      // Navigation dans les menus
      if (input === '0') {
        // Retour
        if (menuPath.length === 0) {
          handleEndSession();
        } else {
          const newPath = [...menuPath];
          newPath.pop();
          setMenuPath(newPath);
          const menu = USSD_MENUS['*123#'];
          setScreen(`${menu.title}\n\n${menu.options.join('\n')}`);
        }
      } else if (input === '00') {
        // Retour au menu principal
        const menu = USSD_MENUS['*123#'];
        setScreen(`${menu.title}\n\n${menu.options.join('\n')}`);
        setMenuPath([]);
      } else {
        // Sélection d'option
        const menuKey = input as keyof typeof USSD_MENUS;
        if (USSD_MENUS[menuKey]) {
          const selectedMenu = USSD_MENUS[menuKey];
          setMenuPath([...menuPath, input]);
          
          if ('options' in selectedMenu) {
            setScreen(`${selectedMenu.title}\n\n${selectedMenu.options.join('\n')}`);
          } else {
            setScreen(`${selectedMenu.title}\n\n${selectedMenu.content}`);
          }
        } else {
          setScreen(`Option invalide.\nVeuillez réessayer.\n\n0. Retour\n00. Menu`);
        }
      }
      setInput('');
    }
  };

  const handleEndSession = () => {
    const session: UssdSession = {
      id: Date.now().toString(),
      timestamp: new Date(),
      code: '*123#',
      responses: [{ input: menuPath.join(' > '), output: screen }]
    };
    setSessions(prev => [session, ...prev].slice(0, 10));
    setIsActive(false);
    setScreen('Session terminée.\nMerci d\'utiliser Agri-Lien.');
    setTimeout(() => {
      setScreen('');
      setMenuPath([]);
    }, 2000);
  };

  const startQuickSession = () => {
    setInput('*123#');
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Téléphone Simulateur */}
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border-4 border-gray-700 w-full max-w-sm">
            {/* Haut du téléphone */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-1">
                <Signal className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">Agri-Net</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">14:23</span>
                <Battery className="h-3 w-3 text-green-400" />
              </div>
            </div>

            {/* Écran */}
            <div className="bg-gradient-to-b from-green-900 to-black rounded-lg p-4 mb-6 min-h-[280px] shadow-inner border-2 border-green-800">
              <div className="font-mono text-sm text-green-400 leading-relaxed whitespace-pre-wrap">
                {screen || (
                  <div className="text-center text-green-600 mt-12">
                    <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <div>Composez *123# pour</div>
                    <div>accéder à Agri-Lien</div>
                  </div>
                )}
              </div>
              
              {/* Zone de saisie */}
              {isActive && (
                <div className="mt-4 pt-4 border-t border-green-800">
                  <div className="text-green-500 text-xs mb-1">Votre choix:</div>
                  <div className="text-green-400 text-lg font-mono">{input || '_'}</div>
                </div>
              )}
            </div>

            {/* Clavier */}
            <div className="space-y-3">
              {/* Ligne de saisie */}
              <div className="bg-gray-700 rounded-lg p-3 font-mono text-white text-center min-h-[40px] flex items-center justify-center">
                {input || <span className="text-gray-500">Code USSD</span>}
              </div>

              {/* Clavier numérique */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleKeyPress('*')}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg text-xl"
                >
                  *
                </button>
                <button
                  onClick={() => handleKeyPress(0)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg"
                >
                  0
                </button>
                <button
                  onClick={() => handleKeyPress('#')}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all active:scale-95 shadow-lg text-xl"
                >
                  #
                </button>
              </div>

              {/* Boutons d'action */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleClear}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-all active:scale-95 shadow-lg flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSend}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all active:scale-95 shadow-lg flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </button>
                <button
                  onClick={handleEndSession}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-all active:scale-95 shadow-lg flex items-center justify-center"
                >
                  <Power className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions et Historique */}
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Hash className="h-5 w-5 text-agri-green-600" />
              Comment utiliser le simulateur USSD
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-agri-green-100 text-agri-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <div className="font-medium mb-1">Démarrer une session</div>
                  <div className="text-gray-600">Composez <code className="bg-gray-100 px-2 py-0.5 rounded">*123#</code> et appuyez sur <Send className="h-3 w-3 inline" /></div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-agri-green-100 text-agri-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <div className="font-medium mb-1">Naviguer dans les menus</div>
                  <div className="text-gray-600">Tapez le numéro de l'option souhaitée (1-6)</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-agri-green-100 text-agri-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <div className="font-medium mb-1">Actions rapides</div>
                  <div className="text-gray-600">
                    <code className="bg-gray-100 px-2 py-0.5 rounded mr-2">0</code> Retour
                    <code className="bg-gray-100 px-2 py-0.5 rounded mx-2">00</code> Menu principal
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-agri-green-100 text-agri-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <div className="font-medium mb-1">Terminer</div>
                  <div className="text-gray-600">Appuyez sur <Power className="h-3 w-3 inline" /> pour quitter</div>
                </div>
              </div>
            </div>

            <button
              onClick={startQuickSession}
              className="w-full mt-6 bg-agri-green-600 text-white py-3 rounded-lg hover:bg-agri-green-700 transition-colors font-medium"
            >
              Démarrer une session test
            </button>
          </div>

          {/* Historique des sessions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-agri-ochre-600" />
                Historique des sessions
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm text-agri-green-600 hover:text-agri-green-700"
              >
                {showHistory ? 'Masquer' : 'Afficher'}
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Clock className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <div>Aucune session enregistrée</div>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-xs font-mono text-agri-green-600 bg-white px-2 py-1 rounded">
                          {session.code}
                        </code>
                        <span className="text-xs text-gray-500">
                          {session.timestamp.toLocaleTimeString('fr-FR')}
                        </span>
                      </div>
                      {session.responses.map((resp, idx) => (
                        <div key={idx} className="text-xs text-gray-600">
                          <div className="font-medium">Navigation: {resp.input || 'Menu principal'}</div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="bg-gradient-to-br from-agri-green-50 to-agri-ochre-50 rounded-lg p-6 border border-agri-green-200">
            <h4 className="font-semibold text-agri-green-900 mb-3">💡 Astuce</h4>
            <p className="text-sm text-gray-700">
              Le service USSD Agri-Lien fonctionne sans connexion internet sur tous les téléphones. 
              Composez simplement <strong>*123#</strong> depuis votre mobile pour accéder à vos produits, 
              commandes et informations de marché en temps réel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
