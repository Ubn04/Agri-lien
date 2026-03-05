'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Sprout, Lock, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Loader2, Check } from 'lucide-react'

export default function FarmerRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('') // Clear error on input change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'farmer',
          metadata: {
            farmName: formData.farmName,
            farmLocation: formData.farmLocation,
            farmSize: formData.farmSize,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription')
      }

      // Redirection vers le tableau de bord fermier après inscription réussie
      router.push('/farmer/dashboard')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    // Validation avant passage à l'étape suivante
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        setError('Veuillez remplir tous les champs obligatoires')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas')
        return
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères')
        return
      }
      setError('')
    }
    setStep(step + 1)
  }
  
  const prevStep = () => {
    setError('')
    setStep(step - 1)
  }

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: User },
    { number: 2, title: 'Informations ferme', icon: Sprout },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-agri-green-50/30 px-4 py-12 page-transition">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 text-agri-green-600 hover:text-agri-green-700 mb-6 transition-all hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Retour au choix de compte</span>
          </Link>
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-gradient-to-br from-agri-green-500 via-agri-green-600 to-agri-green-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-agri-green-500/30 animate-float">
              <Sprout className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-poppins">
            Inscription Fermier
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rejoignez des milliers d'agriculteurs et vendez vos produits directement aux acheteurs
          </p>
        </div>

        {/* Modern Progress Indicator */}
        <div className="mb-10 animate-scale-in">
          <div className="relative max-w-2xl mx-auto">
            {/* Progress Bar Background */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0">
              <div 
                className="h-full bg-gradient-to-r from-agri-green-500 to-agri-green-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative z-10 flex justify-between">
              {steps.map((s, idx) => {
                const StepIcon = s.icon
                const isCompleted = step > s.number
                const isCurrent = step === s.number
                
                return (
                  <div key={s.number} className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div className={`
                      relative h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg
                      transition-all duration-300 shadow-lg
                      ${isCompleted 
                        ? 'bg-gradient-to-br from-agri-green-500 to-agri-green-600 text-white scale-100' 
                        : isCurrent
                        ? 'bg-gradient-to-br from-agri-green-500 to-agri-green-600 text-white scale-110 ring-4 ring-agri-green-100'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                      }
                    `}>
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                      
                      {/* Pulse animation for current step */}
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full bg-agri-green-400 animate-ping opacity-75" />
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-semibold transition-colors ${
                        isCurrent || isCompleted ? 'text-agri-green-600' : 'text-gray-400'
                      }`}>
                        Étape {s.number}
                      </p>
                      <p className={`text-xs mt-1 hidden sm:block max-w-[140px] leading-tight ${
                        isCurrent || isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {s.title}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden animate-scale-in">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="p-8 lg:p-12 space-y-8 animate-fade-in">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="h-12 w-12 bg-agri-green-100 rounded-xl flex items-center justify-center">
                      <User className="h-6 w-6 text-agri-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Informations personnelles
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Commençons par vos coordonnées
                      </p>
                    </div>
                  </div>

                  {/* Identity Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1 w-8 bg-agri-green-500 rounded" />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identité</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                          </div>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                            placeholder="Jean"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                          </div>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                            placeholder="Kouassi"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1 w-8 bg-agri-green-500 rounded" />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact</h3>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                        </div>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                          placeholder="jean.kouassi@exemple.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                        </div>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                          placeholder="+229 XX XX XX XX"
                          required
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
                        Format: +229 suivi de votre numéro
                      </p>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1 w-8 bg-agri-green-500 rounded" />
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Sécurité</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                          </div>
                          <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
                          Minimum 6 caractères
                        </p>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                          </div>
                          <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-r-lg flex items-start gap-3 animate-shake">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="w-full h-14 bg-gradient-to-r from-agri-green-600 to-agri-green-700 hover:from-agri-green-700 hover:to-agri-green-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <span>Continuer</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Farm Information */}
              {step === 2 && (
                <div className="p-8 lg:p-12 space-y-8 animate-fade-in">
                  {/* Section Header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="h-12 w-12 bg-agri-green-100 rounded-xl flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-agri-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Informations sur votre ferme
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Parlez-nous de votre exploitation agricole
                      </p>
                    </div>
                  </div>

                  {/* Farm Details */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de la ferme <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Sprout className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                        </div>
                        <Input
                          name="farmName"
                          value={formData.farmName}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                          placeholder="Ex: Ferme Bio Kouassi"
                          required
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
                        Nom commercial de votre exploitation
                      </p>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localisation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-agri-green-500 transition-colors" />
                        </div>
                        <Input
                          name="farmLocation"
                          value={formData.farmLocation}
                          onChange={handleChange}
                          className="pl-10 h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                          placeholder="Ex: Abomey-Calavi, Atlantique"
                          required
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
                        Ville ou commune, département
                      </p>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taille de la ferme (hectares)
                      </label>
                      <Input
                        type="number"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleChange}
                        className="h-12 bg-white border-gray-300 focus:border-agri-green-500 focus:ring-agri-green-500 transition-all"
                        placeholder="Ex: 2.5"
                        step="0.1"
                        min="0"
                      />
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
                        Optionnel - Superficie totale de votre exploitation
                      </p>
                    </div>
                  </div>

                  {/* Benefits Card */}
                  <div className="bg-gradient-to-br from-agri-green-50 to-agri-green-100/50 border-2 border-agri-green-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-2xl">🌾</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-agri-green-900 mb-3 text-lg">
                          Avantages de votre compte fermier
                        </h3>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-3 text-sm text-agri-green-800">
                            <CheckCircle className="h-5 w-5 text-agri-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Vente directe:</strong> Vendez sans intermédiaire et maximisez vos profits</span>
                          </li>
                          <li className="flex items-start gap-3 text-sm text-agri-green-800">
                            <CheckCircle className="h-5 w-5 text-agri-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Gestion simplifiée:</strong> Interface intuitive pour gérer stocks et produits</span>
                          </li>
                          <li className="flex items-start gap-3 text-sm text-agri-green-800">
                            <CheckCircle className="h-5 w-5 text-agri-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Paiements sécurisés:</strong> Recevez vos fonds via Mobile Money (MTN, Moov)</span>
                          </li>
                          <li className="flex items-start gap-3 text-sm text-agri-green-800">
                            <CheckCircle className="h-5 w-5 text-agri-green-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Suivi en temps réel:</strong> Notifications et tableau de bord complet</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-r-lg flex items-start gap-3 animate-shake">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-14 border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 group"
                        disabled={loading}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Retour</span>
                      </Button>
                      <Button 
                        type="submit"
                        className="flex-1 h-14 bg-gradient-to-r from-agri-green-600 to-agri-green-700 hover:from-agri-green-700 hover:to-agri-green-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Création en cours...
                          </>
                        ) : (
                          <>
                            <span>Créer mon compte</span>
                            <Check className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-sm text-gray-500">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-agri-green-600 hover:text-agri-green-700 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            En vous inscrivant, vous acceptez nos{' '}
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
