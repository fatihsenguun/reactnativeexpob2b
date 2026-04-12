import { create } from 'zustand';
import { Product } from './useProductStore';

export interface CartItem extends Product {
  cartQuantity: number;
  lockedPrice: number; 
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

    // 🚨 1. B2B RULE: Enforce Single Shop per Order
    if (items.length > 0 && items[0].shopId !== product.shopId) {
      return { 
        success: false, 
        message: `Your cart currently contains items from ${items[0].shopName}. You can only order from one supplier at a time.` 
      };
    }

    const existingItem = items.find(item => item.id === product.id);
    const newTotalQuantity = existingItem ? existingItem.cartQuantity + quantity : quantity;

    // 🚨 2. STOCK GUARD: Prevent exceeding available inventory
    if (newTotalQuantity > product.stock) {
      return {
        success: false,
        message: `Cannot add ${quantity} units. Only ${product.stock} units are currently available in stock.`
      };
    }

    if (existingItem) {
      set({
        items: items.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: newTotalQuantity, lockedPrice: price }
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
    // Note: We don't enforce stock limit here because the UI will prevent it, 
    // but you could add a secondary check here if you want to be extra safe.
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