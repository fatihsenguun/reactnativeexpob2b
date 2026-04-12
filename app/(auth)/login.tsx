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
import { axiosClient } from '../../src/api/axiosClient';
import { useAuthStore } from '../../src/store/useAuthStore';
import CustomInput from '../../src/components/CustomInput';
import { BUYER_COLORS, SELLER_COLORS } from '../../src/style/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBuyer, setIsBuyer] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const bgClass = isBuyer ? 'bg-buyer-surface' : 'bg-seller-surface';
  const tabContainerBg = isBuyer ? 'bg-buyer-surface-container-low' : 'bg-seller-surface-container-low';
  const buttonBg = isBuyer ? 'bg-buyer-primary' : 'bg-seller-primary';
  const textPrimaryClass = isBuyer ? 'text-buyer-primary' : 'text-seller-primary';
  
  const primaryHex = isBuyer ? BUYER_COLORS.primary : SELLER_COLORS.primary; 
  const inactiveHex = isBuyer ? BUYER_COLORS.outlineVariant : SELLER_COLORS.outlineVariant;
  const shadowTint = isBuyer ? BUYER_COLORS.onSurface : SELLER_COLORS.onSurface; 
  const welcomeTitle = isBuyer ? 'Buyer Account' : 'Seller Dashboard';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const loginResponse = await axiosClient.post('/login', {
        email: email,
        password: password
      });

      if (loginResponse.data && loginResponse.data.data) {
        const { accessToken, refreshToken } = loginResponse.data.data;
        
        const userResponse = await axiosClient.get('/me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const currentUser = userResponse.data.data; 
        const backendRole = currentUser.role; 

const proceedToApp = async (role: string) => {
          let sessionRole = role;

          // 1. If a Seller logs in via the Buyer tab, set their active UI session to BUYER
          if (role === 'ROLE_SELLER' && isBuyer) {
            sessionRole = 'ROLE_BUYER';
          } 
          // 2. If a normal Buyer tries to log in via the Seller tab, deny and correct them
          else if (role === 'ROLE_BUYER' && !isBuyer) {
            Alert.alert(
              "Access Denied",
              "You only have a Buyer account. Redirecting you to the Buyer portal.",
              [{ 
                text: "OK", 
                onPress: async () => {
                  await login(accessToken, refreshToken, 'ROLE_BUYER', currentUser);
                  router.replace('/(buyer)/home');
                }
              }]
            );
            return; // Stop execution here so we don't run the code below
          }

          // 3. Save the *Session Role* (not necessarily the backend role) to the phone's memory
          await login(accessToken, refreshToken, sessionRole as any, currentUser);

          // 4. Route based on the Session Role
          if (sessionRole === 'ROLE_SELLER') {
            router.replace('/(seller)/dashboard');
          } else {
            router.replace('/(buyer)/home');
          }
        };

        proceedToApp(backendRole);

      } else {
        Alert.alert("Login Failed", loginResponse.data.errorMessage || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);
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
        
        <View className="items-center justify-center mb-10">
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
            Please enter your credentials to continue
          </Text>
        </View>

        <View className={`p-1 rounded-xl flex-row mb-8 ${tabContainerBg}`}>
          <Pressable 
            onPress={() => setIsBuyer(true)}
            className={`flex-1 py-3 px-4 rounded-lg items-center active:opacity-80 ${isBuyer ? 'bg-white' : ''}`}
            style={isBuyer ? activeTabStyle : {}}
          >
            <Text className={`text-sm font-bold ${isBuyer ? textPrimaryClass : 'text-slate-500'}`}>
              Buyer Account
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setIsBuyer(false)}
            className={`flex-1 py-3 px-4 rounded-lg items-center active:opacity-80 ${!isBuyer ? 'bg-white' : ''}`}
            style={!isBuyer ? activeTabStyle : {}}
          >
            <Text className={`text-sm font-bold ${!isBuyer ? textPrimaryClass : 'text-slate-500'}`}>
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
              color={rememberMe ? primaryHex : inactiveHex} 
            />
            <Text className="text-sm font-medium text-slate-600">
              Remember this device for 30 days
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
            onPress={handleLogin}
          >
             <Text className="text-white font-bold text-base">Secure Login</Text>
          </Pressable>

        </View>

        <View className="mt-10 pt-8 border-t border-slate-200/60 items-center">
          <Text className="text-slate-500 font-medium mb-4 text-sm">New to B2B?</Text>
          
          <View className="w-full">
            <Pressable 
              className="flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 bg-white active:opacity-80"
              onPress={() => router.push({
                pathname: '/(auth)/register',
                params: { defaultRole: isBuyer ? 'ROLE_BUYER' : 'ROLE_SELLER' }
              })}
            >
              <MaterialIcons name="person-add" size={18} color={primaryHex} />
              <Text className={`font-bold text-sm ${textPrimaryClass}`}>Create an Account</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}