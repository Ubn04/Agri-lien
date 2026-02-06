'use client';

import { Users, DollarSign, ShoppingBag, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: any;
  darkMode: boolean;
}

function MetricCard({ title, value, change, icon: Icon, darkMode }: MetricCardProps) {
  const isPositive = change > 0;

  return (
    <div className={`
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      rounded-xl p-6 border shadow-sm hover-lift animate-scale-in
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <Icon className="h-6 w-6 text-agri-green-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{title}</p>
        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
    </div>
  );
}

interface PlatformMetricsProps {
  darkMode: boolean;
}

export default function PlatformMetrics({ darkMode }: PlatformMetricsProps) {
  const metrics = [
    {
      title: 'Total Utilisateurs',
      value: '12,543',
      change: 12.5,
      icon: Users
    },
    {
      title: 'Revenus (XOF)',
      value: '45.2M',
      change: 8.3,
      icon: DollarSign
    },
    {
      title: 'Transactions',
      value: '8,234',
      change: 15.7,
      icon: ShoppingBag
    },
    {
      title: 'Taux de Conversion',
      value: '3.8%',
      change: -2.1,
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} darkMode={darkMode} />
      ))}
    </div>
  );
}
