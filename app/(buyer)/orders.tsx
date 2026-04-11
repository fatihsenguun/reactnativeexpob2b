import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useOrderStore, Order } from '../../src/store/useOrderStore';

export default function BuyerOrdersScreen() {
  const { orders, isLoading, fetchOrders } = useOrderStore();
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Fetch orders when the screen loads
  useEffect(() => {
    fetchOrders('BUYER');
  }, []);

  // Automatically select the first order when data loads so the "Selection Detail" isn't empty
  useEffect(() => {
    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders]);

  const ambientShadow = {
    elevation: 2, 
    shadowColor: '#151c27', 
    shadowOpacity: 0.04, 
    shadowRadius: 16, 
    shadowOffset: { width: 0, height: 4 }
  };

  // Helper: Map backend status to progress bar width
  const getProgressWidth = (status: string) => {
    switch(status) {
      case 'PENDING': return '15%';
      case 'CONFIRMED': return '50%';
      case 'SHIPPED': return '85%';
      case 'DELIVERED': return '100%';
      default: return '0%';
    }
  };

  // 1. FILTER LOGIC
  const activeStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED'];
  
  const filteredActiveOrders = orders.filter(o => activeStatuses.includes(o.status));
  const filteredCompletedOrders = orders.filter(o => o.status === 'DELIVERED');
  const filteredCancelledOrders = orders.filter(o => o.status === 'CANCELLED');

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  // If loading, show a spinner
  if (isLoading && orders.length === 0) {
    return (
      <View className="flex-1 bg-buyer-surface items-center justify-center">
        <ActivityIndicator size="large" color="#004ac6" />
        <Text className="mt-4 font-bold text-buyer-outline">Syncing with TradeFlow...</Text>
      </View>
    );
  }

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
                  className={`px-5 py-2.5 rounded-lg mr-3 active:scale-95 transition-colors ${
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

        {/* 2. ACTIVE ORDERS SECTION (Hidden if viewing Completed/Cancelled) */}
        {(activeFilter === 'All' || activeFilter === 'Active') && (
          <View className="mb-10">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-extrabold text-buyer-on-surface tracking-tight">Active Orders</Text>
              <Text className="text-[10px] font-bold text-buyer-primary uppercase tracking-widest">
                {filteredActiveOrders.length} In Progress
              </Text>
            </View>

            <View className="space-y-4">
              {filteredActiveOrders.length === 0 ? (
                 <Text className="text-sm font-medium text-buyer-outline-variant italic">No active orders right now.</Text>
              ) : (
                filteredActiveOrders.map((order) => (
                  <Pressable 
                    key={order.id}
                    onPress={() => setSelectedOrderId(order.id)}
                    className={`bg-buyer-surface-container-lowest p-6 rounded-xl border-l-4 mb-4 ${
                      selectedOrderId === order.id ? 'border-buyer-primary bg-buyer-surface-container-low' : 'border-buyer-secondary'
                    }`} 
                    style={ambientShadow}
                  >
                    <View className="flex-row justify-between items-start mb-4">
                      <View>
                        <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-tighter mb-1">{order.orderNumber}</Text>
                        <Text className="font-extrabold text-buyer-on-surface text-base">{order.shop?.name || 'Unknown Supplier'}</Text>
                      </View>
                      <View className="bg-buyer-secondary-container px-2 py-1 rounded">
                        <Text className="text-buyer-on-secondary-container text-[9px] font-bold uppercase">{order.status}</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-end mb-4">
                      <Text className="text-xs text-buyer-outline-variant font-medium">
                        Placed: <Text className="font-bold text-buyer-on-surface">{new Date(order.createdAt).toLocaleDateString()}</Text>
                      </Text>
                      <Text className="text-sm font-black text-buyer-primary">${order.totalAmount?.toFixed(2)}</Text>
                    </View>
                    <View className="w-full bg-buyer-surface-container-highest h-1.5 rounded-full overflow-hidden mb-2">
                      <View className="bg-buyer-primary h-full transition-all" style={{ width: getProgressWidth(order.status) }} />
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-[9px] font-bold text-buyer-outline uppercase">Confirmed</Text>
                      <Text className="text-[9px] font-bold text-buyer-primary uppercase">In Transit</Text>
                      <Text className="text-[9px] font-bold text-buyer-outline uppercase">Delivery</Text>
                    </View>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        )}

        {/* 3. ORDER HISTORY SECTION (Completed & Cancelled) */}
        {(activeFilter === 'All' || activeFilter === 'Completed' || activeFilter === 'Cancelled') && (
          <View className="mb-10">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-extrabold text-buyer-on-surface tracking-tight">Order History</Text>
              <Pressable className="flex-row items-center gap-1">
                <Text className="text-xs font-bold text-buyer-primary">View Full Log</Text>
                <MaterialIcons name="arrow-forward" size={14} color="#004ac6" />
              </Pressable>
            </View>

            <View className="bg-buyer-surface-container-lowest rounded-xl overflow-hidden border border-buyer-outline-variant/15">
              
              {/* Combine Delivered and Cancelled based on filters */}
              {orders
                .filter(o => {
                   if (activeFilter === 'Completed') return o.status === 'DELIVERED';
                   if (activeFilter === 'Cancelled') return o.status === 'CANCELLED';
                   return o.status === 'DELIVERED' || o.status === 'CANCELLED'; // 'All' fallback
                })
                .map((order, index, array) => (
                <Pressable 
                  key={order.id}
                  onPress={() => setSelectedOrderId(order.id)}
                  className={`p-5 flex-row items-center justify-between ${
                    index !== array.length - 1 ? 'border-b border-buyer-outline-variant/10' : ''
                  } ${selectedOrderId === order.id ? 'bg-buyer-surface-container-low' : ''}`}
                >
                  <View className="flex-row items-center gap-4">
                    <View className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      order.status === 'DELIVERED' ? 'bg-buyer-surface-container-low' : 'bg-red-50'
                    }`}>
                      <MaterialIcons 
                        name={order.status === 'DELIVERED' ? "local-shipping" : "cancel"} 
                        size={20} 
                        color={order.status === 'DELIVERED' ? "#004ac6" : "#ba1a1a"} 
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-buyer-on-surface text-sm">{order.shop?.name || 'Unknown Supplier'}</Text>
                      <Text className="text-[10px] text-buyer-secondary mt-0.5">{order.orderNumber} • {new Date(order.createdAt).toLocaleDateString()}</Text>
                    </View>
                  </View>
                  <View className="items-end gap-2">
                    <View className="items-end">
                      <Text className="text-sm font-bold text-buyer-on-surface">${order.totalAmount?.toFixed(2)}</Text>
                      <Text className={`text-[9px] font-bold uppercase mt-0.5 ${
                        order.status === 'DELIVERED' ? 'text-green-600' : 'text-error'
                      }`}>
                        {order.status}
                      </Text>
                    </View>
                    {order.status === 'DELIVERED' && (
                      <Pressable className="bg-buyer-surface-container-high px-3 py-1.5 rounded active:bg-buyer-surface-container-highest transition-colors">
                        <Text className="text-[9px] font-bold text-buyer-on-surface-variant">REORDER</Text>
                      </Pressable>
                    )}
                  </View>
                </Pressable>
              ))}

              {(activeFilter === 'Completed' && filteredCompletedOrders.length === 0) || 
               (activeFilter === 'Cancelled' && filteredCancelledOrders.length === 0) ? (
                 <View className="p-5">
                   <Text className="text-sm font-medium text-buyer-outline-variant italic">No records found for this filter.</Text>
                 </View>
              ) : null}

            </View>
          </View>
        )}

        {/* 4. SELECTION DETAIL (Dynamic based on selectedOrder) */}
        {selectedOrder && (
          <View className="mb-4 bg-buyer-surface-container-low rounded-2xl p-6 border border-buyer-outline-variant/20">
            <View className="flex-row items-center gap-2 mb-6">
              <MaterialIcons name="analytics" size={22} color="#004ac6" />
              <Text className="text-lg font-extrabold text-buyer-on-surface">Selection Detail</Text>
            </View>

            <View className="bg-buyer-surface-container-lowest p-4 rounded-xl border-l-2 border-buyer-primary shadow-sm shadow-black/5 mb-6">
              <Text className="text-[9px] font-bold text-buyer-outline uppercase mb-1">Currently Viewing</Text>
              <Text className="font-extrabold text-buyer-on-surface text-base">{selectedOrder.orderNumber}</Text>
              <Text className="text-xs text-buyer-secondary font-medium">{selectedOrder.shop?.name || 'Supplier'}</Text>
            </View>

            <View className="space-y-3 mb-6">
              <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-widest">Order Items</Text>
              
              {/* Map through dynamic order items */}
              {selectedOrder.items?.map((item) => (
                <View key={item.id} className="flex-row justify-between items-center border-b border-buyer-outline-variant/5 pb-2">
                  <View>
                    <Text className="text-sm text-buyer-on-surface-variant font-medium">Product ID: {item.productId.substring(0,8)}...</Text>
                    <Text className="text-[10px] text-buyer-outline">@ ${item.priceAtPurchase.toFixed(2)} ea</Text>
                  </View>
                  <Text className="text-sm font-bold text-buyer-on-surface">{item.quantity} units</Text>
                </View>
              ))}
            </View>

            <View className="pt-4 border-t border-buyer-outline-variant/20 mb-6">
              {/* Calculate Subtotal dynamically from items if backend doesn't provide a top-level subTotal */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-buyer-secondary font-medium">Subtotal</Text>
                <Text className="text-sm font-bold text-buyer-on-surface">
                  ${selectedOrder.items?.reduce((acc, item) => acc + (item.quantity * item.priceAtPurchase), 0).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-sm text-buyer-secondary font-medium">Logistics Fee</Text>
                <Text className="text-sm font-bold text-buyer-on-surface">${selectedOrder.shippingFee?.toFixed(2) || '0.00'}</Text>
              </View>
              
              <View className="p-4 bg-buyer-primary rounded-xl flex-row justify-between items-center">
                <Text className="text-buyer-primary-fixed-dim text-xs font-bold uppercase tracking-wider">Total Amount</Text>
                <Text className="text-white font-black text-xl">${selectedOrder.totalAmount?.toFixed(2)}</Text>
              </View>
            </View>

            <View className="space-y-3">
              {['PENDING', 'CONFIRMED', 'SHIPPED'].includes(selectedOrder.status) && (
                <Pressable className="w-full py-4 bg-buyer-surface-container-lowest border border-buyer-primary-container/20 rounded-xl active:bg-buyer-surface-container transition-colors items-center justify-center">
                  <Text className="text-buyer-primary font-bold text-sm tracking-wide">TRACK SHIPMENT</Text>
                </Pressable>
              )}
              <Pressable className="w-full py-4 rounded-xl active:bg-buyer-surface-container-highest transition-colors items-center justify-center">
                <Text className="text-buyer-on-surface-variant font-bold text-sm tracking-wide">CONTACT SUPPLIER</Text>
              </Pressable>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}