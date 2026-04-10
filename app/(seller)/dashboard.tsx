import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SellerDashboardScreen() {

  const ambientShadow = {
    elevation: 2,
    shadowColor: '#131b2e', 
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
        
        {/* 1. WELCOME HEADER SECTION */}
        <View className="mb-8 flex-col gap-5">
          <View>
            <Text className="text-seller-on-secondary-container text-[11px] uppercase tracking-widest font-bold mb-1">
              Wholesale Portal
            </Text>
            <Text className="text-3xl font-extrabold text-seller-on-surface tracking-tight">
              Operational Overview
            </Text>
          </View>
          
          <View className="flex-row gap-3">
            <Pressable className="flex-1 flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl bg-seller-surface-container-lowest border border-seller-outline-variant/30 shadow-sm active:bg-seller-surface-container-low transition-colors">
              <MaterialIcons name="download" size={18} color="#3525cd" />
              <Text className="text-seller-primary font-bold text-xs tracking-wide">Export</Text>
            </Pressable>
            <Pressable className="flex-1 flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl bg-seller-primary active:opacity-90 shadow-sm transition-opacity">
              <MaterialIcons name="add" size={18} color="#ffffff" />
              <Text className="text-white font-bold text-xs tracking-wide">Shipment</Text>
            </Pressable>
          </View>
        </View>

        {/* 2. KEY METRICS BENTO GRID */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-10">
          
          {/* Total Sales */}
          <View className="w-[48%] bg-seller-surface-container-lowest p-4 rounded-2xl border border-seller-outline-variant/10" style={ambientShadow}>
            <View className="flex-row justify-between items-start mb-3">
              <View className="p-1.5 bg-seller-primary/10 rounded-lg">
                <MaterialIcons name="payments" size={18} color="#3525cd" />
              </View>
              <View className="bg-green-50 px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-green-600">+12.4%</Text>
              </View>
            </View>
            <Text className="text-seller-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Total Sales</Text>
            <Text className="text-lg font-black text-seller-on-surface mt-0.5">$482.9k</Text>
            <View className="mt-3 h-1 w-full bg-seller-surface-container rounded-full overflow-hidden">
              <View className="h-full bg-seller-primary w-[78%]" />
            </View>
          </View>

          {/* Pending Quotations */}
          <View className="w-[48%] bg-seller-surface-container-lowest p-4 rounded-2xl border border-seller-outline-variant/10" style={ambientShadow}>
            <View className="flex-row justify-between items-start mb-3">
              <View className="p-1.5 bg-seller-secondary/10 rounded-lg">
                <MaterialIcons name="pending-actions" size={18} color="#58579b" />
              </View>
              <View className="bg-seller-surface-container px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-seller-on-surface-variant">Action Req</Text>
              </View>
            </View>
            <Text className="text-seller-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Pending Quotes</Text>
            <Text className="text-lg font-black text-seller-on-surface mt-0.5">42</Text>
            <View className="flex-row gap-1 mt-3">
              <View className="h-1 flex-1 bg-seller-primary rounded-full" />
              <View className="h-1 flex-1 bg-seller-primary rounded-full" />
              <View className="h-1 flex-1 bg-seller-outline-variant/30 rounded-full" />
            </View>
          </View>

          {/* Low Stock Alerts */}
          <View className="w-[48%] bg-seller-surface-container-lowest p-4 rounded-2xl border border-seller-outline-variant/10" style={ambientShadow}>
            <View className="flex-row justify-between items-start mb-3">
              <View className="p-1.5 bg-seller-tertiary-container/10 rounded-lg">
                <MaterialIcons name="warning" size={18} color="#a44100" />
              </View>
              <View className="bg-seller-tertiary-fixed px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-seller-tertiary-container">Urgent</Text>
              </View>
            </View>
            <Text className="text-seller-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Low Stock SKUs</Text>
            <Text className="text-lg font-black text-seller-on-surface mt-0.5">07</Text>
            <Text className="text-[9px] font-bold text-seller-outline mt-2">RESTOCK NEEDED</Text>
          </View>

          {/* Active Partners */}
          <View className="w-[48%] bg-seller-surface-container-lowest p-4 rounded-2xl border border-seller-outline-variant/10" style={ambientShadow}>
            <View className="flex-row justify-between items-start mb-3">
              <View className="p-1.5 bg-seller-primary-container/10 rounded-lg">
                <MaterialIcons name="handshake" size={18} color="#3525cd" />
              </View>
            </View>
            <Text className="text-seller-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Active Partners</Text>
            <Text className="text-lg font-black text-seller-on-surface mt-0.5">1,204</Text>
            <View className="mt-3">
              <View className="flex-row justify-between text-[9px] mb-1 font-bold text-seller-primary">
                <Text className="text-[9px]">Retention</Text>
                <Text className="text-[9px]">94%</Text>
              </View>
              <View className="h-1 w-full bg-seller-surface-container rounded-full overflow-hidden">
                <View className="h-full bg-seller-primary-container w-[94%]" />
              </View>
            </View>
          </View>

        </View>

        {/* 3. RECENT ORDERS LIST */}
        <View className="mb-10 bg-seller-surface-container-lowest p-5 rounded-2xl border border-seller-outline-variant/10" style={ambientShadow}>
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-extrabold text-seller-on-surface">Recent Orders</Text>
            <Pressable>
              <Text className="text-seller-primary font-bold text-xs">View All</Text>
            </Pressable>
          </View>

          <View className="space-y-4">
            {[
              { id: '8291', company: 'Industrial Components Ltd.', details: '12 SKUs • $14,200.00', status: 'Processing', statusColor: 'bg-seller-secondary-fixed text-seller-on-secondary-fixed-variant' },
              { id: '8288', company: 'Global Tech Solutions', details: '4 SKUs • $2,450.00', status: 'Shipped', statusColor: 'bg-green-100 text-green-800' },
              { id: '8285', company: 'North Star Construction', details: '28 SKUs • $45,820.00', status: 'On Hold', statusColor: 'bg-seller-tertiary-fixed text-seller-on-tertiary-fixed-variant' }
            ].map((order) => (
              <Pressable key={order.id} className="flex-row items-center justify-between p-3 bg-seller-surface-container-low rounded-xl active:bg-seller-surface-container transition-colors">
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-seller-outline-variant/20">
                    <Text className="font-bold text-seller-primary text-[10px]">#{order.id}</Text>
                  </View>
                  <View className="flex-1 pr-2">
                    <Text className="font-bold text-seller-on-surface text-sm" numberOfLines={1}>{order.company}</Text>
                    <Text className="text-[10px] font-medium text-seller-outline mt-0.5">{order.details}</Text>
                  </View>
                </View>
                <View className={`px-2 py-1 rounded ${order.statusColor}`}>
                  <Text className="text-[9px] font-bold uppercase tracking-wider">{order.status}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 4. QUICK ACTIONS & INSIGHTS */}
        <View className="space-y-6">
          
          {/* Quick Actions */}
          <View className="bg-seller-primary-container p-6 rounded-2xl shadow-md">
            <Text className="text-white text-lg font-extrabold mb-5">Quick Actions</Text>
            <View className="space-y-3">
              <Pressable className="w-full flex-row items-center gap-3 p-3.5 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                <MaterialIcons name="add-box" size={20} color="#ffffff" />
                <Text className="text-white font-bold text-sm">Add Product</Text>
              </Pressable>
              <Pressable className="w-full flex-row items-center gap-3 p-3.5 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                <MaterialIcons name="inventory" size={20} color="#ffffff" />
                <Text className="text-white font-bold text-sm">Bulk Inventory Update</Text>
              </Pressable>
              <Pressable className="w-full flex-row items-center gap-3 p-3.5 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                <MaterialIcons name="description" size={20} color="#ffffff" />
                <Text className="text-white font-bold text-sm">Manage Quotations</Text>
              </Pressable>
            </View>
          </View>

          {/* Insights Card */}
          <Pressable className="bg-seller-surface-container-lowest p-6 rounded-2xl border border-seller-primary/10 overflow-hidden active:bg-seller-surface-container-low transition-colors" style={ambientShadow}>
            <View className="absolute -right-8 -bottom-8 w-32 h-32 bg-seller-primary/5 rounded-full blur-2xl" />
            <Text className="text-[10px] font-bold uppercase tracking-widest text-seller-primary-container mb-2">Market Insight</Text>
            <Text className="text-base font-extrabold text-seller-on-surface leading-snug mb-2">
              Warehouse automation is increasing efficiency by 34%.
            </Text>
            <Text className="text-[11px] text-seller-on-surface-variant font-medium mb-4 pr-4">
              Learn how to optimize your fulfillment flow with Stellar's new logistics API.
            </Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-[11px] font-bold text-seller-primary">Read case study</Text>
              <MaterialIcons name="arrow-forward" size={14} color="#3525cd" />
            </View>
          </Pressable>

        </View>

      </ScrollView>
    </View>
  );
}