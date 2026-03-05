import BuyerSidebar from '@/components/buyer/buyer-sidebar';
import BuyerHeader from '@/components/buyer/buyer-header';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <BuyerSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <BuyerHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
