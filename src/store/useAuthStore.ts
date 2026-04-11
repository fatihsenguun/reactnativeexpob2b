import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

// YENİ: Kullanıcı verisi için arayüz (Backend'den dönen DtoUser yapısına uygun)
export interface UserData {
  fullName: string;
  email: string;
  role: string;
}

// Define the exact shape of our authentication data
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userRole: 'ROLE_BUYER' | 'ROLE_SELLER' | null;
  user: UserData | null; // YENİ: Kullanıcı nesnesi eklendi
  isLoading: boolean;
  
  // Actions (login fonksiyonuna userData parametresi eklendi)
  login: (access: string, refresh: string, role: 'ROLE_BUYER' | 'ROLE_SELLER', userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateTokens: (newAccess: string, newRefresh?: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userRole: null,
  user: null, // YENİ: Başlangıç değeri null
  isLoading: true, 

  // 1. The Login Action
  login: async (access, refresh, role, userData) => {
    try {
      await SecureStore.setItemAsync('access_token', access);
      await SecureStore.setItemAsync('refresh_token', refresh);
      await SecureStore.setItemAsync('user_role', role);
      
      // YENİ: Kullanıcı datasını JSON string'e çevirip cihaza kaydediyoruz
      await SecureStore.setItemAsync('user_data', JSON.stringify(userData));

      set({ accessToken: access, refreshToken: refresh, userRole: role, user: userData });
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
      
      // YENİ: Çıkış yaparken kullanıcı datasını da siliyoruz
      await SecureStore.deleteItemAsync('user_data');
      
      set({ accessToken: null, refreshToken: null, userRole: null, user: null });
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
      
      // YENİ: Uygulama açıldığında kayıtlı kullanıcı bilgisini de çekiyoruz
      const userDataStr = await SecureStore.getItemAsync('user_data');
      
      if (access && refresh && role && userDataStr) {
        set({ 
          accessToken: access, 
          refreshToken: refresh, 
          userRole: role,
          user: JSON.parse(userDataStr) // JSON string'den objeye çeviriyoruz
        });
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