'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Lock, ArrowLeft, CheckCircle, Truck, FileText, AlertCircle, Loader2 } from 'lucide-react'

export default function LogisticsRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    vehicleType: '',
    vehicleNumber: '',
    operatingZone: '',
    licenseNumber: '',
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
          role: 'logistics',
          metadata: {
            companyName: formData.companyName,
            vehicleType: formData.vehicleType,
            vehicleNumber: formData.vehicleNumber,
            operatingZone: formData.operatingZone,
            licenseNumber: formData.licenseNumber,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription')
      }

      // Redirection vers le tableau de bord logistique après inscription réussie
      router.push('/logistics/dashboard')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 page-transition">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 text-agri-ochre-600 hover:text-agri-ochre-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Retour au choix de compte</span>
          </Link>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-agri-ochre-500 to-agri-ochre-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-poppins">
            Inscription Logistique
          </h1>
          <p className="text-gray-600">
            Créez votre compte pour offrir des services de livraison
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white shadow-xl border border-gray-200 hover-lift animate-scale-in">
          <CardContent className="p-8 lg:p-12 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="pl-10 h-12 bg-white"
                      placeholder="Sébastien"
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
                      className="pl-10 h-12 bg-white"
                      placeholder="Ahouansou"
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
                    className="pl-10 h-12 bg-white"
                    placeholder="sebastien@exemple.com"
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
                    className="pl-10 h-12 bg-white"
                    placeholder="+229 XX XX XX XX"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Pour recevoir les demandes de livraison
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise (optionnel)
                </label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="h-12 bg-white"
                  placeholder="Ex: Transport Express Bénin"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de véhicule *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agri-ochre-500"
                    required
                  >
                    <option value="">Sélectionner...</option>
                    <option value="moto">Moto</option>
                    <option value="tricycle">Tricycle</option>
                    <option value="camionnette">Camionnette</option>
                    <option value="camion">Camion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro d'immatriculation *
                  </label>
                  <Input
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="h-12 bg-white"
                    placeholder="Ex: AB-1234-BJ"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone d'opération *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    name="operatingZone"
                    value={formData.operatingZone}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-white"
                    placeholder="Ex: Cotonou, Porto-Novo"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Villes ou départements où vous opérez
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de permis de conduire *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-white"
                    placeholder="Numéro de permis"
                    required
                  />
                </div>
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
                      className="pl-10 h-12 bg-white"
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
                      className="pl-10 h-12 bg-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Benefits Reminder */}
              <div className="bg-agri-ochre-50 border border-agri-ochre-200 rounded-xl p-6">
                <h3 className="font-semibold text-agri-ochre-900 mb-3">
                  🚚 Avantages de votre compte logistique:
                </h3>
                <ul className="space-y-2 text-sm text-agri-ochre-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-agri-ochre-600" />
                    <span>Générez des revenus supplémentaires</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-agri-ochre-600" />
                    <span>Routes de livraison optimisées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-agri-ochre-600" />
                    <span>Paiements rapides et sécurisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-agri-ochre-600" />
                    <span>Notifications en temps réel</span>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-agri-ochre-600 hover:bg-agri-ochre-700 text-white font-semibold press-feedback"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          En vous inscrivant, vous acceptez nos{' '}
          <Link href="/terms" className="text-agri-ochre-600 hover:underline">
            Conditions d'utilisation
          </Link>
          {' '}et notre{' '}
          <Link href="/privacy" className="text-agri-ochre-600 hover:underline">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  )
}
