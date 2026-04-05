import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function BuyerLayout() {
  return (
    <Tabs
      screenOptions={{
        // Hide the default header because we built a custom one in the home screen
        headerShown: false, 
        
        // --- BOTTOM BAR STYLING ---
        tabBarStyle: {
          backgroundColor: '#ffffff', // bg-buyer-surface-container-lowest
          borderTopColor: 'rgba(195, 198, 215, 0.3)', // border-buyer-outline-variant/30
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 70, // Taller on iOS for the home indicator
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          position: 'absolute', // Makes it float over the background
          elevation: 0, // Removes default Android shadow
        },
        tabBarActiveTintColor: '#004ac6', // text-buyer-primary
        tabBarInactiveTintColor: '#151c27', // text-buyer-on-surface
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
      {/* 1. HOME SCREEN */}
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name="home" 
              size={26} 
              color={color} 
            />
          ),
        }} 
      />

      {/* 2. SEARCH SCREEN (Create this file later: app/(buyer)/search.tsx) */}
      <Tabs.Screen 
        name="search" 
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={24} color={color} />
          ),
        }} 
      />

      {/* 3. ORDERS SCREEN (Create this file later: app/(buyer)/orders.tsx) */}
      <Tabs.Screen 
        name="orders" 
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="request-quote" size={24} color={color} />
          ),
        }} 
      />

      {/* 4. PROFILE SCREEN (Create this file later: app/(buyer)/profile.tsx) */}
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}