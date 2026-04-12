import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Image, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductStore } from '../../src/store/useProductStore';

export default function BuyerSearchScreen() {
  const router = useRouter();
  const { filteredProducts, isLoading, searchQuery, setSearchQuery, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        <View className="flex-row items-center gap-3 mb-8">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={22} color="#737686" />
            </View>
            <TextInput 
              className="w-full bg-buyer-surface-container-lowest border border-buyer-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-buyer-on-surface font-medium shadow-sm shadow-black/5"
              placeholder="Search products, suppliers..."
              placeholderTextColor="#737686"
              value={searchQuery}
              onChangeText={setSearchQuery} 
            />
          </View>
          <Pressable className="w-14 h-14 bg-buyer-primary rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <MaterialIcons name="filter-list" size={24} color="#ffffff" />
          </Pressable>
        </View>

        {!searchQuery ? (
          <View className="mb-8">
            <Text className="text-[11px] font-bold uppercase tracking-widest text-buyer-on-surface-variant mb-4">
              Browse Categories
            </Text>
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {[
                { id: 1, title: 'Consumables', icon: 'inventory-2', iconColor: '#004ac6', bg: 'bg-blue-100' },
                { id: 2, title: 'Logistics', icon: 'local-shipping', iconColor: '#495c95', bg: 'bg-indigo-100' },
                { id: 3, title: 'Maintenance', icon: 'build', iconColor: '#943700', bg: 'bg-orange-100' },
                { id: 4, title: 'Office Supplies', icon: 'description', iconColor: '#151c27', bg: 'bg-gray-200' },
              ].map((cat) => (
                <Pressable 
                  key={cat.id} 
                  className="w-[48%] bg-buyer-surface-container-lowest p-5 rounded-xl shadow-sm shadow-black/5 border border-buyer-outline-variant/20 items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  <View className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg}`}>
                    <MaterialIcons name={cat.icon as any} size={26} color={cat.iconColor} />
                  </View>
                  <Text className="font-bold text-sm text-buyer-on-surface text-center">
                    {cat.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <View className="mb-4">
            <View className="flex-row justify-between items-end mb-4">
              <Text className="text-[11px] font-bold uppercase tracking-widest text-buyer-on-surface-variant">
                Search Results ({filteredProducts.length})
              </Text>
            </View>
            
            {isLoading ? (
              <View className="py-10 items-center justify-center">
                <ActivityIndicator size="large" color="#004ac6" />
                <Text className="mt-4 font-bold text-buyer-outline">Fetching Market Data...</Text>
              </View>
            ) : filteredProducts.length === 0 ? (
              <View className="py-10 items-center justify-center bg-buyer-surface-container-lowest rounded-xl border border-buyer-outline-variant/20">
                <MaterialIcons name="search-off" size={48} color="#c3c6d7" />
                <Text className="mt-4 font-bold text-buyer-on-surface-variant">No products found.</Text>
              </View>
            ) : (
              <View className="space-y-4">
                {filteredProducts.map((product) => {
                  const hasPrices = product.tieredPrices && product.tieredPrices.length > 0;
                  const basePrice = hasPrices ? product.tieredPrices[0].unitPrice : 0.00;
                  const minOrder = hasPrices ? product.tieredPrices[0].minQuantity : 1;

                  return (
                  <Pressable 
                      key={product.id}
                      onPress={() => router.push(`/product/${product.id}`)} // <--- ADD THIS LINE!
                      className="bg-buyer-surface-container-lowest p-4 rounded-xl shadow-sm shadow-black/5 border border-buyer-outline-variant/20 flex-row gap-4 active:bg-buyer-surface-container-lowest/80 mb-4"
                    >
                      <View className="w-24 h-24 bg-buyer-surface-container-low rounded-lg overflow-hidden">
                        <Image 
                          source={{ uri: `https://picsum.photos/seed/${product.id}/200/200` }} 
                          className="w-full h-full" 
                        />
                      </View>
                      <View className="flex-1 justify-between py-1">
                        <View>
                          <View className="flex-row justify-between items-start">
                            <Text className="font-extrabold text-base text-buyer-on-surface flex-1 pr-2" numberOfLines={1}>
                              {product.name}
                            </Text>
                            {product.totalSalesCount > 50 && (
                              <View className="flex-row items-center bg-orange-50 px-1.5 py-0.5 rounded">
                                <MaterialIcons name="local-fire-department" size={10} color="#bc4800" />
                                <Text className="text-[9px] font-bold text-buyer-tertiary-container uppercase ml-1">Hot</Text>
                              </View>
                            )}
                          </View>
                          <Text className="text-xs text-buyer-on-surface-variant font-medium mt-1">
                            {product.shopName || 'Unknown Supplier'}
                          </Text>
                        </View>
                        
                        <View className="flex-row items-end justify-between mt-2">
                          <View>
                            <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-tighter mb-0.5">
                              Min Order: {minOrder} units
                            </Text>
                            <View className="flex-row items-baseline gap-1.5">
                              <Text className="text-buyer-primary font-black text-lg">
                                ${Number(basePrice).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          <View className="items-end gap-1">
                            <Text className="text-[9px] font-bold text-buyer-tertiary uppercase">In Stock: {product.stock}</Text>
                            <View className="px-3 py-1.5 bg-buyer-primary-container rounded-lg">
                              <Text className="text-buyer-on-primary text-[10px] font-bold">Details</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}