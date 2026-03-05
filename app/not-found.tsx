import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-6">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          <Home className="h-5 w-5" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
