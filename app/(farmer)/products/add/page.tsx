'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/lib/hooks/use-products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

export default function AddProductPage() {
  const router = useRouter()
  const { createProduct } = useProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'VEGETABLES',
    pricePerUnit: '',
    unit: 'KG',
    availableQuantity: '',
    minimumOrder: '',
    location: '',
    certifications: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createProduct({
        ...formData,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        availableQuantity: parseFloat(formData.availableQuantity),
        minimumOrder: parseFloat(formData.minimumOrder),
      })
      
      router.push('/products')
    } catch (error) {
      console.error('Failed to create product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Nouveau Produit</h1>
        <p className="text-gray-600">Ajoutez un nouveau produit à votre catalogue</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium mb-2">Nom du produit *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Tomates fraîches"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre produit..."
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="VEGETABLES">Légumes</option>
                  <option value="FRUITS">Fruits</option>
                  <option value="CEREALS">Céréales</option>
                  <option value="TUBERS">Tubercules</option>
                  <option value="SPICES">Épices</option>
                  <option value="LIVESTOCK">Bétail</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Unité *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="KG">Kilogramme (kg)</option>
                  <option value="GRAM">Gramme (g)</option>
                  <option value="TON">Tonne</option>
                  <option value="PIECE">Pièce</option>
                  <option value="BUNCH">Botte</option>
                  <option value="LITER">Litre</option>
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prix unitaire (FCFA) *</label>
                <Input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  placeholder="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantité disponible *</label>
                <Input
                  type="number"
                  name="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  placeholder="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Commande min. *</label>
                <Input
                  type="number"
                  name="minimumOrder"
                  value={formData.minimumOrder}
                  onChange={handleChange}
                  placeholder="5"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Localisation *</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Cotonou, Littoral"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">Photos du produit</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Cliquez pour télécharger ou glissez-déposez</p>
                <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Link href="/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Création...' : 'Créer le produit'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
