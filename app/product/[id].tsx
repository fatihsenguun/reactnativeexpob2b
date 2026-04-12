import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductStore } from '../../src/store/useProductStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../../src/store/useCartStore';

export default function ProductDetailScreen() {
  // 1. Grab the dynamic ID from the URL
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // 2. Pull the products from our Zustand store
  const { products } = useProductStore();
  
  // 3. Pull the Add to Cart action from our Cart store
  const { addToCart } = useCartStore();

  // 4. Find the specific product we clicked on
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View className="flex-1 bg-buyer-surface items-center justify-center">
        <ActivityIndicator size="large" color="#004ac6" />
        <Text className="mt-4 font-bold text-buyer-outline">Loading product details...</Text>
      </View>
    );
  }

  // Safe extraction of pricing
  const hasPrices = product.tieredPrices && product.tieredPrices.length > 0;
  const basePrice = hasPrices ? product.tieredPrices[0].unitPrice : 0.00;
  const minOrder = hasPrices ? product.tieredPrices[0].minQuantity : 1;

  return (
    <View className="flex-1 bg-buyer-surface">
      {/* CUSTOM HEADER */}
      <View 
        className="flex-row items-center justify-between px-4 pb-3 bg-white z-50 border-b border-buyer-outline-variant/20"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Pressable 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-full items-center justify-center bg-buyer-surface-container-low active:bg-buyer-surface-container-high"
        >
          <MaterialIcons name="arrow-back" size={22} color="#151c27" />
        </Pressable>
        <Text className="font-bold text-base text-buyer-on-surface">Product Details</Text>
        <Pressable className="w-10 h-10 rounded-full items-center justify-center active:bg-buyer-surface-container-low">
          <MaterialIcons name="share" size={20} color="#151c27" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* IMAGE PLACEHOLDER */}
        <View className="w-full h-80 bg-buyer-surface-container-lowest">
          <Image 
            source={{ uri: `https://picsum.photos/seed/${product.id}/500/500` }} 
            className="w-full h-full" 
            resizeMode="cover"
          />
        </View>

        {/* DETAILS SECTION */}
        <View className="p-6">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 pr-4">
              <Text className="text-2xl font-black text-buyer-on-surface mb-1">{product.name}</Text>
              <Text className="text-sm font-bold text-buyer-primary">{product.shopName || 'Unknown Supplier'}</Text>
            </View>
          </View>

          <View className="mt-6 p-4 bg-buyer-surface-container-lowest rounded-2xl border border-buyer-outline-variant/20">
            <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-widest mb-1">Wholesale Price</Text>
            <View className="flex-row items-end gap-2">
              <Text className="text-3xl font-black text-buyer-on-surface">${Number(basePrice).toFixed(2)}</Text>
              <Text className="text-xs font-bold text-buyer-secondary mb-1.5 uppercase">/ unit</Text>
            </View>
            <View className="w-full h-[1px] bg-buyer-outline-variant/20 my-3" />
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-bold text-buyer-on-surface-variant">Minimum Order Quantity (MOQ)</Text>
              <Text className="text-sm font-black text-buyer-on-surface">{minOrder} Units</Text>
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-sm font-bold text-buyer-on-surface mb-3">Product Description</Text>
            <Text className="text-sm text-buyer-on-surface-variant leading-relaxed">
              {product.description || "No description provided for this product."}
            </Text>
          </View>

          {/* ADD TIERED PRICING UI HERE LATER */}

        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BAR */}
      <View className="absolute bottom-0 w-full bg-white border-t border-buyer-outline-variant/20 p-4 flex-row gap-3" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <Pressable className="w-14 h-14 bg-buyer-surface-container-low rounded-xl items-center justify-center active:bg-buyer-surface-container-high border border-buyer-outline-variant/30">
          <MaterialIcons name="chat-bubble-outline" size={24} color="#004ac6" />
        </Pressable>
        
        {/* NEW ADD TO CART LOGIC */}
        <Pressable 
          onPress={() => {
            const result = addToCart(product, minOrder, basePrice);
            if (!result.success) {
              Alert.alert("Supplier Restriction", result.message);
            } else {
              Alert.alert("Added to Cart", `${product.name} is ready for checkout!`, [
                { text: "Keep Shopping", style: "cancel" },
                { text: "Go to Cart", onPress: () => router.push('/cart') }
              ]);
            }
          }}
          className="flex-1 h-14 bg-buyer-primary rounded-xl items-center justify-center active:opacity-90 shadow-lg shadow-blue-500/30"
        >
          <Text className="text-white font-bold text-base">Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}