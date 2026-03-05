'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Edit, MapPin, Phone, Mail, Calendar, Award } from 'lucide-react'
import { formatDate, formatPhone } from '@/lib/utils/formatters'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="p-12 text-center">
          <p className="text-gray-600 mb-4">Veuillez vous connecter pour voir votre profil</p>
          <Link href="/login">
            <Button>Se connecter</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>
        <Link href="/profile/edit">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </Link>
      </div>

      {/* Profile Header */}
      <Card className="p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 text-2xl">
            {user.firstName[0]}{user.lastName[0]}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <Badge>{user.role}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {formatPhone(user.phone)}
              </div>
              {user.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Membre depuis {formatDate(user.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Role-specific Information */}
      {user.role === 'FARMER' && user.farmerProfile && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Informations Agricoles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Nom de la ferme</label>
              <p className="font-medium">{user.farmerProfile.farmName}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Localisation</label>
              <p className="font-medium">{user.farmerProfile.location}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Taille de la ferme</label>
              <p className="font-medium">{user.farmerProfile.farmSize} hectares</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Années d'expérience</label>
              <p className="font-medium">{user.farmerProfile.yearsOfExperience} ans</p>
            </div>

            {user.farmerProfile.certifications && user.farmerProfile.certifications.length > 0 && (
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 mb-2 block">Certifications</label>
                <div className="flex flex-wrap gap-2">
                  {user.farmerProfile.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {user.farmerProfile.description && (
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <p className="mt-1 text-gray-700">{user.farmerProfile.description}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {user.role === 'BUYER' && user.buyerProfile && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Informations Acheteur</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Type d'entreprise</label>
              <p className="font-medium">{user.buyerProfile.businessType}</p>
            </div>

            {user.buyerProfile.companyName && (
              <div>
                <label className="text-sm text-gray-600">Nom de l'entreprise</label>
                <p className="font-medium">{user.buyerProfile.companyName}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {user.role === 'LOGISTICS' && user.logisticsProfile && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Informations Logistique</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Nom de l'entreprise</label>
              <p className="font-medium">{user.logisticsProfile.companyName}</p>
            </div>

            {user.logisticsProfile.vehicleTypes && (
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Types de véhicules</label>
                <div className="flex flex-wrap gap-2">
                  {user.logisticsProfile.vehicleTypes.map((vehicle, index) => (
                    <Badge key={index} variant="secondary">
                      {vehicle}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {user.logisticsProfile.coverageAreas && (
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 mb-2 block">Zones de couverture</label>
                <div className="flex flex-wrap gap-2">
                  {user.logisticsProfile.coverageAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Account Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Paramètres du compte</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Notifications par email</p>
              <p className="text-sm text-gray-600">Recevez des mises à jour par email</p>
            </div>
            <Badge variant="secondary">Activé</Badge>
          </div>

          <div className="flex justify-between items-center py-2 border-t">
            <div>
              <p className="font-medium">Notifications SMS</p>
              <p className="text-sm text-gray-600">Recevez des alertes par SMS</p>
            </div>
            <Badge variant="secondary">Activé</Badge>
          </div>

          <div className="flex justify-between items-center py-2 border-t">
            <div>
              <p className="font-medium">Compte vérifié</p>
              <p className="text-sm text-gray-600">Votre email a été vérifié</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Vérifié</Badge>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            Supprimer mon compte
          </Button>
        </div>
      </Card>
    </div>
  )
}
