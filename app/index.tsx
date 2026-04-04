import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { accessToken, userRole, isLoading } = useAuthStore();


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface">
        <ActivityIndicator size="large" color="#000666" />
      </View>
    );
  }


  if (!accessToken) {
    return <Redirect href="/(auth)/login" />;
  }


  if (userRole === 'ROLE_SELLER') {
    return <Redirect href="/(seller)/dashboard" />;
  }

  return <Redirect href="/(buyer)/home" />;
}