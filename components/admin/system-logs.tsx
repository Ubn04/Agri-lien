'use client';

import { AlertCircle, CheckCircle, Info, XCircle, Clock } from 'lucide-react';

interface Log {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  user?: string;
  action: string;
}

const logsData: Log[] = [
  { id: '1', type: 'success', message: 'Nouveau produit ajouté avec succès', timestamp: '2024-02-06 14:23:12', user: 'Jean Kouadio', action: 'CREATE_PRODUCT' },
  { id: '2', type: 'info', message: 'Connexion utilisateur depuis Cotonou', timestamp: '2024-02-06 14:20:45', user: 'Marie Assogba', action: 'USER_LOGIN' },
  { id: '3', type: 'error', message: 'Échec de la transaction de paiement', timestamp: '2024-02-06 14:18:33', user: 'Paul Dossa', action: 'PAYMENT_FAILED' },
  { id: '4', type: 'warning', message: 'Stock faible pour: Tomates', timestamp: '2024-02-06 14:15:22', action: 'LOW_STOCK' },
  { id: '5', type: 'success', message: 'Commande #1234 livrée', timestamp: '2024-02-06 14:12:10', user: 'Sophie Gbedji', action: 'ORDER_DELIVERED' },
  { id: '6', type: 'info', message: 'Mise à jour du système effectuée', timestamp: '2024-02-06 14:08:45', action: 'SYSTEM_UPDATE' },
  { id: '7', type: 'error', message: 'Tentative de connexion échouée', timestamp: '2024-02-06 14:05:33', user: 'Inconnu', action: 'LOGIN_FAILED' },
  { id: '8', type: 'success', message: 'Nouvel utilisateur enregistré', timestamp: '2024-02-06 14:02:18', user: 'David Agbo', action: 'USER_REGISTER' },
];

interface SystemLogsProps {
  darkMode: boolean;
}

export default function SystemLogs({ darkMode }: SystemLogsProps) {
  const getLogIcon = (type: Log['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getLogBgColor = (type: Log['type']) => {
    switch (type) {
      case 'success': return darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200';
      case 'error': return darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200';
      case 'warning': return darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200';
      case 'info': return darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      rounded-xl border shadow-sm
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Logs Système
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Dernières activités en temps réel
            </p>
          </div>
          <button className={`
            px-4 py-2 rounded-lg text-sm font-medium
            ${darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }
            transition-colors
          `}>
            Filtrer
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
        {logsData.map((log) => (
          <div
            key={log.id}
            className={`
              ${getLogBgColor(log.type)}
              rounded-lg p-4 border
            `}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getLogIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {log.message}
                  </p>
                  <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap`}>
                    {log.timestamp}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {log.user && (
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      👤 {log.user}
                    </span>
                  )}
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
                  }`}>
                    {log.action}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between text-sm">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Affichage de {logsData.length} logs récents
          </span>
          <button className="text-agri-green-600 hover:text-agri-green-700 font-medium">
            Voir tout l'historique →
          </button>
        </div>
      </div>
    </div>
  );
}
