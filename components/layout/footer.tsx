import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Agri-Lien</h3>
            <p className="text-sm">
              Connectons les fermiers béninois aux acheteurs et facilitons
              l'accès au marché agricole local.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
              </li>
              <li>
                <Link href="/ussd" className="hover:text-white">Simulateur USSD</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">À propos</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Pour les utilisateurs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register/farmer" className="hover:text-white">Devenir Fermier</Link>
              </li>
              <li>
                <Link href="/register/buyer" className="hover:text-white">Devenir Acheteur</Link>
              </li>
              <li>
                <Link href="/register/logistics" className="hover:text-white">Service Logistique</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +229 XX XX XX XX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@agrilien.bj
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Cotonou, Bénin
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 Agri-Lien. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
