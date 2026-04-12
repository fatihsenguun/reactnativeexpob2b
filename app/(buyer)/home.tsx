import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Image,
  ActivityIndicator,
  Alert // <-- 1. Added Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProductStore } from '../../src/store/useProductStore';
import { useCartStore } from '../../src/store/useCartStore'; // <-- 2. Imported Cart Store

export default function BuyerHomeScreen() {
  const router = useRouter();
  const { products, isLoading, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore(); // <-- 3. Initialize addToCart

  useEffect(() => {
    fetchProducts();
  }, []);

  const trendingProducts = products.slice(0, 5);

  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        <View className="mb-8">
          <Pressable 
            className="relative justify-center"
            onPress={() => router.push('/(buyer)/search')}
          >
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={24} color="#737686" />
            </View>
            <View pointerEvents="none">
              <TextInput 
                className="w-full bg-buyer-surface-container-highest rounded-xl py-4 pl-12 pr-4 text-buyer-on-surface font-medium"
                placeholder="Search wholesale products, suppliers..."
                placeholderTextColor="#737686"
                editable={false} 
              />
            </View>
          </Pressable>
        </View>

        <View className="mb-10">
          <View className="flex-row justify-between items-end mb-6">
            <View>
              <Text className="text-2xl font-extrabold text-buyer-primary tracking-tight">Supply Categories</Text>
              <Text className="text-sm text-buyer-secondary font-medium">Browse by industry segment</Text>
            </View>
            <Pressable>
              <Text className="text-buyer-primary font-bold text-sm">View All</Text>
            </Pressable>
          </View>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            {[
              { id: 1, icon: 'devices', label: 'Electronics' },
              { id: 2, icon: 'checkroom', label: 'Textiles' },
              { id: 3, icon: 'restaurant', label: 'Food & Bev' },
              { id: 4, icon: 'print', label: 'Office' },
              { id: 5, icon: 'construction', label: 'Industrial' },
            ].map((cat) => (
              <Pressable 
                key={cat.id} 
                className="w-[30%] sm:w-[18%] bg-buyer-surface-container-low rounded-xl p-4 items-center justify-center active:opacity-70"
              >
                <MaterialIcons name={cat.icon as any} size={28} color="#004ac6" />
                <Text className="font-bold text-xs mt-2 text-buyer-on-surface text-center">{cat.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-extrabold text-buyer-primary tracking-tight">Trending Now</Text>
            <Pressable className="p-2 rounded-full border border-buyer-outline-variant/50">
              <MaterialIcons name="filter-list" size={20} color="#737686" />
            </Pressable>
          </View>

          {isLoading ? (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#004ac6" />
            </View>
          ) : trendingProducts.length === 0 ? (
            <View className="py-10 items-center justify-center bg-buyer-surface-container-lowest rounded-xl border border-buyer-outline-variant/20">
              <MaterialIcons name="inventory-2" size={48} color="#c3c6d7" />
              <Text className="mt-4 font-bold text-buyer-on-surface-variant">No trending items yet.</Text>
            </View>
          ) : (
            <View className="space-y-4">
              {trendingProducts.map((product) => {
                
                const hasPrices = product.tieredPrices && product.tieredPrices.length > 0;
                const basePrice = hasPrices ? product.tieredPrices[0].unitPrice : 0.00;
                const minOrder = hasPrices ? product.tieredPrices[0].minQuantity : 1;

                return (
                  <Pressable 
                    key={product.id} 
                    onPress={() => router.push(`/product/${product.id}`)}
                    className="bg-buyer-surface-container-lowest p-4 rounded-2xl flex-row items-center gap-4 shadow-sm shadow-black/5 mb-4 border border-buyer-outline-variant/10 active:bg-buyer-surface-container-lowest/80"
                  >
                    <Image 
                      source={{ uri: `https://picsum.photos/seed/${product.id}/150/150` }} 
                      className="w-20 h-20 rounded-xl bg-buyer-surface-container" 
                    />
                    
                    <View className="flex-1">
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1 mr-2">
                          <Text className="font-bold text-base text-buyer-primary" numberOfLines={1}>{product.name}</Text>
                          <Text className="text-[10px] font-bold text-buyer-outline mt-1">{product.shopName || 'Unknown Supplier'}</Text>
                        </View>
                        <View className="items-end">
                          <Text className="text-lg font-black text-buyer-on-surface">${Number(basePrice).toFixed(2)}</Text>
                          <Text className="text-[9px] font-bold text-buyer-secondary uppercase">per unit</Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-3 mt-3">
                        <View className="flex-row items-center gap-1 bg-buyer-surface-container px-2 py-1 rounded">
                          <MaterialIcons name="inventory" size={12} color="#434655" />
                          <Text className="text-[10px] font-bold text-buyer-on-surface-variant">MOQ: {minOrder}</Text>
                        </View>
                        <View className="flex-row items-center gap-1 bg-buyer-surface-container px-2 py-1 rounded">
                          <MaterialIcons name="local-shipping" size={12} color="#434655" />
                          <Text className="text-[10px] font-bold text-buyer-on-surface-variant">In Stock: {product.stock}</Text>
                        </View>
                        
                        {/* 4. NEW ADD TO CART LOGIC HERE */}
                        <Pressable 
                          className="ml-auto p-1.5 bg-blue-50 rounded-full active:bg-blue-100"
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
                        >
                          <MaterialIcons name="add-shopping-cart" size={18} color="#004ac6" />
                        </Pressable>
                        
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable 
        className="absolute bottom-24 right-6 w-14 h-14 bg-buyer-primary rounded-full flex items-center justify-center shadow-lg active:scale-95"
        style={{ elevation: 6, shadowColor: '#004ac6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
      >
        <MaterialIcons name="add-task" size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
}