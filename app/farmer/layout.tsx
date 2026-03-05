import { FarmerSidebar } from '@/components/farmer/farmer-sidebar'
import { FarmerHeader } from '@/components/farmer/farmer-header'

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <FarmerSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <FarmerHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
