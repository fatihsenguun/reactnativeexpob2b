import { create } from 'zustand';
import { axiosClient } from '../api/axiosClient';


export interface ShopInfo {
  id: string;
  name: string;
  email: string;

}

// 2. Define the Order Item
export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  subTotal: number;
}

// 3. Define the main Order exactly as it comes from DtoOrder
export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;      // ADDED: Matches DTO
  shop: ShopInfo;         // ADDED: Matches the nested DtoBusinessProfile
  totalAmount: number;
  shippingFee: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
}

interface OrderState {
  orders: Order[]; 
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchOrders: (role: 'BUYER' | 'SELLER') => Promise<void>;
  createOrder: (orderData: any) => Promise<boolean>;
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<boolean>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  // 1. Fetch Orders (based on Buyer or Seller role)
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
      // Extract the exact error message from your Spring Boot BaseException
      const errorMessage = error.response?.data?.errorMessage || error.message || "Failed to load orders";
      set({ error: errorMessage, isLoading: false });
    }
  },

  // 2. Create New Order
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosClient.post('/orders', orderData);
      
      // If the order is created successfully, automatically refresh the buyer's order list
      await get().fetchOrders('BUYER');
      return true;
    } catch (error: any) {
      console.error("Failed to create order:", error);
      const errorMessage = error.response?.data?.errorMessage || "Could not complete the checkout.";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  // 3. Update Order Status (Optimistic UI Update)
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      // Send the request to Spring Boot
      await axiosClient.patch(`/orders/${orderId}/status`, { status: newStatus });
      
      // Instantly update the specific order in the React Native state for a snappy UI
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