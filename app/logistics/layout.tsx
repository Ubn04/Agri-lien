'use client';

import LogisticsSidebar from '@/components/logistics/logistics-sidebar';
import LogisticsHeader from '@/components/logistics/logistics-header';

export default function LogisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900">
      <LogisticsSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <LogisticsHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
