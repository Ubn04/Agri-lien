import type { Metadata } from 'next'
// import { Inter } from 'next/font/google' // Temporairement désactivé pour éviter les erreurs réseau
import './globals.css'
import { Providers } from '@/components/providers/providers'

// Force dynamic rendering for all pages to prevent SSR issues with React Context
export const dynamic = 'force-dynamic'

// Configuration de police système comme fallback
const inter = { 
  className: 'font-sans' // Utilise les polices système définies dans Tailwind
}

export const metadata: Metadata = {
  title: 'Agri-Lien - Connectons les Fermiers Béninois',
  description: 'Plateforme de connexion entre fermiers, acheteurs et logistique au Bénin',
  keywords: ['agriculture', 'bénin', 'fermiers', 'marketplace', 'produits locaux'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
