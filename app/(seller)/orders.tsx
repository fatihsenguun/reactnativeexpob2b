import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SELLER_COLORS } from '../../src/style/colors';

// --- ALT BİLEŞEN: SİPARİŞ LİSTE KARTI (Table Row Mobil Uyarlaması) ---
const OrderListItem = ({ orderId, poNumber, avatarInitials, company, value, status, statusColor }: any) => (
  <Pressable className="bg-seller-surface-container-lowest p-4 border-b border-seller-outline-variant/20 active:bg-seller-surface-container-low transition-colors">
    <View className="flex-row justify-between items-start mb-3">
      <View>
        <Text className="font-bold text-seller-on-surface text-base">{orderId}</Text>
        <Text className="text-[10px] text-seller-outline font-medium tracking-wide">PO: {poNumber}</Text>
      </View>
      <View className={`px-2.5 py-1 rounded-full ${statusColor} flex-row items-center gap-1`}>
        <View className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        <Text className="text-[10px] font-bold uppercase tracking-wider">{status}</Text>
      </View>
    </View>
    
    <View className="flex-row justify-between items-end">
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded bg-seller-surface-container-high flex items-center justify-center">
          <Text className="font-bold text-xs text-seller-on-surface-variant">{avatarInitials}</Text>
        </View>
        <Text className="font-semibold text-seller-on-surface">{company}</Text>
      </View>
      <Text className="font-bold text-seller-on-surface text-base">{value}</Text>
    </View>
  </Pressable>
);


