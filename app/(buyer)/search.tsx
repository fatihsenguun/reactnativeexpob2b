import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Image, 
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BuyerSearchScreen() {
  return (
    <View className="flex-1 bg-buyer-surface">
      
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. SEARCH INPUT SECTION */}
        <View className="flex-row items-center gap-3 mb-8">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={22} color="#737686" />
            </View>
            <TextInput 
              className="w-full bg-buyer-surface-container-lowest border border-buyer-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-buyer-on-surface font-medium shadow-sm shadow-black/5"
              placeholder="Search products, suppliers..."
              placeholderTextColor="#737686"
            />
          </View>
          <Pressable className="w-14 h-14 bg-buyer-primary rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <MaterialIcons name="filter-list" size={24} color="#ffffff" />
          </Pressable>
        </View>

        {/* 2. RECENT SEARCHES (CHIPS) */}
        <View className="mb-8">
          <Text className="text-[11px] font-bold uppercase tracking-widest text-buyer-on-surface-variant mb-4">
            Recent Searches
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {['Sumatra Coffee', 'Eco Packaging', 'Industrial HVAC', 'LED Fixtures'].map((query, index) => (
              <Pressable 
                key={index} 
                className="flex-row items-center gap-1.5 px-3 py-2 bg-buyer-surface-container-low rounded-full border border-buyer-outline-variant/20 active:bg-buyer-surface-container"
              >
                <Text className="text-xs font-semibold text-buyer-on-surface">{query}</Text>
                <MaterialIcons name="close" size={16} color="#737686" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* 3. BROWSE CATEGORIES (BENTO GRID) */}
        <View className="mb-10">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-[11px] font-bold uppercase tracking-widest text-buyer-on-surface-variant">
              Browse Categories
            </Text>
            <Pressable>
              <Text className="text-xs font-bold text-buyer-primary">View All</Text>
            </Pressable>
          </View>
          
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

        {/* 4. TRENDING WHOLESALE (VERTICAL LIST) */}
        <View className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-widest text-buyer-on-surface-variant mb-4">
            Trending Wholesale
          </Text>
          
          <View className="space-y-4">
            {/* Product 1 */}
            <Pressable className="bg-buyer-surface-container-lowest p-4 rounded-xl shadow-sm shadow-black/5 border border-buyer-outline-variant/20 flex-row gap-4 active:bg-buyer-surface-container-lowest/80 mb-4">
              <View className="w-24 h-24 bg-buyer-surface-container-low rounded-lg overflow-hidden">
                <Image 
                  source={{ uri: 'https://picsum.photos/id/1060/200/200' }} 
                  className="w-full h-full" 
                />
              </View>
              <View className="flex-1 justify-between py-1">
                <View>
                  <View className="flex-row justify-between items-start">
                    <Text className="font-extrabold text-base text-buyer-on-surface flex-1 pr-2" numberOfLines={1}>
                      Arabica Specialty
                    </Text>
                    <View className="flex-row items-center bg-blue-50 px-1.5 py-0.5 rounded">
                      <MaterialIcons name="verified" size={10} color="#004ac6" />
                      <Text className="text-[9px] font-bold text-buyer-primary uppercase ml-1">Verified</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-buyer-on-surface-variant font-medium mt-1">Global Trade Partners Ltd.</Text>
                </View>
                
                <View className="flex-row items-end justify-between mt-2">
                  <View>
                    <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-tighter mb-0.5">Min Order: 500 units</Text>
                    <View className="flex-row items-baseline gap-1.5">
                      <Text className="text-buyer-primary font-black text-lg">$12.45</Text>
                      <Text className="text-[10px] text-buyer-outline-variant line-through">$15.00</Text>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <Text className="text-[9px] font-bold text-buyer-tertiary uppercase">Bulk Tier</Text>
                    <View className="px-3 py-1.5 bg-buyer-primary-container rounded-lg">
                      <Text className="text-buyer-on-primary text-[10px] font-bold">Details</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>

            {/* Product 2 */}
            <Pressable className="bg-buyer-surface-container-lowest p-4 rounded-xl shadow-sm shadow-black/5 border border-buyer-outline-variant/20 flex-row gap-4 active:bg-buyer-surface-container-lowest/80 mb-4">
              <View className="w-24 h-24 bg-buyer-surface-container-low rounded-lg overflow-hidden">
                <Image 
                  source={{ uri: 'https://picsum.photos/id/175/200/200' }} 
                  className="w-full h-full" 
                />
              </View>
              <View className="flex-1 justify-between py-1">
                <View>
                  <View className="flex-row justify-between items-start">
                    <Text className="font-extrabold text-base text-buyer-on-surface flex-1 pr-2" numberOfLines={1}>
                      Eco-Kraft Box
                    </Text>
                    <View className="flex-row items-center bg-blue-50 px-1.5 py-0.5 rounded">
                      <MaterialIcons name="verified" size={10} color="#004ac6" />
                      <Text className="text-[9px] font-bold text-buyer-primary uppercase ml-1">Verified</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-buyer-on-surface-variant font-medium mt-1">Sustainable Pack Co.</Text>
                </View>
                
                <View className="flex-row items-end justify-between mt-2">
                  <View>
                    <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-tighter mb-0.5">Min Order: 2000 units</Text>
                    <View className="flex-row items-baseline gap-1.5">
                      <Text className="text-buyer-primary font-black text-lg">$0.85</Text>
                      <Text className="text-[10px] text-buyer-outline-variant line-through">$1.10</Text>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <Text className="text-[9px] font-bold text-buyer-tertiary uppercase">Bulk Tier</Text>
                    <View className="px-3 py-1.5 bg-buyer-primary-container rounded-lg">
                      <Text className="text-buyer-on-primary text-[10px] font-bold">Details</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>

            {/* Product 3 */}
            <Pressable className="bg-buyer-surface-container-lowest p-4 rounded-xl shadow-sm shadow-black/5 border border-buyer-outline-variant/20 flex-row gap-4 active:bg-buyer-surface-container-lowest/80 mb-4">
              <View className="w-24 h-24 bg-buyer-surface-container-low rounded-lg overflow-hidden">
                <Image 
                  source={{ uri: 'https://picsum.photos/id/0/200/200' }} 
                  className="w-full h-full" 
                />
              </View>
              <View className="flex-1 justify-between py-1">
                <View>
                  <View className="flex-row justify-between items-start">
                    <Text className="font-extrabold text-base text-buyer-on-surface flex-1 pr-2" numberOfLines={1}>
                      Industrial Control V4
                    </Text>
                    <View className="flex-row items-center bg-orange-50 px-1.5 py-0.5 rounded">
                      <MaterialIcons name="star" size={10} color="#bc4800" />
                      <Text className="text-[9px] font-bold text-buyer-tertiary-container uppercase ml-1">Top Rated</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-buyer-on-surface-variant font-medium mt-1">TechSys Components</Text>
                </View>
                
                <View className="flex-row items-end justify-between mt-2">
                  <View>
                    <Text className="text-[9px] text-buyer-outline font-bold uppercase tracking-tighter mb-0.5">Min Order: 50 units</Text>
                    <View className="flex-row items-baseline gap-1.5">
                      <Text className="text-buyer-primary font-black text-lg">$450.0</Text>
                      <Text className="text-[10px] text-buyer-outline-variant line-through">$520.0</Text>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <Text className="text-[9px] font-bold text-buyer-tertiary uppercase">Volume Disc.</Text>
                    <View className="px-3 py-1.5 bg-buyer-primary-container rounded-lg">
                      <Text className="text-buyer-on-primary text-[10px] font-bold">Details</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>

          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}