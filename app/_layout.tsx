import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuthStore } from '../src/store/useAuthStore';

export default function RootLayout() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Sadece Stack ve StatusBar dönüyoruz.
  // Yönlendirme mantığını buraya ASLA koymuyoruz.
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(buyer)" />
        <Stack.Screen name="(seller)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}