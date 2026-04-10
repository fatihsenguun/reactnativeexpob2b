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


const SELLER_COLORS = {
  primary: "#3525cd",
  onSecondaryContainer: "#454386",
  onSurface: "#131b2e",
  outline: "#777587",
  outlineVariant: "#c7c4d8",
};

const SYSTEM_COLORS = {
  error: "#ba1a1a",               
};

export default function SellerProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  // DESIGN.md: Ambient Shadow for Seller
  const ambientShadow = {
    elevation: 2,
    shadowColor: SELLER_COLORS.onSurface, 
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <View className="flex-1 bg-seller-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. PROFILE HEADER CARD (Asymmetric Bento Style) */}
        <View 
          className="bg-seller-surface-container-lowest p-6 rounded-2xl flex-row items-center gap-5 mb-6 border border-seller-outline-variant/10 overflow-hidden"
          style={ambientShadow}
        >
          {/* Decorative Blur Background (Simulated) */}
          <View className="absolute -right-10 -top-10 w-32 h-32 bg-seller-primary/10 rounded-full blur-3xl" />
          
          <View className="w-20 h-20 rounded-xl bg-seller-surface-container-highest border-2 border-white shadow-sm overflow-hidden z-10">
            <Image 
              source={{ uri: 'https://picsum.photos/id/1062/200/200' }} 
              className="w-full h-full" 
            />
          </View>
          
          <View className="flex-1 z-10">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-2xl font-extrabold text-seller-on-surface">Acme Corp</Text>
            </View>
            <View className="flex-row items-center bg-seller-secondary-container self-start px-2 py-0.5 rounded mb-2">
              <MaterialIcons name="verified" size={12} color={SELLER_COLORS.onSecondaryContainer} />
              <Text className="text-[10px] font-bold text-seller-on-secondary-container uppercase ml-1">Verified Seller</Text>
            </View>
            
            <Text className="text-seller-primary font-bold text-base mb-3">Enterprise Wholesale</Text>
            
            <View className="flex-row justify-between pr-4">
              <View>
                <Text className="text-[9px] text-seller-outline font-bold uppercase tracking-widest mb-0.5">Account Role</Text>
                <Text className="text-xs font-semibold text-seller-on-surface-variant">Store Admin</Text>
              </View>
              <View>
                <Text className="text-[9px] text-seller-outline font-bold uppercase tracking-widest mb-0.5">Since</Text>
                <Text className="text-xs font-semibold text-seller-on-surface-variant">Nov 2023</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. INTELLIGENCE RAIL (Report Generation) */}
        <View className="bg-seller-surface-container-high rounded-2xl p-6 mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 pr-4">
            <View className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <MaterialIcons name="analytics" size={20} color={SELLER_COLORS.primary} />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-seller-on-surface">Need sales records?</Text>
              <Text className="text-[10px] text-seller-on-surface-variant mt-0.5">Download full transaction history.</Text>
            </View>
          </View>
          <Pressable className="bg-seller-primary px-4 py-2.5 rounded-lg active:scale-95 transition-transform">
            <Text className="text-white text-xs font-bold">Generate</Text>
          </Pressable>
        </View>

        {/* 3. QUICK ACCESS & SETTINGS */}
        <View className="bg-seller-surface-container-lowest rounded-2xl border border-seller-outline-variant/10 overflow-hidden mb-6" style={ambientShadow}>
          <View className="p-5 border-b border-seller-outline-variant/10">
            <Text className="text-base font-bold text-seller-on-surface">Store Management</Text>
          </View>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-seller-outline-variant/10 active:bg-seller-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="store" size={20} color={SELLER_COLORS.outline} />
              <Text className="text-sm font-medium text-seller-on-surface">Store Profile</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={SELLER_COLORS.outlineVariant} />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-seller-outline-variant/10 active:bg-seller-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="account-balance" size={20} color={SELLER_COLORS.outline} />
              <Text className="text-sm font-medium text-seller-on-surface">Payout Methods</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={SELLER_COLORS.outlineVariant} />
          </Pressable>

          <Pressable className="flex-row items-center justify-between p-4 border-b border-seller-outline-variant/10 active:bg-seller-surface-container-low">
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="admin-panel-settings" size={20} color={SELLER_COLORS.outline} />
              <Text className="text-sm font-medium text-seller-on-surface">Verification & Compliance</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="bg-seller-tertiary-container px-2 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-seller-on-tertiary-container uppercase">Action Req</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={SELLER_COLORS.outlineVariant} />
            </View>
          </Pressable>

          {/* LOGOUT BUTTON */}
          <Pressable 
            onPress={handleLogout}
            className="flex-row items-center gap-4 p-4 active:bg-error-container/30"
          >
            <MaterialIcons name="logout" size={20} color={SYSTEM_COLORS.error} />
            <Text className="text-sm font-bold text-error">Logout Session</Text>
          </Pressable>

        </View>

      </ScrollView>
    </View>
  );
}