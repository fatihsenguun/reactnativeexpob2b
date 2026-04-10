import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, View, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tailwind config dosyasındaki SELLER renkleri
const SELLER_COLORS = {
  primary: "#3525cd",
  primaryContainer: "#4f46e5",
  onPrimary: "#ffffff",
  secondary: "#58579b",
  secondaryContainer: "#b6b4ff",
  onSecondaryContainer: "#454386",
  tertiary: "#7e3000",
  tertiaryContainer: "#a44100",
  background: "#faf8ff",
  surface: "#faf8ff",
  surfaceBright: "#faf8ff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f2f3ff",
  surfaceContainer: "#eaedff",
  surfaceContainerHigh: "#e2e7ff",
  surfaceContainerHighest: "#dae2fd",
  onSurface: "#131b2e",
  onSurfaceVariant: "#464555",
  outline: "#777587",
  outlineVariant: "#c7c4d8",
};

// 1. SATICI İÇİN ÖZEL HEADER (Custom Seller Header)
function SellerHeader() {
  const insets = useSafeAreaInsets(); 

  return (
    <View 
      className="flex-row items-center justify-between px-6 pb-3 bg-seller-surface-container-lowest border-b border-seller-outline-variant/30 z-50"
      style={{ paddingTop: insets.top + 12 }} 
    >
      <View className="flex-row items-center gap-3">
        <Pressable className="p-2 -ml-2 rounded-lg active:bg-seller-surface-container-high transition-colors">
          <MaterialIcons name="menu" size={24} color={SELLER_COLORS.primary} />
        </Pressable>
        <Image 
          source={require('../../src/assets/logo1.png')} 
          className="w-10 h-10" 
          resizeMode="contain" 
        />
      </View>
      <View className="flex-row items-center gap-1">
        <Pressable className="p-2 -mr-2 rounded-lg active:bg-seller-surface-container-high transition-colors">
          <MaterialIcons name="notifications" size={24} color={SELLER_COLORS.primary} />
        </Pressable>
      </View>
    </View>
  );
}

// 2. SATICI ANA LAYOUT (Bottom Tabs)
export default function SellerLayout() {
  return (
    <Tabs
      screenOptions={{
        // Özel Header'ımızı devreye sokuyoruz
        header: () => <SellerHeader />,
        
        tabBarStyle: {
          backgroundColor: '#ffffff', 
          borderTopColor: 'rgba(199, 196, 216, 0.3)', // seller-outline-variant renginin rgba hali
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          position: 'absolute', 
          elevation: 0, 
        },
        tabBarActiveTintColor: SELLER_COLORS.primary, // Satıcı ana rengi (İndigo)
        tabBarInactiveTintColor: SELLER_COLORS.onSurface, // Satıcı pasif ikon rengi
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 10,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginTop: 4,
        },
      }}
    >
      {/* 1. DASHBOARD SEKMESİ (Satıcı Anasayfası) */}
      <Tabs.Screen 
        name="dashboard" 
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
        }} 
      />

      {/* 2. INVENTORY SEKMESİ (Stok Yönetimi) */}
      <Tabs.Screen 
        name="inventory" 
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <MaterialIcons name="inventory-2" size={24} color={color} />,
        }} 
      />

      {/* 3. ORDERS SEKMESİ (Siparişler) */}
      <Tabs.Screen 
        name="orders" 
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={24} color={color} />,
        }} 
      />

      {/* 4. PROFILE SEKMESİ (Hesap Yönetimi ve Çıkış) */}
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />,
        }} 
      />
    </Tabs>
  );
}