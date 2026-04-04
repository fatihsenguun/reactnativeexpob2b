import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../../src/store/useAuthStore';
import CustomInput from '../../src/components/CustomInput';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBuyer, setIsBuyer] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // --- B2B DESIGN SYSTEM RENKLERİ (tailwind.config.js'den birebir alındı) ---
  const themeColor = isBuyer ? '#000666' : '#047857'; // primary vs seller
  const bgColor = isBuyer ? '#f7f9fc' : '#ecfdf5'; // surface vs seller-surface
  const inactiveTextColor = '#767683'; // outline
  const shadowTint = '#191c1e'; // on-surface (DESIGN.md Gölge Kuralı)
  
  const welcomeTitle = isBuyer ? 'Buyer Account' : 'Seller Dashboard';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
        email: email,
        password: password
      });

      if (loginResponse.data.result === true) {
        const { accessToken, refreshToken } = loginResponse.data.data;
        
        const userResponse = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const currentUser = userResponse.data.data; 
        const backendRole = currentUser.role; 

        const requestedRole = isBuyer ? 'ROLE_BUYER' : 'ROLE_SELLER';
        
        if (backendRole === requestedRole || backendRole === 'ROLE_ADMIN') {
          await login(accessToken, refreshToken, requestedRole);
          router.replace(requestedRole === 'ROLE_SELLER' ? '/(seller)/dashboard' : '/(buyer)/home');
        } else {
          Alert.alert("Access Denied", `Your account does not have privileges.`);
        }
      } else {
        Alert.alert("Login Failed", loginResponse.data.errorMessage || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  };

  // DESIGN.md: "Ambient Shadow" Kuralına uygun sekme stili
  const activeTabStyle = {
    backgroundColor: '#ffffff', // surface-container-lowest
    elevation: 2,
    shadowColor: shadowTint, 
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1"
      style={{ backgroundColor: bgColor }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-12">
        
        <View className="items-center justify-center mb-10">
          <Image 
            source={require('../../src/assets/logo1.png')} 
            className="w-32 h-32" 
            resizeMode="contain" 
          />
        </View>

        <View className="mb-8 items-center text-center">
          <Text 
            className="text-3xl font-bold mb-2"
            style={{ color: themeColor }}
          >
            {welcomeTitle}
          </Text>
          <Text className="text-on-secondary-container font-medium text-center">
            Please enter your credentials to continue
          </Text>
        </View>

        <View className="bg-surface-container-low p-1 rounded-xl flex-row mb-8">
          <Pressable 
            onPress={() => setIsBuyer(true)}
            className="flex-1 py-3 px-4 rounded-lg items-center active:opacity-80"
            style={isBuyer ? activeTabStyle : {}}
          >
            <Text className="text-sm font-bold" style={{ color: isBuyer ? themeColor : inactiveTextColor }}>
              Buyer Account
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setIsBuyer(false)}
            className="flex-1 py-3 px-4 rounded-lg items-center active:opacity-80"
            style={!isBuyer ? activeTabStyle : {}}
          >
            <Text className="text-sm font-bold" style={{ color: !isBuyer ? themeColor : inactiveTextColor }}>
              Seller Portal
            </Text>
          </Pressable>
        </View>

        <View className="space-y-6">
          <CustomInput
            label="Corporate Email"
            iconName="mail"
            placeholder="name@company.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            iconName="lock"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIconName={showPassword ? "visibility-off" : "visibility"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            rightLabel="Forgot?"
            onRightLabelPress={() => console.log('Forgot password tapped')}
          />

          <Pressable 
            className="flex-row items-center gap-3 py-2 mt-2 active:opacity-80"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <MaterialIcons 
              name={rememberMe ? "check-box" : "check-box-outline-blank"} 
              size={22} 
              color={rememberMe ? themeColor : "#c6c5d4"} 
            />
            <Text className="text-sm font-medium text-on-surface-variant">
              Remember this device for 30 days
            </Text>
          </Pressable>

          <Pressable 
            className="w-full py-4 rounded-xl mt-4 items-center justify-center active:opacity-80"
            style={{ 
              backgroundColor: themeColor, 
              shadowColor: shadowTint, // DESIGN.md kuralı
              shadowOpacity: 0.06, 
              shadowRadius: 32, 
              shadowOffset: { width: 0, height: 8 }, 
              elevation: 4 
            }}
            onPress={handleLogin}
          >
             <Text className="text-white font-bold text-base">Secure Login</Text>
          </Pressable>

        </View>

        <View className="mt-10 pt-8 border-t border-surface-container-high items-center">
          <Text className="text-outline font-medium mb-4">New to B2B?</Text>
          
          <View className="flex-col w-full gap-3">
            <Pressable 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest active:opacity-80"
              onPress={() => router.push('/(auth)/register')}
            >
              <MaterialIcons name="shopping-bag" size={18} color="#000666" />
              <Text className="font-bold text-sm" style={{ color: '#000666' }}>Register as a Buyer</Text>
            </Pressable>            
            <Pressable 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest active:opacity-80"
              onPress={() => router.push('/(auth)/register')}
            >
              <MaterialIcons name="store" size={18} color="#047857" />
              <Text className="font-bold text-sm" style={{ color: '#047857' }}>Register as a Seller</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}