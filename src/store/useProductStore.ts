import { create } from 'zustand';
import { axiosClient } from '../api/axiosClient';

export interface TieredPrice {
  minQuantity: number;
  maxQuantity: number | null;
  unitPrice: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  stock: number;
  totalSalesCount: number;
  categoryId: string;
  categoryName: string;
  version: number;
  shopId: string;
  shopName: string; 
  tieredPrices: TieredPrice[];
}

interface ProductState {
  products: Product[]; 
  filteredProducts: Product[]; 
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  searchQuery: '',

  // 3. Instant Local Search Logic
  setSearchQuery: (query) => {
    set((state) => {
      const lowerCaseQuery = query.toLowerCase();

      const filtered = state.products.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) || 
        p.shopName.toLowerCase().includes(lowerCaseQuery)
      );
      return { searchQuery: query, filteredProducts: filtered };
    });
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get('/product/all?size=100&sort=name');
      
      const contentArray = response.data?.data?.content || [];
      
      set({ 
        products: contentArray, 
        filteredProducts: contentArray, 
        isLoading: false 
      });
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      const errorMessage = error.response?.data?.errorMessage || "Could not load products.";
      set({ error: errorMessage, isLoading: false });
    }
  }
}));