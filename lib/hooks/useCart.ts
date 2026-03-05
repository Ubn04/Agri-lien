import { useState, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  farmerId: string;
  location: string;
  images: string[];
  quantity: number;
}

const CART_STORAGE_KEY = 'agrilienCart';

export function useCart() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Omit<CartProduct, 'quantity'>, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Augmenter la quantité si le produit existe déjà
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        // Ajouter le nouveau produit
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Diminuer la quantité
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Supprimer le produit
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      clearItem(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (productId: string): number => {
    return cart.find((item) => item.id === productId)?.quantity || 0;
  };

  const getTotalItems = (): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return {
    cart,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearItem,
    clearCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
  };
}
