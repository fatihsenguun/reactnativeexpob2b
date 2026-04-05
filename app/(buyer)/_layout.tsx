import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, View, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function BuyerHeader() {
  const insets = useSafeAreaInsets(); 

  return (
    <View 
      className="flex-row items-center justify-between px-6 pb-3 bg-buyer-surface-container-lowest border-b border-buyer-outline-variant/30 z-50"
      style={{ paddingTop: insets.top + 12 }} 
    >
      <View className="flex-row items-center gap-3">
        <Pressable className="p-2 -ml-2 rounded-lg active:bg-buyer-surface-container-high transition-colors">
          <MaterialIcons name="menu" size={24} color="#004ac6" />
        </Pressable>
        <Image 
          source={require('../../src/assets/logo1.png')} 
          className="w-10 h-10" 
          resizeMode="contain" 
        />
      </View>
      <View className="flex-row items-center gap-1">
        <Pressable className="p-2 -mr-2 rounded-lg active:bg-buyer-surface-container-high transition-colors">
          <MaterialIcons name="notifications" size={24} color="#004ac6" />
        </Pressable>
      </View>
    </View>
  );
}

export default function BuyerLayout() {
  return (
    <Tabs
      screenOptions={{

        header: () => <BuyerHeader />,
        
        tabBarStyle: {
          backgroundColor: '#ffffff', 
          borderTopColor: 'rgba(195, 198, 215, 0.3)', 
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          position: 'absolute', 
          elevation: 0, 
        },
        tabBarActiveTintColor: '#004ac6', 
        tabBarInactiveTintColor: '#151c27', 
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
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={26} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <MaterialIcons name="request-quote" size={24} color={color} />,
        }} 
      />
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