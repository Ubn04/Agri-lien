'use client';

import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', revenus: 2400, transactions: 340 },
  { month: 'Fév', revenus: 3200, transactions: 450 },
  { month: 'Mar', revenus: 2800, transactions: 380 },
  { month: 'Avr', revenus: 4100, transactions: 520 },
  { month: 'Mai', revenus: 3800, transactions: 490 },
  { month: 'Juin', revenus: 4500, transactions: 610 },
  { month: 'Juil', revenus: 5200, transactions: 720 },
];

const userGrowthData = [
  { week: 'S1', agriculteurs: 120, acheteurs: 180, logistique: 45 },
  { week: 'S2', agriculteurs: 145, acheteurs: 220, logistique: 52 },
  { week: 'S3', agriculteurs: 170, acheteurs: 250, logistique: 58 },
  { week: 'S4', agriculteurs: 190, acheteurs: 290, logistique: 65 },
];

const productCategoriesData = [
  { category: 'Légumes', ventes: 4200 },
  { category: 'Fruits', ventes: 3800 },
  { category: 'Céréales', ventes: 5100 },
  { category: 'Tubercules', ventes: 2900 },
  { category: 'Légumineuses', ventes: 3400 },
];

interface AnalyticsChartsProps {
  darkMode: boolean;
}

export default function AnalyticsCharts({ darkMode }: AnalyticsChartsProps) {
  const chartColors = {
    primary: '#2E8B57',
    secondary: '#D2691E',
    tertiary: '#FFD700',
    text: darkMode ? '#9CA3AF' : '#6B7280',
    grid: darkMode ? '#374151' : '#E5E7EB'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <div className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        rounded-xl p-6 border shadow-sm
      `}>
        <h3 className={`font-semibold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Revenus & Transactions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="month" stroke={chartColors.text} />
            <YAxis stroke={chartColors.text} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenus" 
              stroke={chartColors.primary} 
              fillOpacity={1} 
              fill="url(#colorRevenus)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth Chart */}
      <div className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        rounded-xl p-6 border shadow-sm
      `}>
        <h3 className={`font-semibold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Croissance Utilisateurs
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="week" stroke={chartColors.text} />
            <YAxis stroke={chartColors.text} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="agriculteurs" stroke={chartColors.primary} strokeWidth={2} />
            <Line type="monotone" dataKey="acheteurs" stroke={chartColors.secondary} strokeWidth={2} />
            <Line type="monotone" dataKey="logistique" stroke={chartColors.tertiary} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Categories Chart */}
      <div className={`
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        rounded-xl p-6 border shadow-sm lg:col-span-2
      `}>
        <h3 className={`font-semibold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Ventes par Catégorie
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productCategoriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="category" stroke={chartColors.text} />
            <YAxis stroke={chartColors.text} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="ventes" fill={chartColors.primary} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
