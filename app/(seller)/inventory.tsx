import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image, 
  TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SELLER_COLORS, SYSTEM_COLORS } from '../../src/style/colors';


const InventoryCard = ({ 
  imageUri, badgeText, badgeType, title, price, sku, stock, stockColor, velocity, velocityColor 
}: any) => {
  
  let badgeBg = "bg-seller-surface-container";
  let badgeTextClass = "text-seller-on-surface-variant";

  if (badgeType === 'success') {
    badgeBg = "bg-green-100"; 
    badgeTextClass = "text-green-800";
  } else if (badgeType === 'warning') {
    badgeBg = "bg-seller-tertiary-container/10"; 
    badgeTextClass = "text-seller-tertiary-container";
  } else if (badgeType === 'primary') {
    badgeBg = "bg-seller-primary"; 
    badgeTextClass = "text-white";
  }
  const cardShadow = {
    elevation: 3,
    shadowColor: SELLER_COLORS.onSurface,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <View className="bg-seller-surface-container-lowest rounded-2xl p-4 mb-5 border border-seller-outline-variant/20" style={cardShadow}>
      
      {/* Resim ve Etiket */}
      <View className="h-48 w-full rounded-xl overflow-hidden bg-seller-surface-container mb-4">
        <Image source={{ uri: imageUri }} className="w-full h-full" />
        <View className={`absolute top-3 left-3 px-2.5 py-1 rounded bg-opacity-90 ${badgeBg}`}>
          <Text className={`text-[10px] font-extrabold uppercase tracking-widest ${badgeTextClass}`}>
            {badgeText}
          </Text>
        </View>
      </View>

      <View className="mb-3">
        <View className="flex-row justify-between items-start mb-0.5">
          <Text className="font-extrabold text-lg text-seller-on-surface flex-1 pr-2">{title}</Text>
          <Text className="text-seller-primary font-black text-lg">{price}</Text>
        </View>
        <Text className="text-xs text-seller-outline font-medium">SKU: {sku}</Text>
      </View>

      <View className="flex-row justify-between py-3 border-t border-b border-seller-outline-variant/20 mb-4">
        <View className="flex-1">
          <Text className="text-[10px] text-seller-outline uppercase font-bold tracking-widest mb-1">Stock Level</Text>
          <Text className={`text-sm font-bold ${stockColor || 'text-seller-on-surface'}`}>{stock}</Text>
        </View>
        <View className="flex-1 border-l border-seller-outline-variant/20 pl-4">
          <Text className="text-[10px] text-seller-outline uppercase font-bold tracking-widest mb-1">Velocity</Text>
          <Text className={`text-sm font-bold ${velocityColor || 'text-seller-on-surface'}`}>{velocity}</Text>
        </View>
      </View>

      <View className="flex-row gap-3">
        <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg bg-seller-surface-container-low active:bg-seller-surface-container transition-colors">
          <MaterialIcons name="edit" size={18} color={SELLER_COLORS.primary} />
          <Text className="text-seller-primary font-bold text-sm">Edit Item</Text>
        </Pressable>
        <Pressable className="px-4 py-3 rounded-lg bg-error-container/20 active:bg-error-container/40 transition-colors flex items-center justify-center">
          <MaterialIcons name="delete-outline" size={20} color={SYSTEM_COLORS.error} />
        </Pressable>
      </View>

    </View>
  );
};


export default function SellerInventoryScreen() {
  return (
    <View className="flex-1 bg-seller-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. HEADER & ADD BUTTON */}
        <View className="mb-6 flex-row items-end justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-extrabold tracking-tight text-seller-on-surface mb-1">Global Inventory</Text>
            <Text className="text-seller-on-surface-variant font-medium text-xs">Manage wholesale stocks and pricing.</Text>
          </View>
          <Pressable className="w-12 h-12 bg-seller-primary rounded-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <MaterialIcons name="add" size={26} color={SELLER_COLORS.onPrimary} />
          </Pressable>
        </View>

        {/* 2. SEARCH & FILTER */}
        <View className="flex-row items-center gap-3 mb-8">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={22} color={SELLER_COLORS.outline} />
            </View>
            <TextInput 
              className="w-full bg-seller-surface-container-lowest border border-seller-outline-variant/30 rounded-xl py-3.5 pl-11 pr-4 text-seller-on-surface font-medium shadow-sm shadow-black/5"
              placeholder="Search by SKU, Name..."
              placeholderTextColor={SELLER_COLORS.outline}
            />
          </View>
          <Pressable className="bg-seller-surface-container-low border border-seller-outline-variant/20 px-4 py-3.5 rounded-xl flex items-center justify-center active:bg-seller-surface-container transition-colors">
            <MaterialIcons name="filter-list" size={22} color={SELLER_COLORS.onSurfaceVariant} />
          </Pressable>
        </View>

        {/* 3. INVENTORY LIST (Alt bileşenler kullanıldı) */}
        <View className="mb-4">
          <InventoryCard 
            imageUri="https://picsum.photos/id/103/600/400"
            badgeText="Active" badgeType="success"
            title="Vanguard Air-Line Z" price="$142.00" sku="STLR-VNG-2024"
            stock="1,240 Units" velocity="High (82%)"
          />
          <InventoryCard 
            imageUri="https://picsum.photos/id/2/600/400"
            badgeText="Low Stock" badgeType="warning"
            title="Horizon Smart Series 4" price="$289.00" sku="STLR-HRZ-9901"
            stock="12 Units" stockColor="text-seller-tertiaryContainer" 
            velocity="Moderate"
          />
          <InventoryCard 
            imageUri="https://picsum.photos/id/26/600/400"
            badgeText="Top Seller" badgeType="primary"
            title="Bio-Essence Care Kit" price="$64.00" sku="STLR-BIO-7712"
            stock="3,400 Units" velocity="Exp. (94%)" velocityColor="text-seller-primary"
          />
          <InventoryCard 
            imageUri="https://picsum.photos/id/43/600/400"
            badgeText="Active" badgeType="success"
            title="Titan Audio Over-Ear" price="$210.00" sku="STLR-TTN-4422"
            stock="450 Units" velocity="Stable"
          />
        </View>

      </ScrollView>
    </View>
  );
}