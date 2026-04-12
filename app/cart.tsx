import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../src/store/useCartStore';
import { useOrderStore } from '../src/store/useOrderStore';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  
  // States for the One-Page Checkout
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'credit_line' | 'card'>('bank');
  const [selectedAddress, setSelectedAddress] = useState<'primary' | 'warehouse'>('primary');

  // Dynamic Calculations
  const subtotal = getCartTotal();
  const shippingCost = shippingMethod === 'express' ? 450.00 : 125.00;
  const tax = subtotal * 0.15; // 15% Estimated Tax
  const totalAmount = subtotal + shippingCost + tax;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    
    const orderData = {
      items: items.map(item => ({
        productId: item.id,
        quantity: item.cartQuantity
      }))
    };

    const success = await createOrder(orderData);
    setIsSubmitting(false);

    if (success) {
      clearCart();
      Alert.alert("Success!", "Your B2B order has been placed securely.", [
        { text: "View Orders", onPress: () => router.replace('/(buyer)/orders') }
      ]);
    } else {
      Alert.alert("Checkout Failed", "Could not complete your order. Please try again.");
    }
  };

  // EMPTY CART STATE
  if (items.length === 0) {
    return (
      <View className="flex-1 bg-buyer-surface" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center px-4 py-3 border-b border-buyer-outline-variant/20">
          <Pressable onPress={() => router.back()} className="p-2">
            <MaterialIcons name="close" size={24} color="#151c27" />
          </Pressable>
          <Text className="font-bold text-base text-buyer-on-surface ml-2">Checkout</Text>
        </View>
        <View className="flex-1 items-center justify-center p-6">
          <MaterialIcons name="remove-shopping-cart" size={64} color="#c3c6d7" />
          <Text className="text-lg font-bold text-buyer-on-surface mt-4">Your cart is empty</Text>
          <Pressable onPress={() => router.back()} className="mt-6 bg-buyer-primary px-6 py-3 rounded-xl active:scale-95">
            <Text className="text-white font-bold">Browse Products</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-buyer-surface">
      {/* HEADER */}
      <View 
        className="flex-row items-center justify-between px-6 pb-4 bg-white/90 z-50 border-b border-buyer-outline-variant/30"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.back()} className="active:scale-95 p-1 rounded-full bg-buyer-surface-container-low">
            <MaterialIcons name="arrow-back" size={22} color="#004ac6" />
          </Pressable>
          <Text className="font-bold text-lg text-buyer-on-surface">Checkout</Text>
        </View>
        
        <Image 
          source={require('../src/assets/logo1.png')} 
          className="w-10 h-10" 
          resizeMode="contain" 
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        
        {/* 1. CART ITEMS SECTION */}
        <View className="px-4 pt-6 pb-2 flex-row justify-between items-end">
          <View>
            <Text className="text-2xl font-extrabold text-buyer-on-surface tracking-tight">Your Cart</Text>
            <Text className="text-sm text-buyer-on-surface-variant mt-1">{items.length} Wholesale items ready</Text>
          </View>
          <Text className="text-buyer-primary font-bold text-sm bg-buyer-primary-container/20 px-2 py-1 rounded">ID: WH-{Math.floor(Math.random() * 90000) + 10000}</Text>
        </View>

        <View className="px-4 space-y-4 mb-8">
          {items.map((item) => (
            <View key={item.id} className="bg-buyer-surface-container-lowest rounded-xl p-4 border border-buyer-outline-variant/20 shadow-sm shadow-black/5">
              <View className="flex-row gap-4">
                <View className="w-24 h-24 rounded-lg overflow-hidden bg-buyer-surface-container-low">
                  <Image source={{ uri: `https://picsum.photos/seed/${item.id}/200/200` }} className="w-full h-full" />
                </View>
                <View className="flex-1 justify-between">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 pr-2">
                      <Text className="text-[10px] font-bold text-buyer-primary uppercase tracking-widest">{item.categoryName || 'Industrial'}</Text>
                      <Text className="text-base font-bold text-buyer-on-surface mt-0.5" numberOfLines={2}>{item.name}</Text>
                      <Text className="text-xs text-buyer-on-surface-variant mt-1">Seller: <Text className="font-medium text-buyer-secondary">{item.shopName}</Text></Text>
                    </View>
                    <Pressable onPress={() => removeFromCart(item.id)} className="p-1 active:opacity-60">
                      <MaterialIcons name="delete" size={22} color="#ba1a1a" />
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* Volume Pricing Banner */}
              <View className="bg-buyer-primary-container/10 rounded-lg p-3 mt-4 border-l-4 border-buyer-primary">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="info" size={14} color="#004ac6" />
                    <Text className="text-xs font-bold text-buyer-primary">Volume Rate Locked</Text>
                  </View>
                  <Text className="text-sm font-bold text-buyer-primary">${item.lockedPrice.toFixed(2)} <Text className="text-[10px] font-normal text-buyer-on-surface-variant">/ unit</Text></Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-buyer-outline-variant/10">
                <View className="flex-row items-center bg-buyer-surface-container rounded-lg p-1">
                  
                  {/* MINUS BUTTON */}
                  <Pressable 
                    onPress={() => updateQuantity(item.id, Math.max(1, item.cartQuantity - 1))} 
                    className="w-8 h-8 items-center justify-center bg-white rounded shadow-sm active:scale-90"
                  >
                    <MaterialIcons name="remove" size={16} color="#004ac6" />
                  </Pressable>
                  
                  {/* QUANTITY DISPLAY WITH MAX STOCK WARNING */}
                  <View className="items-center w-16 relative justify-center">
                    <Text className="text-center font-bold text-buyer-on-surface">{item.cartQuantity}</Text>
                    {item.cartQuantity >= item.stock && (
                       <Text className="text-[8px] text-error font-bold uppercase absolute -bottom-3.5">Max Stock</Text>
                    )}
                  </View>

                  {/* PLUS BUTTON (PROTECTED BY STOCK) */}
                  <Pressable 
                    onPress={() => {
                      if (item.cartQuantity < item.stock) {
                        updateQuantity(item.id, Math.min(item.stock, item.cartQuantity + 1));
                      } else {
                        Alert.alert("Stock Limit Reached", `You cannot add more than ${item.stock} units of this item.`);
                      }
                    }} 
                    className={`w-8 h-8 items-center justify-center rounded shadow-sm active:scale-90 ${item.cartQuantity >= item.stock ? 'bg-buyer-surface-container-low opacity-50' : 'bg-white'}`}
                    disabled={item.cartQuantity >= item.stock}
                  >
                    <MaterialIcons name="add" size={16} color={item.cartQuantity >= item.stock ? "#737686" : "#004ac6"} />
                  </Pressable>

                </View>
                <Text className="text-lg font-black text-buyer-on-surface">${(item.lockedPrice * item.cartQuantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 2. DELIVERY ADDRESS SECTION */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-xl font-bold tracking-tight text-buyer-on-surface">Delivery address</Text>
            <Text className="text-buyer-primary font-bold text-sm">Add New</Text>
          </View>
          <View className="flex-row gap-4">
            <Pressable 
              onPress={() => setSelectedAddress('primary')}
              className={`flex-1 p-5 rounded-xl border-2 shadow-sm ${selectedAddress === 'primary' ? 'bg-buyer-surface-container-lowest border-buyer-primary' : 'bg-buyer-surface-container-low border-transparent'}`}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="bg-buyer-primary-container/20 px-2 py-1 rounded">
                  <Text className="text-[9px] font-bold text-buyer-primary uppercase tracking-wider">Primary</Text>
                </View>
                {selectedAddress === 'primary' && <MaterialIcons name="check-circle" size={18} color="#004ac6" />}
              </View>
              <Text className="font-bold text-buyer-on-surface mb-1 text-sm">Global Logistics Center</Text>
              <Text className="text-xs text-buyer-on-surface-variant leading-relaxed">4422 Industrial Way{'\n'}San Francisco, CA</Text>
            </Pressable>

            <Pressable 
              onPress={() => setSelectedAddress('warehouse')}
              className={`flex-1 p-5 rounded-xl border-2 shadow-sm ${selectedAddress === 'warehouse' ? 'bg-buyer-surface-container-lowest border-buyer-primary' : 'bg-buyer-surface-container-low border-transparent'}`}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="bg-buyer-surface-container-highest px-2 py-1 rounded">
                  <Text className="text-[9px] font-bold text-buyer-on-surface-variant uppercase tracking-wider">Warehouse B</Text>
                </View>
                {selectedAddress === 'warehouse' && <MaterialIcons name="check-circle" size={18} color="#004ac6" />}
              </View>
              <Text className="font-bold text-buyer-on-surface mb-1 text-sm">East Coast Dist.</Text>
              <Text className="text-xs text-buyer-on-surface-variant leading-relaxed">890 Harbor Drive{'\n'}Jersey City, NJ</Text>
            </Pressable>
          </View>
        </View>

        {/* 3. SHIPPING METHOD SECTION */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold tracking-tight text-buyer-on-surface mb-4">Shipping method</Text>
          <View className="bg-buyer-surface-container-low p-2 rounded-2xl">
            <Pressable onPress={() => setShippingMethod('express')} className={`p-4 rounded-xl flex-row justify-between items-center mb-2 ${shippingMethod === 'express' ? 'bg-white shadow-sm' : ''}`}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name={shippingMethod === 'express' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color={shippingMethod === 'express' ? '#004ac6' : '#737686'} />
                <View>
                  <Text className="font-bold text-buyer-on-surface">Express Cargo</Text>
                  <Text className="text-xs text-buyer-on-surface-variant mt-0.5">2-3 Business Days</Text>
                </View>
              </View>
              <Text className={`font-bold ${shippingMethod === 'express' ? 'text-buyer-primary' : 'text-buyer-on-surface'}`}>$450.00</Text>
            </Pressable>
            
            <Pressable onPress={() => setShippingMethod('standard')} className={`p-4 rounded-xl flex-row justify-between items-center ${shippingMethod === 'standard' ? 'bg-white shadow-sm' : ''}`}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name={shippingMethod === 'standard' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color={shippingMethod === 'standard' ? '#004ac6' : '#737686'} />
                <View>
                  <Text className="font-bold text-buyer-on-surface">Standard Sea Freight</Text>
                  <Text className="text-xs text-buyer-on-surface-variant mt-0.5">15-20 Business Days</Text>
                </View>
              </View>
              <Text className={`font-bold ${shippingMethod === 'standard' ? 'text-buyer-primary' : 'text-buyer-on-surface'}`}>$125.00</Text>
            </Pressable>
          </View>
        </View>

        {/* 4. PAYMENT METHOD SECTION */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold tracking-tight text-buyer-on-surface mb-4">Payment method</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible pr-4" contentContainerStyle={{ gap: 12 }}>
            
            <Pressable onPress={() => setPaymentMethod('bank')} className={`w-36 p-5 rounded-xl border-2 items-center justify-center relative overflow-hidden ${paymentMethod === 'bank' ? 'bg-buyer-surface-container-lowest border-buyer-primary' : 'bg-buyer-surface-container-low border-transparent'}`}>
              <View className="absolute top-0 right-0 bg-buyer-primary px-2 py-1 rounded-bl-lg">
                <Text className="text-[8px] font-bold text-white uppercase">Recommended</Text>
              </View>
              <MaterialIcons name="account-balance" size={28} color={paymentMethod === 'bank' ? '#004ac6' : '#737686'} />
              <Text className={`text-sm font-bold mt-3 text-center ${paymentMethod === 'bank' ? 'text-buyer-on-surface' : 'text-buyer-on-surface-variant'}`}>Bank Transfer</Text>
              <Text className={`text-[9px] font-bold mt-1 text-center ${paymentMethod === 'bank' ? 'text-buyer-primary' : 'text-buyer-outline'}`}>NO FEE</Text>
            </Pressable>

            <Pressable onPress={() => setPaymentMethod('credit_line')} className={`w-36 p-5 rounded-xl border-2 items-center justify-center ${paymentMethod === 'credit_line' ? 'bg-buyer-surface-container-lowest border-buyer-primary' : 'bg-buyer-surface-container-low border-transparent'}`}>
              <MaterialIcons name="corporate-fare" size={28} color={paymentMethod === 'credit_line' ? '#004ac6' : '#737686'} />
              <Text className={`text-sm font-bold mt-3 text-center ${paymentMethod === 'credit_line' ? 'text-buyer-on-surface' : 'text-buyer-on-surface-variant'}`}>Credit Line</Text>
              <Text className="text-[9px] font-bold mt-1 text-center text-buyer-secondary">NET-30</Text>
            </Pressable>

            <Pressable onPress={() => setPaymentMethod('card')} className={`w-36 p-5 rounded-xl border-2 items-center justify-center ${paymentMethod === 'card' ? 'bg-buyer-surface-container-lowest border-buyer-primary' : 'bg-buyer-surface-container-low border-transparent'}`}>
              <MaterialIcons name="credit-card" size={28} color={paymentMethod === 'card' ? '#004ac6' : '#737686'} />
              <Text className={`text-sm font-bold mt-3 text-center ${paymentMethod === 'card' ? 'text-buyer-on-surface' : 'text-buyer-on-surface-variant'}`}>Credit Card</Text>
              <Text className="text-[9px] font-bold mt-1 text-center text-error">+2.5% FEE</Text>
            </Pressable>
          </ScrollView>

          {/* Conditional Payment Info */}
          {paymentMethod === 'bank' && (
            <View className="mt-4 p-4 bg-buyer-primary-container/10 rounded-xl flex-row gap-3">
              <MaterialIcons name="info" size={20} color="#004ac6" />
              <View className="flex-1">
                <Text className="text-sm font-bold text-buyer-primary">Bank Transfer Instructions</Text>
                <Text className="text-xs text-buyer-on-surface-variant mt-1 leading-relaxed">Initiate a wire transfer to our corporate account. Include your Order ID as the reference. Order ships upon fund verification.</Text>
              </View>
            </View>
          )}
        </View>

        {/* ORDER SUMMARY BREAKDOWN */}
        <View className="px-4 mb-6">
          <View className="bg-buyer-surface-container-lowest p-6 rounded-xl shadow-sm border border-buyer-outline-variant/10">
             <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-widest mb-4">Summary Breakdown</Text>
             
             <View className="space-y-3 mb-4">
               <View className="flex-row justify-between">
                 <Text className="text-sm text-buyer-on-surface-variant">Subtotal</Text>
                 <Text className="text-sm font-medium text-buyer-on-surface">${subtotal.toFixed(2)}</Text>
               </View>
               <View className="flex-row justify-between">
                 <Text className="text-sm text-buyer-on-surface-variant">Shipping ({shippingMethod})</Text>
                 <Text className="text-sm font-medium text-buyer-on-surface">${shippingCost.toFixed(2)}</Text>
               </View>
               <View className="flex-row justify-between">
                 <Text className="text-sm text-buyer-on-surface-variant">Estimated Taxes (15%)</Text>
                 <Text className="text-sm font-medium text-buyer-on-surface">${tax.toFixed(2)}</Text>
               </View>
             </View>
          </View>
        </View>

      </ScrollView>

      {/* FIXED BOTTOM CHECKOUT BAR */}
      <View className="absolute bottom-0 w-full bg-white border-t border-buyer-outline-variant/20 p-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <View className="flex-row justify-between items-end mb-4 px-2">
          <Text className="text-buyer-on-surface font-bold">Total Amount</Text>
          <View className="items-end">
            <Text className="text-[10px] text-buyer-on-surface-variant font-bold uppercase tracking-tighter leading-none mb-1">USD</Text>
            <Text className="text-3xl font-black text-buyer-primary tracking-tight">${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        <Pressable 
          onPress={handleCheckout} 
          disabled={isSubmitting}
          className={`h-14 rounded-xl items-center justify-center shadow-lg shadow-blue-500/30 flex-row gap-2 active:scale-[0.98] transition-transform ${isSubmitting ? 'bg-buyer-secondary' : 'bg-buyer-primary'}`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialIcons name="lock" size={20} color="#fff" />
              <Text className="text-white font-bold text-lg">Complete Transaction</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}