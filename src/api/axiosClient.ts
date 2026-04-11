import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_URL = 'http://localhost:8080';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// -----------------------------------------------------------
// (REQUEST) 
// -----------------------------------------------------------
axiosClient.interceptors.request.use(
  async (config) => {

    const token = useAuthStore.getState().accessToken;
    
    if (token && !config.url?.includes('/login') && !config.url?.includes('/register')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------
// (RESPONSE
// -----------------------------------------------------------
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          await useAuthStore.getState().logout();
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(`${API_URL}/refresh`, {
          refreshToken: refreshToken
        });

        const newAccessToken = refreshResponse.data.data.accessToken;
        const newRefreshToken = refreshResponse.data.data.refreshToken || refreshToken;
        await useAuthStore.getState().updateTokens(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);