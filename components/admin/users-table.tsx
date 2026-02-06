'use client';

import { useState } from 'react';
import { Edit2, Trash2, MoreVertical, Search, Filter, Download } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Agriculteur' | 'Acheteur' | 'Logistique' | 'Admin';
  status: 'Actif' | 'Inactif' | 'Suspendu';
  transactions: number;
  joinedDate: string;
}

const usersData: User[] = [
  { id: '1', name: 'Jean Kouadio', email: 'jean.k@example.com', role: 'Agriculteur', status: 'Actif', transactions: 125, joinedDate: '2024-01-15' },
  { id: '2', name: 'Marie Assogba', email: 'marie.a@example.com', role: 'Acheteur', status: 'Actif', transactions: 89, joinedDate: '2024-02-20' },
  { id: '3', name: 'Paul Dossa', email: 'paul.d@example.com', role: 'Logistique', status: 'Actif', transactions: 234, joinedDate: '2023-11-10' },
  { id: '4', name: 'Sophie Gbedji', email: 'sophie.g@example.com', role: 'Agriculteur', status: 'Inactif', transactions: 45, joinedDate: '2024-03-05' },
  { id: '5', name: 'David Agbo', email: 'david.a@example.com', role: 'Acheteur', status: 'Actif', transactions: 156, joinedDate: '2023-12-22' },
  { id: '6', name: 'Emma Zinsou', email: 'emma.z@example.com', role: 'Agriculteur', status: 'Suspendu', transactions: 12, joinedDate: '2024-04-01' },
];

interface UsersTableProps {
  darkMode: boolean;
}

export default function UsersTable({ darkMode }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Inactif': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'Suspendu': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Agriculteur': return 'bg-agri-green-100 text-agri-green-700 dark:bg-agri-green-900/30 dark:text-agri-green-400';
      case 'Acheteur': return 'bg-agri-ochre-100 text-agri-ochre-700 dark:bg-agri-ochre-900/30 dark:text-agri-ochre-400';
      case 'Logistique': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    }
  };

  return (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      rounded-xl border shadow-sm
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestion des Utilisateurs
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredUsers.length} utilisateurs trouvés
            </p>
          </div>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 pr-4 py-2 rounded-lg border
                  ${darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:ring-2 focus:ring-agri-green-500 focus:border-transparent
                `}
              />
            </div>

            {/* Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`
                px-4 py-2 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                focus:ring-2 focus:ring-agri-green-500 focus:border-transparent
              `}
            >
              <option value="all">Tous les rôles</option>
              <option value="Agriculteur">Agriculteur</option>
              <option value="Acheteur">Acheteur</option>
              <option value="Logistique">Logistique</option>
              <option value="Admin">Admin</option>
            </select>

            {/* Export */}
            <button className={`
              px-4 py-2 rounded-lg border flex items-center gap-2
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
              }
              transition-colors
            `}>
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Utilisateur
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Rôle
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Statut
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Transactions
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Date d'inscription
              </th>
              <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-agri-green-600 to-agri-ochre-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {user.transactions}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(user.joinedDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-agri-green-100 dark:hover:bg-agri-green-900/30 text-agri-green-600 dark:text-agri-green-400 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                      <MoreVertical className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
