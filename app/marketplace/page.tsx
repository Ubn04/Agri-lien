'use client'

import { useState, useMemo } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { SearchBarAdvanced } from '@/components/marketplace/search-bar-advanced'
import { FilterPanelAdvanced } from '@/components/marketplace/filter-panel-advanced'
import { ProductCardEnhanced } from '@/components/marketplace/product-card-enhanced'
import { CartFloating } from '@/components/marketplace/cart-floating'
import { ViewToggle } from '@/components/marketplace/view-toggle'
import { Pagination } from '@/components/marketplace/pagination'

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  image: string
  farmer: string
  location: string
  rating: number
  sales: number
  quality: string
  stock: number
}

export default function MarketplacePage() {
  // État de recherche et filtres
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: 'Tous',
    region: 'Toutes',
    priceRange: [0, 100000] as [number, number],
    quality: 'Toutes',
  })

  // État du panier
  const [cart, setCart] = useState<any[]>([])

  // État de pagination et vue
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const itemsPerPage = 12

  // Données produits (à remplacer par API)
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Igname fraîche',
      category: 'Tubercules',
      price: 500,
      unit: 'kg',
      image: '🍠',
      farmer: 'Koffi Mensah',
      location: 'Abomey, Zou',
      rating: 5,
      sales: 127,
      quality: 'Premium',
      stock: 200,
    },
    {
      id: '2',
      name: 'Tomates bio',
      category: 'Légumes',
      price: 800,
      unit: 'kg',
      image: '🍅',
      farmer: 'Aminata Diallo',
      location: 'Cotonou, Littoral',
      rating: 5,
      sales: 89,
      quality: 'Bio',
      stock: 150,
    },
    {
      id: '3',
      name: 'Maïs jaune',
      category: 'Céréales',
      price: 350,
      unit: 'kg',
      image: '🌽',
      farmer: 'Serge Ahoussou',
      location: 'Parakou, Borgou',
      rating: 4,
      sales: 156,
      quality: 'Standard',
      stock: 300,
    },
    {
      id: '4',
      name: 'Ananas Victoria',
      category: 'Fruits',
      price: 250,
      unit: 'unité',
      image: '🍍',
      farmer: 'Célestine Koffi',
      location: 'Allada, Atlantique',
      rating: 5,
      sales: 203,
      quality: 'Premium',
      stock: 100,
    },
    {
      id: '5',
      name: 'Piment rouge',
      category: 'Épices',
      price: 1200,
      unit: 'kg',
      image: '🌶️',
      farmer: 'Jean-Baptiste',
      location: 'Djougou, Donga',
      rating: 5,
      sales: 67,
      quality: 'Bio',
      stock: 50,
    },
    {
      id: '6',
      name: 'Bananes plantain',
      category: 'Fruits',
      price: 400,
      unit: 'kg',
      image: '🍌',
      farmer: 'Marie Ahounou',
      location: 'Lokossa, Mono',
      rating: 4,
      sales: 178,
      quality: 'Standard',
      stock: 250,
    },
    {
      id: '7',
      name: 'Karité bio',
      category: 'Fruits',
      price: 2000,
      unit: 'kg',
      image: '🥜',
      farmer: 'Rasmata Sawadogo',
      location: 'Natitingou, Atacora',
      rating: 5,
      sales: 45,
      quality: 'Bio',
      stock: 80,
    },
    {
      id: '8',
      name: 'Manioc frais',
      category: 'Tubercules',
      price: 300,
      unit: 'kg',
      image: '🥔',
      farmer: 'Honoré Gbaguidi',
      location: 'Savalou, Collines',
      rating: 4,
      sales: 134,
      quality: 'Standard',
      stock: 400,
    },
    {
      id: '9',
      name: 'Gingembre',
      category: 'Épices',
      price: 1500,
      unit: 'kg',
      image: '🫚',
      farmer: 'Christelle Agbodjan',
      location: 'Porto-Novo, Ouémé',
      rating: 5,
      sales: 92,
      quality: 'Premium',
      stock: 60,
    },
    {
      id: '10',
      name: 'Haricots verts',
      category: 'Légumes',
      price: 600,
      unit: 'kg',
      image: '🫘',
      farmer: 'Prosper Dossou',
      location: 'Bohicon, Zou',
      rating: 4,
      sales: 112,
      quality: 'Standard',
      stock: 120,
    },
    {
      id: '11',
      name: 'Papaye solo',
      category: 'Fruits',
      price: 200,
      unit: 'unité',
      image: '🍈',
      farmer: 'Yvette Kouton',
      location: 'Ouidah, Atlantique',
      rating: 5,
      sales: 89,
      quality: 'Premium',
      stock: 150,
    },
    {
      id: '12',
      name: 'Riz local',
      category: 'Céréales',
      price: 450,
      unit: 'kg',
      image: '🌾',
      farmer: 'Daniel Ahossi',
      location: 'Malanville, Alibori',
      rating: 4,
      sales: 201,
      quality: 'Standard',
      stock: 500,
    },
  ]

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Recherche
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Catégorie
      if (filters.category !== 'Tous' && product.category !== filters.category) {
        return false
      }

      // Région
      if (filters.region !== 'Toutes' && !product.location.includes(filters.region)) {
        return false
      }

      // Prix
      if (product.price > filters.priceRange[1]) {
        return false
      }

      // Qualité
      if (filters.quality !== 'Toutes' && product.quality !== filters.quality) {
        return false
      }

      return true
    })
  }, [searchQuery, filters, allProducts])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Gestion du panier
  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-agri-green-50/20 page-transition">
      <Navigation />

      {/* Hero section */}
      <div className="bg-gradient-to-r from-agri-green-600 to-agri-green-700 text-white py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            🛒 Marketplace Agricole
          </h1>
          <p className="text-xl text-agri-green-100 max-w-2xl">
            Découvrez les meilleurs produits locaux directement des agriculteurs béninois
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Barre de recherche */}
        <div className="mb-8">
          <SearchBarAdvanced
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleFilters={() => setShowFilters(!showFilters)}
            resultsCount={filteredProducts.length}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Panel de filtres */}
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterPanelAdvanced
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          )}

          {/* Produits */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Toggle vue */}
            <div className="mb-6">
              <ViewToggle
                viewMode={viewMode}
                setViewMode={setViewMode}
                totalResults={filteredProducts.length}
              />
            </div>

            {/* Grille/Liste de produits */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({
                      category: 'Tous',
                      region: 'Toutes',
                      priceRange: [0, 100000],
                      quality: 'Toutes',
                    })
                  }}
                  className="bg-agri-green-500 hover:bg-agri-green-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCardEnhanced
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Panier flottant */}
      <CartFloating
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      <Footer />
    </div>
  )
}
