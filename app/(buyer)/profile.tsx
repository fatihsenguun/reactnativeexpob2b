import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function BuyerProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  // DESIGN.md: Ambient Shadow
  const ambientShadow = {
    elevation: 2,
    shadowColor: '#151c27', 
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. PROFILE HEADER CARD (Asymmetric Bento Style) */}
        <View 
          className="bg-buyer-surface-container-lowest p-6 rounded-2xl flex-row items-center gap-5 mb-6 border border-buyer-outline-variant/10 overflow-hidden"
          style={ambientShadow}
        >
          {/* Decorative Blur Background (Simulated) */}
          <View className="absolute -right-10 -top-10 w-32 h-32 bg-buyer-primary/10 rounded-full blur-3xl" />
          
          <View className="w-20 h-20 rounded-xl bg-buyer-surface-container-highest border-2 border-white shadow-sm overflow-hidden z-10">
            <Image 
              source={{ uri: 'https://picsum.photos/id/1005/200/200' }} 
              className="w-full h-full" 
            />
          </View>
          
          <View className="flex-1 z-10">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-2xl font-extrabold text-buyer-on-surface">Ahmet Yılmaz</Text>
            </View>
            <View className="flex-row items-center bg-buyer-secondary-container self-start px-2 py-0.5 rounded mb-2">
              <MaterialIcons name="verified" size={12} color="#394c84" />
              <Text className="text-[10px] font-bold text-buyer-on-secondary-container uppercase ml-1">Verified Buyer</Text>
            </View>
            
            <Text className="text-buyer-primary font-bold text-base mb-3">Global Trade Ltd.</Text>
            
            <View className="flex-row justify-between pr-4">
              <View>
                <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-widest mb-0.5">Account Role</Text>
                <Text className="text-xs font-semibold text-buyer-on-surface-variant">Snr. Procurement</Text>
              </View>
              <View>
                <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-widest mb-0.5">Since</Text>
                <Text className="text-xs font-semibold text-buyer-on-surface-variant">Jan 2021</Text>
              </View>
            </View>
          </View>
        </View>



        {/* 4. INTELLIGENCE RAIL (Report Generation) */}
        <View className="bg-buyer-surface-container-high rounded-2xl p-6 mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 pr-4">
            <View className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MaterialIcons name="receipt-long" size={20} color="#943700" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-buyer-on-surface">Need your records?</Text>
              <Text className="text-[10px] text-buyer-on-surface-variant mt-0.5">Download full trade history.</Text>
            </View>
          </View>
          <Pressable className="bg-buyer-primary px-4 py-2.5 rounded-lg active:scale-95 transition-transform">
            <Text className="text-white text-xs font-bold">Generate</Text>
          </Pressable>
        </View>

        {/* 5. QUICK ACCESS & SETTINGS */}
        <View className="bg-buyer-surface-container-lowest rounded-2xl border border-buyer-outline-variant/10 overflow-hidden mb-6" style={ambientShadow}>
          <View className="p-5 border-b border-buyer-outline-variant/10">
            <Text className="text-base font-bold text-buyer-on-surface">Quick Access</Text>
          </View>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-buyer-outline-variant/10 active:bg-buyer-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="import-contacts" size={20} color="#737686" />
              <Text className="text-sm font-medium text-buyer-on-surface">Address Book</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#c3c6d7" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-buyer-outline-variant/10 active:bg-buyer-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="credit-card" size={20} color="#737686" />
              <Text className="text-sm font-medium text-buyer-on-surface">Payment Methods</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#c3c6d7" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-buyer-outline-variant/10 active:bg-buyer-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="task" size={20} color="#737686" />
              <Text className="text-sm font-medium text-buyer-on-surface">Verification Docs</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="bg-buyer-secondary-container px-2 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-buyer-on-secondary-container uppercase">2 New</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#c3c6d7" />
            </View>
          </Pressable>

          {/* LOGOUT BUTTON */}
          <Pressable 
            onPress={handleLogout}
            className="flex-row items-center gap-4 p-4 active:bg-error-container/30"
          >
            <MaterialIcons name="logout" size={20} color="#ba1a1a" />
            <Text className="text-sm font-bold text-error">Logout Session</Text>
          </Pressable>

        </View>

      </ScrollView>
    </View>
  );
}