import { create } from 'zustand';
import { axiosClient } from '../api/axiosClient';

// 1. Matches the exact JSON from your Spring Boot Backend
export interface ShopInfo {
  companyName: string;
  bio: string | null;
  logoUrl: string | null;
  website: string | null;
  averageRating: number | null;
}

// 2. Added productName to match JSON
export interface OrderItem {
  id: string;
  productId: string;
  productName: string; 
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;      
  shop: ShopInfo;         
  totalAmount: number;
  shippingFee?: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
}

interface OrderState {
  orders: Order[]; 
  isLoading: boolean;
  error: string | null;

  fetchOrders: (role: 'BUYER' | 'SELLER') => Promise<void>;
  createOrder: (orderData: any) => Promise<boolean>;
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<boolean>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async (role) => {
    set({ isLoading: true, error: null });
    try {
      const endpoint = role === 'BUYER' ? '/orders/my-purchases' : '/orders/my-sales';
      const response = await axiosClient.get(endpoint);
      
      if (response.data && response.data.data) {
        set({ orders: response.data.data, isLoading: false });
      }
    } catch (error: any) {
      console.error("Failed to fetch orders:", error);
      const errorMessage = error.response?.data?.errorMessage || error.message || "Failed to load orders";
      set({ error: errorMessage, isLoading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosClient.post('/orders/create', orderData);
      
      await get().fetchOrders('BUYER');
      return true;
    } catch (error: any) {
      console.error("Failed to create order:", error);
      const errorMessage = error.response?.data?.errorMessage || "Could not complete the checkout.";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      await axiosClient.patch(`/orders/${orderId}/status`, { status: newStatus });
      
      set((state) => ({
        orders: state.orders.map((order) => 
          order.id === orderId ? { ...order, status: newStatus as any } : order
        )
      }));
      return true;
    } catch (error: any) {
      console.error("Failed to update order status:", error);
      return false;
    }
  }
}));