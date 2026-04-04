import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter(); // <-- Add this
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Join B2B</Text>
        
        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.primaryButton} onPress={() => console.log('Register clicked')}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>

        {/* NEW BUTTON: Replaces the screen back to Login */}
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  formContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 50 },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 30 },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#520000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  // Add this to match the login screen styling
  secondaryButton: { marginTop: 20, alignItems: 'center' },
  secondaryButtonText: { color: '#520000', fontSize: 14, fontWeight: '600' },
});