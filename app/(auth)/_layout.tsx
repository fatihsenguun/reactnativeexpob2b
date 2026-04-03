import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerTintColor: '#520000', // Your brand color for the back buttons
      headerShadowVisible: false
    }}>
      {/* Login is the first screen, hide its header to make it look like a splash/auth screen */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      
      {/* Register screen will have a back button to go back to login */}
      <Stack.Screen name="register" options={{ title: 'Create Account' }} />
    </Stack>
  );
}