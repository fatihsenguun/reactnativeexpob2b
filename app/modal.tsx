import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-surface p-5">
      <Text className="text-2xl font-extrabold text-primary mb-2">
        This is a modal
      </Text>
      
      <Link href="../" className="mt-4 py-4">
        <Text className="text-base font-bold text-blue-600 hover:underline">
          Go back
        </Text>
      </Link>
    </View>
  );
}