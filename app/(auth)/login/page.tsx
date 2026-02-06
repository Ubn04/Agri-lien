'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Mail, Lock, Smartphone, ArrowRight, Leaf, AlertCircle } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await login(email, password)
      // La redirection est gérée dans le AuthProvider
    } catch (error: any) {
      setError(error.message || 'Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex page-transition">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-agri-green-600 via-agri-green-700 to-agri-green-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="animate-fade-in">
            <Leaf className="h-16 w-16 mb-6 text-agri-gold-400" />
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 font-poppins">
              Bienvenue sur <br />Agri-Lien
            </h1>
            <p className="text-lg xl:text-xl text-agri-green-100 mb-8 leading-relaxed">
              Connectez-vous pour accéder à la plateforme qui révolutionne 
              l'agriculture au Bénin
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-agri-green-500/30 flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <p className="font-semibold">Marché Direct</p>
                  <p className="text-sm text-agri-green-200">Vendez sans intermédiaire</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-agri-green-500/30 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="font-semibold">Support USSD</p>
                  <p className="text-sm text-agri-green-200">Accessible sans Internet</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-agri-green-500/30 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="font-semibold">Paiements Sécurisés</p>
                  <p className="text-sm text-agri-green-200">Mobile Money intégré</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8 lg:hidden">
            <Leaf className="h-12 w-12 mx-auto mb-4 text-agri-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Agri-Lien</h2>
          </div>

          <Card className="shadow-xl border-0 hover-lift">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Connexion
              </CardTitle>
              <p className="text-center text-gray-600">
              </p>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 animate-fade-in">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email ou Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemple.com ou +229..."
                      className="pl-10 h-12 border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 h-12 border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-agri-green-600 focus:ring-agri-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Se souvenir de moi</span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-agri-green-600 hover:text-agri-green-700 hover:underline"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-agri-green-600 hover:bg-agri-green-700 text-white font-semibold text-base press-feedback"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Connexion en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Se connecter
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors press-feedback"
                  >
                    <Smartphone className="h-5 w-5 text-agri-green-600" />
                    <span className="text-sm font-medium text-gray-700">USSD</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors press-feedback"
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-medium text-gray-700">SMS</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Pas encore de compte?{' '}
                  <Link 
                    href="/register" 
                    className="font-semibold text-agri-green-600 hover:text-agri-green-700 hover:underline"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm text-gray-500">
            En vous connectant, vous acceptez nos{' '}
            <Link href="/terms" className="text-agri-green-600 hover:underline">
              Conditions d'utilisation
            </Link>
            {' '}et notre{' '}
            <Link href="/privacy" className="text-agri-green-600 hover:underline">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
