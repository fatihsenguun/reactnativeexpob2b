import React, { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../../src/store/useAuthStore';
import CustomInput from '../../src/components/CustomInput';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const { defaultRole } = useLocalSearchParams<{ defaultRole: string }>();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isBuyer, setIsBuyer] = useState(defaultRole === 'ROLE_SELLER' ? false : true); 
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (defaultRole === 'ROLE_SELLER') {
      setIsBuyer(false);
    } else if (defaultRole === 'ROLE_BUYER') {
      setIsBuyer(true);
    }
  }, [defaultRole]);

  const bgClass = isBuyer ? 'bg-buyer-surface' : 'bg-seller-surface';
  const tabContainerBg = isBuyer ? 'bg-buyer-surface-container-low' : 'bg-seller-surface-container-low';
  const buttonBg = isBuyer ? 'bg-buyer-primary' : 'bg-seller-primary';
  const textPrimaryClass = isBuyer ? 'text-buyer-primary' : 'text-seller-primary';
  
  const primaryHex = isBuyer ? '#004ac6' : '#3525cd'; 
  const inactiveHex = isBuyer ? '#c3c6d7' : '#c7c4d8'; 
  const shadowTint = isBuyer ? '#151c27' : '#131b2e'; 
  
  const welcomeTitle = isBuyer ? 'Join as a Buyer' : 'Partner with Us';

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (!agreeTerms) {
      Alert.alert("Terms Required", "You must agree to the Terms of Service to continue.");
      return;
    }

    const selectedRole = isBuyer ? 'ROLE_BUYER' : 'ROLE_SELLER';

    try {
      const response = await axios.post(`${API_URL}/register`, {
        fullName: fullName,
        email: email,
        password: password,
        role: selectedRole
      });

      if (response.data && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;
        
        await login(accessToken, refreshToken, selectedRole as any);
        
        if (selectedRole === 'ROLE_SELLER') {
          router.replace('/(seller)/dashboard');
        } else {
          router.replace('/(buyer)/home');
        }
      } else {
        Alert.alert("Registration Failed", response.data?.errorMessage || "An error occurred.");
      }
    } catch (error: any) {
      console.error("Register error:", error);
      const errorMsg = error.response?.data?.errorMessage || "Could not connect to the server.";
      Alert.alert("Error", errorMsg);
    }
  };

  const activeTabStyle = {
    elevation: 2,
    shadowColor: shadowTint, 
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className={`flex-1 ${bgClass}`}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-12">
        
        <View className="items-center justify-center mb-10 mt-4">
          <Image 
            source={require('../../src/assets/logo1.png')} 
            className="w-32 h-32" 
            resizeMode="contain" 
          />
        </View>

        <View className="mb-8 items-center text-center">
          <Text className={`text-3xl font-bold mb-2 ${textPrimaryClass}`}>
            {welcomeTitle}
          </Text>
          <Text className="text-sm font-medium text-center text-slate-500">
            Create your account to access the platform
          </Text>
        </View>

        <View className={`p-1 rounded-xl flex-row mb-8 ${tabContainerBg}`}>
          <Pressable 
            onPress={() => setIsBuyer(true)}
            className={`flex-1 py-3 px-4 rounded-lg items-center active:opacity-80 ${isBuyer ? 'bg-white' : ''}`}
            style={isBuyer ? activeTabStyle : {}}
          >
            <Text className={`text-sm font-bold ${isBuyer ? textPrimaryClass : 'text-slate-500'}`}>
              Register as Buyer
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setIsBuyer(false)}
            className={`flex-1 py-3 px-4 rounded-lg items-center active:opacity-80 ${!isBuyer ? 'bg-white' : ''}`}
            style={!isBuyer ? activeTabStyle : {}}
          >
            <Text className={`text-sm font-bold ${!isBuyer ? textPrimaryClass : 'text-slate-500'}`}>
              Apply as Seller
            </Text>
          </Pressable>
        </View>

        <View className="space-y-6">
          <CustomInput
            label="Full Name / Company Name"
            iconName="person"
            placeholder="John Doe or Acme Corp"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

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
            label="Create Password"
            iconName="lock"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIconName={showPassword ? "visibility-off" : "visibility"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Pressable 
            className="flex-row items-center gap-3 py-2 mt-2 active:opacity-80"
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <MaterialIcons 
              name={agreeTerms ? "check-box" : "check-box-outline-blank"} 
              size={22} 
              color={agreeTerms ? primaryHex : inactiveHex} 
            />
            <Text className="text-sm font-medium text-slate-600 flex-1">
              I agree to the <Text className={`font-bold ${textPrimaryClass}`}>Terms of Service</Text> & <Text className={`font-bold ${textPrimaryClass}`}>Privacy Policy</Text>
            </Text>
          </Pressable>

          <Pressable 
            className={`w-full py-4 rounded-xl mt-4 items-center justify-center active:opacity-80 ${buttonBg}`}
            style={{ 
              shadowColor: shadowTint, 
              shadowOpacity: 0.08, 
              shadowRadius: 24, 
              shadowOffset: { width: 0, height: 8 }, 
              elevation: 4 
            }}
            onPress={handleRegister}
          >
             <Text className="text-white font-bold text-base">Create Account</Text>
          </Pressable>

        </View>

        <View className="mt-10 pt-8 border-t border-slate-200/60 items-center">
          <Text className="text-slate-500 font-medium mb-4 text-sm">Already have an account?</Text>
          
          <View className="flex-col w-full gap-3">
            <Pressable 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 bg-white active:opacity-80"
              onPress={() => router.replace('/(auth)/login')}
            >
              <MaterialIcons name="login" size={18} color={primaryHex} />
              <Text className="font-bold text-sm" style={{ color: primaryHex }}>Sign In to Your Account</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}