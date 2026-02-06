'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Sprout, Lock, ArrowLeft, CheckCircle } from 'lucide-react'

export default function FarmerRegisterPage() {
  const [step, setStep] = useState(1)
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log('Farmer Registration:', formData)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-green-50 via-white to-gray-50 px-4 py-12 page-transition">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 text-agri-green-600 hover:text-agri-green-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Retour au choix de compte</span>
          </Link>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Sprout className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-poppins">
            Inscription Fermier
          </h1>
          <p className="text-gray-600">
            Créez votre compte pour vendre vos produits directement
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 animate-scale-in">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? 'bg-agri-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 1 ? <CheckCircle className="h-6 w-6" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:inline">Informations personnelles</span>
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? 'bg-agri-green-600' : 'bg-gray-200'}`}></div>
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? 'bg-agri-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium hidden sm:inline">Informations ferme</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0 hover-lift animate-scale-in">
          <CardContent className="p-8 lg:p-12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Vos informations personnelles
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 h-12"
                          placeholder="Jean"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10 h-12"
                          placeholder="Kouassi"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 h-12"
                        placeholder="jean.kouassi@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 h-12"
                        placeholder="+229 XX XX XX XX"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Format: +229 suivi de votre numéro
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 h-12"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 h-12"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="w-full h-12 bg-agri-green-600 hover:bg-agri-green-700 text-white font-semibold press-feedback"
                  >
                    Continuer
                  </Button>
                </div>
              )}

              {/* Step 2: Farm Information */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Informations sur votre ferme
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la ferme *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Sprout className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleChange}
                        className="pl-10 h-12"
                        placeholder="Ex: Ferme Bio Kouassi"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        name="farmLocation"
                        value={formData.farmLocation}
                        onChange={handleChange}
                        className="pl-10 h-12"
                        placeholder="Ex: Abomey-Calavi, Atlantique"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Ville ou commune, département
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille de la ferme (hectares)
                    </label>
                    <Input
                      type="number"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Ex: 2.5"
                      step="0.1"
                      min="0"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Optionnel - Entrez la superficie de votre exploitation
                    </p>
                  </div>

                  {/* Benefits Reminder */}
                  <div className="bg-agri-green-50 border border-agri-green-200 rounded-xl p-6 mt-6">
                    <h3 className="font-semibold text-agri-green-900 mb-3">
                      🌾 Avantages de votre compte fermier:
                    </h3>
                    <ul className="space-y-2 text-sm text-agri-green-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-agri-green-600" />
                        <span>Vendez directement sans intermédiaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-agri-green-600" />
                        <span>Gérez facilement vos stocks et produits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-agri-green-600" />
                        <span>Recevez vos paiements via Mobile Money</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-agri-green-600" />
                        <span>Suivez vos commandes en temps réel</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 h-12 press-feedback"
                    >
                      Retour
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 h-12 bg-agri-green-600 hover:bg-agri-green-700 text-white font-semibold press-feedback"
                    >
                      Créer mon compte
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
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
  )
}
