import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BuyerOrdersScreen() {
  const [activeFilter, setActiveFilter] = useState('Active');

  const ambientShadow = {
    elevation: 2, 
    shadowColor: '#151c27', 
    shadowOpacity: 0.04, 
    shadowRadius: 16, 
    shadowOffset: { width: 0, height: 4 }
  };

  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false} 
        className="px-4 md:px-8 pt-6"
      >
        
        {/* 1. HORIZONTAL FILTERS */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            {['All', 'Active', 'Completed', 'Cancelled'].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <Pressable 
                  key={filter} 
                  onPress={() => setActiveFilter(filter)} 
                  className={`px-5 py-2.5 rounded-lg mr-3 active:scale-95 ${
                    isActive ? 'bg-buyer-primary' : 'bg-buyer-surface-container-low border border-buyer-outline-variant/10'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-buyer-on-surface-variant'}`}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 2. ACTIVE ORDERS */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-extrabold text-buyer-on-surface tracking-tight">Active Orders</Text>
            <Text className="text-[10px] font-bold text-buyer-primary uppercase tracking-widest">3 In Transit</Text>
          </View>

          <View className="space-y-4">
            
            {/* Active Order Card 1 */}
            <View className="bg-buyer-surface-container-lowest p-6 rounded-xl border-l-4 border-buyer-primary mb-4" style={ambientShadow}>
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-tighter mb-1">PO #8842-120</Text>
                  <Text className="font-extrabold text-buyer-on-surface text-base">TechSystems Global</Text>
                </View>
                <View className="bg-buyer-secondary-container px-2 py-1 rounded">
                  <Text className="text-buyer-on-secondary-container text-[9px] font-bold uppercase">Processing</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-end mb-4">
                <Text className="text-xs text-buyer-outline-variant font-medium">Est. Delivery: <Text className="font-bold text-buyer-on-surface">Oct 24</Text></Text>
                <Text className="text-sm font-black text-buyer-primary">$42,900.00</Text>
              </View>
              <View className="w-full bg-buyer-surface-container-highest h-1.5 rounded-full overflow-hidden mb-2">
                <View className="bg-buyer-primary h-full w-[65%]" />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[9px] font-bold text-buyer-outline uppercase">Confirmed</Text>
                <Text className="text-[9px] font-bold text-buyer-primary uppercase">In Transit</Text>
                <Text className="text-[9px] font-bold text-buyer-outline uppercase">Delivery</Text>
              </View>
            </View>

            {/* Active Order Card 2 */}
            <View className="bg-buyer-surface-container-lowest p-6 rounded-xl border-l-4 border-buyer-secondary mb-4" style={ambientShadow}>
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-tighter mb-1">PO #8845-092</Text>
                  <Text className="font-extrabold text-buyer-on-surface text-base">Nordic Fabrication</Text>
                </View>
                <View className="bg-buyer-tertiary-container px-2 py-1 rounded">
                  <Text className="text-buyer-on-primary text-[9px] font-bold uppercase">On Hold</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-end mb-4">
                <Text className="text-xs text-buyer-outline-variant font-medium">Est. Delivery: <Text className="font-bold text-buyer-on-surface">Nov 02</Text></Text>
                <Text className="text-sm font-black text-buyer-primary">$128,450.00</Text>
              </View>
              <View className="w-full bg-buyer-surface-container-highest h-1.5 rounded-full overflow-hidden mb-2">
                <View className="bg-buyer-secondary h-full w-[25%]" />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[9px] font-bold text-buyer-secondary uppercase">Confirmed</Text>
                <Text className="text-[9px] font-bold text-buyer-outline uppercase">In Transit</Text>
                <Text className="text-[9px] font-bold text-buyer-outline uppercase">Delivery</Text>
              </View>
            </View>
            
          </View>
        </View>

        {/* 3. ORDER HISTORY */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-extrabold text-buyer-on-surface tracking-tight">Order History</Text>
            <Pressable className="flex-row items-center gap-1">
              <Text className="text-xs font-bold text-buyer-primary">View Full Log</Text>
              <MaterialIcons name="arrow-forward" size={14} color="#004ac6" />
            </Pressable>
          </View>

          <View className="bg-buyer-surface-container-lowest rounded-xl overflow-hidden border border-buyer-outline-variant/15">
            
            {/* History Item 1 */}
            <View className="p-5 border-b border-buyer-outline-variant/10 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-buyer-surface-container-low rounded-lg flex items-center justify-center">
                  <MaterialIcons name="local-shipping" size={20} color="#004ac6" />
                </View>
                <View>
                  <Text className="font-bold text-buyer-on-surface text-sm">Vanguard Industrial</Text>
                  <Text className="text-[10px] text-buyer-secondary mt-0.5">PO #8840-221 • Oct 12, 2023</Text>
                </View>
              </View>
              <View className="items-end gap-2">
                <View className="items-end">
                  <Text className="text-sm font-bold text-buyer-on-surface">$18,200.00</Text>
                  <Text className="text-[9px] font-bold text-green-600 uppercase mt-0.5">Delivered</Text>
                </View>
                <Pressable className="bg-buyer-surface-container-high px-3 py-1.5 rounded active:bg-buyer-surface-container-highest transition-colors">
                  <Text className="text-[9px] font-bold text-buyer-on-surface-variant">REORDER</Text>
                </Pressable>
              </View>
            </View>

            {/* History Item 2 */}
            <View className="p-5 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-buyer-surface-container-low rounded-lg flex items-center justify-center">
                  <MaterialIcons name="inventory" size={20} color="#004ac6" />
                </View>
                <View>
                  <Text className="font-bold text-buyer-on-surface text-sm">Apex Micro-Systems</Text>
                  <Text className="text-[10px] text-buyer-secondary mt-0.5">PO #8839-510 • Oct 05, 2023</Text>
                </View>
              </View>
              <View className="items-end gap-2">
                <View className="items-end">
                  <Text className="text-sm font-bold text-buyer-on-surface">$215,000.00</Text>
                  <Text className="text-[9px] font-bold text-green-600 uppercase mt-0.5">Delivered</Text>
                </View>
                <Pressable className="bg-buyer-surface-container-high px-3 py-1.5 rounded active:bg-buyer-surface-container-highest transition-colors">
                  <Text className="text-[9px] font-bold text-buyer-on-surface-variant">REORDER</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </View>

        {/* 4. SELECTION DETAIL */}
        <View className="mb-4 bg-buyer-surface-container-low rounded-2xl p-6 border border-buyer-outline-variant/20">
          <View className="flex-row items-center gap-2 mb-6">
            <MaterialIcons name="analytics" size={22} color="#004ac6" />
            <Text className="text-lg font-extrabold text-buyer-on-surface">Selection Detail</Text>
          </View>

          <View className="bg-buyer-surface-container-lowest p-4 rounded-xl border-l-2 border-buyer-primary shadow-sm shadow-black/5 mb-6">
            <Text className="text-[9px] font-bold text-buyer-outline uppercase mb-1">Currently Viewing</Text>
            <Text className="font-extrabold text-buyer-on-surface text-base">PO #8842-120</Text>
            <Text className="text-xs text-buyer-secondary font-medium">TechSystems Global</Text>
          </View>

          <View className="space-y-3 mb-6">
            <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-widest">Order Summary</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-buyer-on-surface-variant font-medium">Aluminum Chassis-B</Text>
              <Text className="text-sm font-bold text-buyer-on-surface">2,500 units</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-buyer-on-surface-variant font-medium">Custom Wiring Loom</Text>
              <Text className="text-sm font-bold text-buyer-on-surface">500 units</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-buyer-on-surface-variant font-medium">Control Panels V3</Text>
              <Text className="text-sm font-bold text-buyer-on-surface">120 units</Text>
            </View>
          </View>

          <View className="pt-4 border-t border-buyer-outline-variant/20 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm text-buyer-secondary font-medium">Subtotal</Text>
              <Text className="text-sm font-bold text-buyer-on-surface">$38,100.00</Text>
            </View>
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-sm text-buyer-secondary font-medium">Logistics Fee</Text>
              <Text className="text-sm font-bold text-buyer-on-surface">$4,800.00</Text>
            </View>
            
            <View className="p-4 bg-buyer-primary rounded-xl flex-row justify-between items-center">
              <Text className="text-buyer-primary-fixed-dim text-xs font-bold uppercase tracking-wider">Total Amount</Text>
              <Text className="text-white font-black text-xl">$42,900.00</Text>
            </View>
          </View>

          <View className="space-y-3">
            <Pressable className="w-full py-4 bg-buyer-surface-container-lowest border border-buyer-primary-container/20 rounded-xl active:bg-buyer-surface-container transition-colors items-center justify-center">
              <Text className="text-buyer-primary font-bold text-sm tracking-wide">TRACK SHIPMENT</Text>
            </Pressable>
            <Pressable className="w-full py-4 rounded-xl active:bg-buyer-surface-container-highest transition-colors items-center justify-center">
              <Text className="text-buyer-on-surface-variant font-bold text-sm tracking-wide">CONTACT SUPPLIER</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}