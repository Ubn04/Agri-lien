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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-agri-green-50/20">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile Logo */}
          <div className="text-center mb-10 lg:hidden">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-agri-green-500 via-agri-green-600 to-agri-green-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-agri-green-500/30 animate-float">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-poppins">Agri-Lien</h2>
            <p className="text-sm text-gray-600 mt-1">Agriculture connectée du Bénin</p>
          </div>

          {/* Main Card */}
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8 pt-10 px-8">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-center text-gray-900 font-poppins">
                Bon retour !
              </CardTitle>
              <p className="text-center text-gray-600 text-base">
                Connectez-vous pour accéder à votre espace
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-10">
              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-shake">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email/Phone Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                    Email ou Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                    </div>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemple.com ou +229 XX XX XX XX"
                      className="pl-10 h-13 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-2 focus:ring-agri-green-500/20 transition-all text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Mot de passe
                    </label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs font-medium text-agri-green-600 hover:text-agri-green-700 hover:underline transition-colors"
                    >
                      Oublié?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                    </div>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 h-13 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-2 focus:ring-agri-green-500/20 transition-all text-base"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-agri-green-600 focus:ring-agri-green-500 border-gray-300 rounded transition-all"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Se souvenir de moi</span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-gradient-to-r from-agri-green-600 to-agri-green-700 hover:from-agri-green-700 hover:to-agri-green-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Connexion en cours...
                    </span>
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-8 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Ou continuer avec</span>
                  </div>
                </div>
              </div>

              {/* Alternative Login Methods */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:border-agri-green-500 hover:bg-agri-green-50 transition-all duration-200 press-feedback group"
                >
                  <Smartphone className="h-5 w-5 text-agri-green-600" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-agri-green-700">USSD</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:border-agri-green-500 hover:bg-agri-green-50 transition-all duration-200 press-feedback group"
                >
                  <span className="text-xl">📱</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-agri-green-700">SMS</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Pas encore de compte?{' '}
                  <Link 
                    href="/register" 
                    className="font-bold text-agri-green-600 hover:text-agri-green-700 hover:underline transition-colors"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
            En vous connectant, vous acceptez nos{' '}
            <Link href="/terms" className="text-agri-green-600 hover:underline font-medium">
              Conditions d'utilisation
            </Link>
            {' '}et notre{' '}
            <Link href="/privacy" className="text-agri-green-600 hover:underline font-medium">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
