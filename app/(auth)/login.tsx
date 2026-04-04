import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  Image // <-- Added Image import here
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../../src/store/useAuthStore';
import CustomInput from '@/src/components/CustomInput';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBuyer, setIsBuyer] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const loginResponse = await axios.post('http://10.0.2.2:8080/api/auth/login', {
        email: email,
        password: password
      });

      if (loginResponse.data.result === true) {
        const { accessToken, refreshToken } = loginResponse.data.data;
        
        const userResponse = await axios.get('http://10.0.2.2:8080/api/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const currentUser = userResponse.data.data; 
        const backendRole = currentUser.role; 

        const requestedRole = isBuyer ? 'ROLE_BUYER' : 'ROLE_SELLER';
        
        if (backendRole === requestedRole || backendRole === 'ROLE_ADMIN') {
          await login(accessToken, refreshToken, requestedRole);
        } else {
          Alert.alert(
            "Access Denied", 
            `Your account does not have ${isBuyer ? 'Buyer' : 'Seller'} privileges.`
          );
        }
      } else {
        Alert.alert("Login Failed", loginResponse.data.errorMessage || "Invalid credentials");
      }
      
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Could not connect to the server. Please check your network.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-surface"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-12">
        
        {/* Custom Asset Branding Header */}
        <View className="items-center justify-center mb-10">
          <Image 
            // Make sure the image is named logo1.png and placed in your assets/images folder!
            source={require('../../src/assets/logo1.png')} 
            className="w-32 h-32" 
            resizeMode="contain" 
          />
        </View>

        {/* Welcome Text */}
        <View className="mb-8 items-center text-center">
          <Text className="text-3xl font-bold text-primary mb-2">Welcome Back</Text>
          <Text className="text-on-secondary-container font-medium text-center">
            Please enter your credentials to continue
          </Text>
        </View>

        {/* Role Switcher */}
        <View className="bg-surface-container-low p-1 rounded-xl flex-row mb-8">
          <TouchableOpacity 
            onPress={() => setIsBuyer(true)}
            className={`flex-1 py-3 px-4 rounded-lg items-center transition-all ${isBuyer ? 'bg-surface-container-lowest shadow-sm' : ''}`}
            activeOpacity={0.8}
          >
            <Text className={`text-sm font-bold ${isBuyer ? 'text-primary' : 'text-outline'}`}>
              Buyer Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setIsBuyer(false)}
            className={`flex-1 py-3 px-4 rounded-lg items-center transition-all ${!isBuyer ? 'bg-surface-container-lowest shadow-sm' : ''}`}
            activeOpacity={0.8}
          >
            <Text className={`text-sm font-bold ${!isBuyer ? 'text-primary' : 'text-outline'}`}>
              Seller Portal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
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

          {/* Remember Me */}
          <TouchableOpacity 
            className="flex-row items-center gap-3 py-2 mt-2"
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name={rememberMe ? "check-box" : "check-box-outline-blank"} 
              size={22} 
              color={rememberMe ? "#000666" : "#c6c5d4"} 
            />
            <Text className="text-sm font-medium text-on-surface-variant">
              Remember this device for 30 days
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity 
            className="w-full py-4 bg-primary rounded-xl mt-4 items-center justify-center shadow-md shadow-primary/20"
            activeOpacity={0.8}
            onPress={handleLogin}
          >
             <Text className="text-white font-bold text-base">Secure Login</Text>
          </TouchableOpacity>

        </View>

        {/* Footer Registration Links */}
        <View className="mt-10 pt-8 border-t border-surface-container-high items-center">
          <Text className="text-outline font-medium mb-4">New to B2B?</Text>
          
          <View className="flex-col w-full gap-3">
            <TouchableOpacity 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
              onPress={() => router.replace('/(auth)/register')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="shopping-bag" size={18} color="#000666" />
              <Text className="font-bold text-sm text-primary">Register as a Buyer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest"
              onPress={() => router.replace('/(auth)/register')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="store" size={18} color="#000666" />
              <Text className="font-bold text-sm text-primary">Register as a Seller</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}