// ==========================================
// ANA EKRAN BİLEŞENİ
// ==========================================
export default function SellerOrdersScreen() {
  
  // DESIGN.md: Ambient Shadow
  const ambientShadow = {
    elevation: 2,
    shadowColor: SELLER_COLORS.onSurface,
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <View className="flex-1 bg-seller-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. HEADER & SEARCH */}
        <View className="mb-8">
          <View className="mb-6">
            <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-seller-on-surface-variant mb-1">
              Operational Overview
            </Text>
            <Text className="text-3xl font-extrabold tracking-tight text-seller-primary-container">
              Active Pipeline
            </Text>
          </View>
          
          <View className="relative justify-center">
            <View className="absolute left-0 bottom-3 z-10 border-b-2 border-transparent">
              <MaterialIcons name="search" size={20} color={SELLER_COLORS.outline} />
            </View>
            <TextInput 
              className="w-full bg-transparent border-b-2 border-seller-outline-variant/30 py-3 pl-8 pr-4 text-seller-on-surface text-sm font-medium focus:border-seller-primary"
              placeholder="Find orders by ID or customer..."
              placeholderTextColor={SELLER_COLORS.outlineVariant}
            />
          </View>
        </View>

        {/* 2. STATS BENTO GRID */}
        <View className="space-y-4 mb-10">
          
          {/* Revenue Stat */}
          <View className="bg-seller-surface-container-lowest p-6 rounded-2xl relative overflow-hidden" style={ambientShadow}>
            <View className="absolute -top-2 -right-2 opacity-10">
              <MaterialIcons name="payments" size={80} color={SELLER_COLORS.onSurface} />
            </View>
            <Text className="text-[10px] font-bold text-seller-on-surface-variant uppercase tracking-widest mb-3">Today's Revenue</Text>
            <View className="flex-row items-baseline gap-2 mb-4">
              <Text className="text-3xl font-extrabold text-seller-on-surface">$42,850</Text>
              <Text className="text-xs font-bold text-green-600 flex-row items-center">
                <MaterialIcons name="trending-up" size={12} color="#16a34a" /> 12%
              </Text>
            </View>
            <View className="h-1.5 w-full bg-seller-surface-container rounded-full overflow-hidden">
              <View className="h-full bg-seller-secondary-container w-[75%]" />
            </View>
          </View>

          <View className="flex-row justify-between gap-4">
            {/* Awaiting Shipment */}
            <View className="flex-1 bg-seller-surface-container-lowest p-5 rounded-2xl relative overflow-hidden" style={ambientShadow}>
              <View className="absolute -top-2 -right-2 opacity-10">
                <MaterialIcons name="local-shipping" size={60} color={SELLER_COLORS.onSurface} />
              </View>
              <Text className="text-[9px] font-bold text-seller-on-surface-variant uppercase tracking-widest mb-3">Awaiting Shipment</Text>
              <Text className="text-2xl font-extrabold text-seller-on-surface">24</Text>
              <Text className="text-[10px] text-seller-outline font-medium mt-1">14 priority</Text>
            </View>

            {/* New Orders */}
            <View className="flex-1 bg-seller-surface-container-lowest p-5 rounded-2xl border-l-4 border-seller-secondary-container" style={ambientShadow}>
              <Text className="text-[9px] font-bold text-seller-on-surface-variant uppercase tracking-widest mb-3">New Orders</Text>
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-2xl font-extrabold text-seller-on-surface">08</Text>
                <View className="flex-row -space-x-2">
                  <Image source={{ uri: 'https://picsum.photos/id/1005/100/100' }} className="w-6 h-6 rounded-full border-2 border-white" />
                  <View className="w-6 h-6 rounded-full bg-seller-surface-container-high flex items-center justify-center border-2 border-white">
                    <Text className="text-[8px] font-bold">+5</Text>
                  </View>
                </View>
              </View>
              <Text className="text-[10px] text-seller-secondary font-bold underline mt-1">Review Queue</Text>
            </View>
          </View>

        </View>

        {/* 3. QUICK ACTIONS & FILTER HEADER */}
        <View className="mb-6">
          <View className="flex-row gap-3 mb-5">
            <Pressable className="flex-1 bg-seller-secondary-container rounded-xl py-3.5 flex-row items-center justify-center gap-2 active:opacity-90 shadow-sm">
              <MaterialIcons name="print" size={18} color="#ffffff" />
              <Text className="text-white font-bold text-xs">Batch Labels</Text>
            </Pressable>
            <Pressable className="flex-1 bg-seller-surface-container-lowest rounded-xl py-3.5 flex-row items-center justify-center gap-2 active:bg-seller-surface-container-low shadow-sm">
              <MaterialIcons name="check-circle" size={18} color={SELLER_COLORS.onSurface} />
              <Text className="text-seller-on-surface font-bold text-xs">Shipment</Text>
            </Pressable>
          </View>
          
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-seller-on-surface-variant">
              Showing: <Text className="text-seller-on-surface">All Orders</Text>
            </Text>
            <Pressable className="flex-row items-center gap-1 active:opacity-70">
              <MaterialIcons name="tune" size={16} color={SELLER_COLORS.outline} />
              <Text className="text-xs font-semibold text-seller-outline">Filter</Text>
            </Pressable>
          </View>
        </View>

        {/* 4. ORDER LIST (Mobile Card View) */}
        <View className="bg-seller-surface-container-lowest rounded-2xl overflow-hidden mb-6" style={ambientShadow}>
          <OrderListItem 
            orderId="#ORD-99210" poNumber="8820-GX" avatarInitials="GT"
            company="Global Trade Ltd" value="$12,450.00"
            status="Pending" statusColor="bg-amber-100 text-amber-800"
          />
          <OrderListItem 
            orderId="#ORD-99208" poNumber="4412-TS" avatarInitials="TS"
            company="TechSys Solutions" value="$4,820.00"
            status="In Transit" statusColor="bg-indigo-100 text-indigo-800"
          />
          <OrderListItem 
            orderId="#ORD-99205" poNumber="9910-VM" avatarInitials="VM"
            company="VeloMedia Corp" value="$22,900.00"
            status="Delivered" statusColor="bg-emerald-100 text-emerald-800"
          />
          <OrderListItem 
            orderId="#ORD-99198" poNumber="1202-AX" avatarInitials="AX"
            company="Apex Logistics" value="$7,100.00"
            status="On Hold" statusColor="bg-rose-100 text-rose-800"
          />
          
          {/* Pagination Footer */}
          <View className="px-5 py-4 bg-seller-surface-container-low flex-row items-center justify-between">
            <Text className="text-[10px] font-bold text-seller-on-surface-variant uppercase">Page 1 of 12</Text>
            <View className="flex-row gap-4">
              <Text className="text-[10px] font-bold text-seller-outline">Previous</Text>
              <Text className="text-[10px] font-bold text-seller-secondary">Next</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}