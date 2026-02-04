import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'

const inter = Inter({ subsets: ['latin'] })

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
