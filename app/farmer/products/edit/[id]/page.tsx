'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { Package, ArrowLeft, Upload, Save, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProduct({ params }: PageProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    category: 'Légumes',
    stock: '',
    location: '',
    image: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      router.push('/login');
      return;
    }
    fetchProduct();
  }, [user, router, params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();

      if (data.success && data.data?.product) {
        const product = data.data.product;
        
        // Vérifier que c'est bien un produit du fermier connecté
        if (product.farmerId !== user?.id) {
          alert('Vous ne pouvez modifier que vos propres produits');
          router.push('/farmer/products');
          return;
        }

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          unit: product.unit || 'kg',
          category: product.category || 'Légumes',
          stock: product.stock?.toString() || '',
          location: product.location || '',
          image: product.images?.[0] || '',
        });

        if (product.images?.[0]) {
          setImagePreview(product.images[0]);
        }
      } else {
        alert('Produit non trouvé');
        router.push('/farmer/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Erreur lors du chargement du produit');
      router.push('/farmer/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      alert('Le prix doit être supérieur à 0');
      return;
    }

    if (parseInt(formData.stock) < 0) {
      alert('Le stock ne peut pas être négatif');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          unit: formData.unit,
          category: formData.category,
          stock: parseInt(formData.stock),
          location: formData.location,
          images: formData.image ? [formData.image] : [],
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Produit modifié avec succès !');
        router.push('/farmer/products');
      } else {
        alert(data.message || 'Erreur lors de la modification du produit');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Erreur lors de la modification du produit');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Modifier le Produit
            </h1>
            <p className="text-gray-400">
              Modifiez les informations de votre produit
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-green-400" />
              Informations du Produit
            </h2>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom du produit <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Tomates fraîches"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre produit..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            {/* Price and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prix (FCFA) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="500"
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Unité <span className="text-red-400">*</span>
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="kg">Kilogramme (kg)</option>
                  <option value="g">Gramme (g)</option>
                  <option value="l">Litre (l)</option>
                  <option value="unité">Unité</option>
                  <option value="sac">Sac</option>
                  <option value="panier">Panier</option>
                </select>
              </div>
            </div>

            {/* Category and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Catégorie <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Légumes">Légumes</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Céréales">Céréales</option>
                  <option value="Tubercules">Tubercules</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock disponible <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="100"
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Localisation
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Cotonou, Bénin"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-green-400" />
              Image du Produit
            </h2>

            {imagePreview ? (
              <div className="relative">
                <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Aperçu du produit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg hover:bg-gray-600 transition-all">
                      <Upload className="w-5 h-5" />
                      Changer l'image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                    Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-white mb-2 font-medium">
                    Cliquez pour télécharger une image
                  </p>
                  <p className="text-gray-400 text-sm mb-1">
                    PNG, JPG, JPEG jusqu'à 5MB
                  </p>
                  <p className="text-gray-500 text-xs">
                    Recommandé: 800x600 pixels minimum
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all"
              disabled={saving}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Modification en cours...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer les Modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
