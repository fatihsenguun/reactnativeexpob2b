import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

// Define the exact shape of our authentication data
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userRole: 'ROLE_BUYER' | 'ROLE_SELLER' | null;
  isLoading: boolean;
  
  // Actions
  login: (access: string, refresh: string, role: 'ROLE_BUYER' | 'ROLE_SELLER') => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateTokens: (newAccess: string, newRefresh?: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userRole: null,
  isLoading: true, 

  // 1. The Login Action
  login: async (access, refresh, role) => {
    try {
      await SecureStore.setItemAsync('access_token', access);
      await SecureStore.setItemAsync('refresh_token', refresh);
      await SecureStore.setItemAsync('user_role', role);

      set({ accessToken: access, refreshToken: refresh, userRole: role });
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  },

  // 2. The Logout Action
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_role');
      
      set({ accessToken: null, refreshToken: null, userRole: null });
    } catch (error) {
      console.error("Error clearing auth state:", error);
    }
  },

  // 3. The Boot-Up Check
  checkAuth: async () => {
    try {
      const access = await SecureStore.getItemAsync('access_token');
      const refresh = await SecureStore.getItemAsync('refresh_token');
      const role = await SecureStore.getItemAsync('user_role') as 'ROLE_BUYER' | 'ROLE_SELLER' | null;
      
      if (access && refresh && role) {
        set({ accessToken: access, refreshToken: refresh, userRole: role });
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      // Always stop the loading state, even if it fails, so the app can mount
      set({ isLoading: false }); 
    }
  },

  // 4. Silently Update Tokens (Used by Axios Interceptors)
  updateTokens: async (newAccess, newRefresh) => {
    try {
      await SecureStore.setItemAsync('access_token', newAccess);
      
      // Sometimes the backend only sends a new access token, so we only update refresh if provided
      if (newRefresh) {
        await SecureStore.setItemAsync('refresh_token', newRefresh);
        set({ accessToken: newAccess, refreshToken: newRefresh });
      } else {
        set({ accessToken: newAccess });
      }
    } catch (error) {
      console.error("Failed to update tokens", error);
    }
  }
}));