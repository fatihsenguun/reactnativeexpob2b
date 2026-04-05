import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BuyerHomeScreen() {
  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. SEARCH BAR SECTION */}
        <View className="mb-8">
          <View className="relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={24} color="#737686" />
            </View>
            <TextInput 
              className="w-full bg-buyer-surface-container-highest rounded-xl py-4 pl-12 pr-4 text-buyer-on-surface font-medium"
              placeholder="Search wholesale products, suppliers, or SKUs..."
              placeholderTextColor="#737686"
            />
          </View>
        </View>

        {/* 2. CATEGORY GRID */}
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

        {/* 3. FLASH WHOLESALE DEALS */}
        <View className="mb-12">
          <View className="flex-row items-center gap-2 mb-6">
            <MaterialIcons name="bolt" size={28} color="#943700" />
            <Text className="text-2xl font-extrabold text-buyer-primary tracking-tight">Flash Wholesale Deals</Text>
          </View>

          {/* Large Feature Banner */}
          <View className="relative overflow-hidden rounded-2xl h-64 mb-6">
            <Image 
              source={{ uri: 'https://picsum.photos/id/1078/800/400' }} 
              className="absolute inset-0 w-full h-full" 
            />
            <View className="absolute inset-0 bg-black/40" />
            
            <View className="absolute bottom-0 left-0 p-6 w-full">
              <View className="bg-buyer-tertiary-container self-start px-3 py-1 rounded-full mb-3">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-white">Ends in 04:22:10</Text>
              </View>
              <Text className="text-3xl font-black text-white mb-1">Industrial Toolkits</Text>
              <Text className="text-blue-100 text-xs mb-4">Premium grade construction kits at bulk clearance prices.</Text>
              
              <Pressable className="bg-white py-3 px-6 rounded-lg flex-row items-center justify-center self-start active:bg-slate-200">
                <Text className="text-buyer-primary font-bold mr-2">Secure Bulk Pricing</Text>
                <MaterialIcons name="trending-flat" size={20} color="#004ac6" />
              </Pressable>
            </View>
          </View>

          {/* Small Deal Tracker */}
          <View className="bg-buyer-surface-container-lowest p-5 rounded-2xl shadow-sm border border-buyer-outline-variant/30">
            <Image 
              source={{ uri: 'https://picsum.photos/id/1/400/200' }} 
              className="w-full h-32 rounded-xl mb-4" 
            />
            <Text className="font-bold text-buyer-primary mb-1 text-lg">LED Micro-Panels</Text>
            <View className="flex-row items-baseline gap-2 mb-2">
              <Text className="text-2xl font-black text-buyer-on-surface">$12.40</Text>
              <Text className="text-xs text-buyer-outline line-through">$18.90</Text>
            </View>
            <Text className="text-xs text-buyer-secondary mb-4 font-medium">MOQ: 500 Units</Text>
            
            <View className="w-full bg-buyer-surface-container h-1.5 rounded-full overflow-hidden">
              <View className="bg-buyer-primary h-full w-[85%]" />
            </View>
            <Text className="text-[10px] font-bold text-buyer-primary mt-2 uppercase tracking-widest">85% Claimed</Text>
          </View>
        </View>

        {/* 4. TOP RATED WHOLESALERS */}
        <View className="mb-12">
          <Text className="text-2xl font-extrabold text-buyer-primary tracking-tight mb-6">Top Rated Wholesalers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            
            {[
              { id: 1, name: 'Summit Tech Distro', desc: 'Specializing in microchips', orders: '340', rating: '4.9', img: '1005' },
              { id: 2, name: 'Global Fabrics Ltd.', desc: 'Premium organic cotton', orders: '1.2K', rating: '4.8', img: '1027' },
              { id: 3, name: 'Nexus Heavy Tools', desc: 'Industrial machinery parts', orders: '89', rating: '5.0', img: '1011' },
            ].map((supplier) => (
              <View key={supplier.id} className="w-64 bg-buyer-surface-container-low rounded-2xl p-5 mr-4 border border-buyer-outline-variant/10">
                <View className="flex-row items-start justify-between mb-4">
                  <Image source={{ uri: `https://picsum.photos/id/${supplier.img}/100/100` }} className="w-14 h-14 rounded-full" />
                  <View className="items-end">
                    <View className="flex-row items-center">
                      <MaterialIcons name="star" size={14} color="#004ac6" />
                      <Text className="text-buyer-primary font-bold ml-1">{supplier.rating}</Text>
                    </View>
                    <Text className="text-[10px] text-buyer-outline font-bold uppercase tracking-widest mt-1">{supplier.orders} Orders</Text>
                  </View>
                </View>
                <Text className="font-bold text-buyer-on-surface text-base">{supplier.name}</Text>
                <Text className="text-xs text-buyer-secondary mt-1" numberOfLines={1}>{supplier.desc}</Text>
                
                <View className="mt-4 pt-4 border-t border-buyer-outline-variant/20 flex-row gap-2">
                  <Text className="bg-blue-100 text-[#004ac6] text-[10px] px-2 py-1 rounded font-bold overflow-hidden">VERIFIED</Text>
                  <Text className="bg-blue-100 text-[#004ac6] text-[10px] px-2 py-1 rounded font-bold overflow-hidden">FAST SHIP</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 5. TRENDING NOW */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-extrabold text-buyer-primary tracking-tight">Trending Now</Text>
            <Pressable className="p-2 rounded-full border border-buyer-outline-variant/50">
              <MaterialIcons name="filter-list" size={20} color="#737686" />
            </Pressable>
          </View>

          <View className="space-y-4">
            {[
              { id: 1, name: 'Pro-Air Athletics', sku: 'PA-993-RED', price: '$28.50', moq: 24, time: '2-4', img: '21' },
              { id: 2, name: 'Symphony Z-1 ANC', sku: 'SZ-ANC-BLK', price: '$42.00', moq: 10, time: '5-7', img: '36' },
              { id: 3, name: 'Nordic Brew Set', sku: 'NB-SET-04', price: '$15.75', moq: 100, time: '3-5', img: '42' },
            ].map((product) => (
              <View key={product.id} className="bg-buyer-surface-container-lowest p-4 rounded-2xl flex-row items-center gap-4 shadow-sm shadow-black/5 mb-4">
                <Image source={{ uri: `https://picsum.photos/id/${product.img}/150/150` }} className="w-20 h-20 rounded-xl bg-buyer-surface-container" />
                
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-base text-buyer-primary" numberOfLines={1}>{product.name}</Text>
                      <Text className="text-[10px] font-bold text-buyer-outline mt-1">SKU: {product.sku}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-lg font-black text-buyer-on-surface">{product.price}</Text>
                      <Text className="text-[9px] font-bold text-buyer-secondary uppercase">per unit</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3 mt-3">
                    <View className="flex-row items-center gap-1 bg-buyer-surface-container px-2 py-1 rounded">
                      <MaterialIcons name="inventory" size={12} color="#434655" />
                      <Text className="text-[10px] font-bold text-buyer-on-surface-variant">MOQ: {product.moq}</Text>
                    </View>
                    <View className="flex-row items-center gap-1 bg-buyer-surface-container px-2 py-1 rounded">
                      <MaterialIcons name="local-shipping" size={12} color="#434655" />
                      <Text className="text-[10px] font-bold text-buyer-on-surface-variant">{product.time} Days</Text>
                    </View>
                    <Pressable className="ml-auto p-1.5 bg-blue-50 rounded-full active:bg-blue-100">
                      <MaterialIcons name="add-shopping-cart" size={18} color="#004ac6" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 6. FLOATING ACTION BUTTON (FAB) */}
      <Pressable 
        className="absolute bottom-24 right-6 w-14 h-14 bg-buyer-primary rounded-full flex items-center justify-center shadow-lg active:scale-95"
        style={{ elevation: 6, shadowColor: '#004ac6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
      >
        <MaterialIcons name="add-task" size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
}