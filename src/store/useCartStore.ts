import { create } from 'zustand';
import { Product } from './useProductStore';

export interface CartItem extends Product {
  cartQuantity: number;
  lockedPrice: number; // The volume price based on the quantity they added
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, price: number) => { success: boolean; message?: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product, quantity, price) => {
    const { items } = get();

    // 🚨 B2B RULE: Enforce Single Shop per Order
    if (items.length > 0 && items[0].shopId !== product.shopId) {
      return { 
        success: false, 
        message: `Your cart currently contains items from ${items[0].shopName}. You can only order from one supplier at a time.` 
      };
    }

    // Check if item already exists in cart
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: item.cartQuantity + quantity, lockedPrice: price }
            : item
        )
      });
    } else {
      set({ items: [...items, { ...product, cartQuantity: quantity, lockedPrice: price }] });
    }

    return { success: true };
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    }));
  },

  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      )
    }));
  },

  clearCart: () => set({ items: [] }),

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.lockedPrice * item.cartQuantity), 0);
  }
}));