import React, { useEffect, useCallback, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useOrderStore } from '../../src/store/useOrderStore';

// --- STRICT TYPES FOR OUR UI COMPONENT ---
interface OrderListItemProps {
  orderNumber: string;
  supplierName: string;
  totalAmount: number;
  status: string;
  date: string;
}

// --- SUB-COMPONENT: DYNAMIC ORDER LIST ITEM (Clean "Normal Box" Design) ---
const OrderListItem = ({ orderNumber, supplierName, totalAmount, status, date }: OrderListItemProps) => {

  // Colors are ONLY kept for the small status pill and progress bar, NOT the box borders
  const getStatusStyles = (currentStatus: string) => {
    switch(currentStatus) {
      case 'PENDING': 
        return { pillBg: 'bg-amber-100', pillText: 'text-amber-800', progressW: 'w-[25%]', progressBg: 'bg-amber-400' };
      case 'CONFIRMED': 
        return { pillBg: 'bg-blue-100', pillText: 'text-blue-800', progressW: 'w-[50%]', progressBg: 'bg-blue-500' };
      case 'SHIPPED': 
        return { pillBg: 'bg-indigo-100', pillText: 'text-indigo-800', progressW: 'w-[75%]', progressBg: 'bg-indigo-500' };
      case 'DELIVERED': 
        return { pillBg: 'bg-emerald-100', pillText: 'text-emerald-800', progressW: 'w-[100%]', progressBg: 'bg-emerald-500' };
      case 'CANCELLED': 
        return { pillBg: 'bg-rose-100', pillText: 'text-rose-800', progressW: 'w-[100%]', progressBg: 'bg-rose-500' };
      default: 
        return { pillBg: 'bg-gray-100', pillText: 'text-gray-800', progressW: 'w-[0%]', progressBg: 'bg-gray-400' };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <Pressable 
      // Clean, normal white box with a standard border (No colored side lines!)
      className="bg-white p-5 rounded-2xl shadow-sm border border-buyer-outline-variant/20 mb-4 active:bg-buyer-surface-container-low transition-colors"
      style={{ elevation: 2, shadowColor: '#151c27', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }}
    >
      <View className="flex-row justify-between items-start mb-4">
        <View>
          <Text className="text-[10px] font-bold text-buyer-outline uppercase tracking-widest mb-1">{orderNumber}</Text>
          <Text className="font-bold text-buyer-on-surface text-base">{supplierName}</Text>
        </View>
        {/* Status Pill */}
        <View className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${styles.pillBg}`}>
          <Text className={styles.pillText}>{status}</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between items-end mb-4">
        <Text className="text-xs font-medium text-buyer-on-surface-variant">Placed: <Text className="font-bold text-buyer-on-surface">{new Date(date).toLocaleDateString()}</Text></Text>
        <Text className="font-black text-buyer-primary text-base">${Number(totalAmount).toFixed(2)}</Text>
      </View>

      {/* Progress Bar (Hidden if Cancelled) */}
      {status !== 'CANCELLED' && (
        <View className="mt-2 pt-4 border-t border-buyer-outline-variant/10">
          <View className="w-full bg-buyer-surface-container-high h-1.5 rounded-full overflow-hidden mb-2">
            <View className={`h-full ${styles.progressBg} ${styles.progressW}`} />
          </View>
          <View className="flex-row justify-between px-1">
            <Text className={`text-[9px] font-bold uppercase ${status === 'PENDING' || status === 'CONFIRMED' ? 'text-buyer-primary' : 'text-buyer-outline'}`}>Confirmed</Text>
            <Text className={`text-[9px] font-bold uppercase text-center ${status === 'SHIPPED' ? 'text-buyer-primary' : 'text-buyer-outline'}`}>In Transit</Text>
            <Text className={`text-[9px] font-bold uppercase text-right ${status === 'DELIVERED' ? 'text-buyer-primary' : 'text-buyer-outline'}`}>Delivery</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};


// ==========================================
// MAIN SCREEN COMPONENT
// ==========================================
export default function BuyerOrdersScreen() {
  const { orders, isLoading, fetchOrders } = useOrderStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders('BUYER');
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders('BUYER');
    setRefreshing(false);
  }, [fetchOrders]);

  // Filter the orders based on BOTH the selected tab AND the search input
  const filteredOrders = orders.filter(order => {
    let matchesTab = false;
    if (activeTab === 'All') matchesTab = true;
    if (activeTab === 'Active') matchesTab = ['PENDING', 'CONFIRMED', 'SHIPPED'].includes(order.status);
    if (activeTab === 'Completed') matchesTab = order.status === 'DELIVERED';
    if (activeTab === 'Cancelled') matchesTab = order.status === 'CANCELLED';

    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const supplierName = order.shop?.companyName?.toLowerCase() || '';
      const orderNumber = order.orderNumber?.toLowerCase() || '';
      matchesSearch = supplierName.includes(query) || orderNumber.includes(query);
    }

    return matchesTab && matchesSearch;
  });

  const TABS = ['All', 'Active', 'Completed', 'Cancelled'] as const;

  return (
    <View className="flex-1 bg-buyer-surface">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }} 
        showsVerticalScrollIndicator={false}
        className="px-4 md:px-8 pt-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#004ac6" />
        }
      >
        
        {/* HEADER TITLE */}
      

        {/* SEARCH BOX (Matches Home Page Exactly) */}
        <View className="mb-6">
          <View className="relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={24} color="#737686" />
            </View>
            <TextInput 
              className="w-full bg-buyer-surface-container-highest rounded-xl py-4 pl-12 pr-4 text-buyer-on-surface font-medium"
              placeholder="Search orders, suppliers..."
              placeholderTextColor="#737686"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* TABS */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            {TABS.map((tab) => (
              <Pressable 
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg mr-2 transition-colors ${activeTab === tab ? 'bg-buyer-primary' : 'bg-buyer-surface-container-highest active:opacity-70'}`}
              >
                <Text className={`text-sm font-bold ${activeTab === tab ? 'text-white' : 'text-buyer-on-surface-variant'}`}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* LIST HEADER */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-buyer-on-surface">
            {searchQuery ? 'Search Results' : (activeTab === 'All' ? 'Order History' : `${activeTab} Orders`)}
          </Text>
          {activeTab === 'Active' && !searchQuery && (
            <Text className="text-[10px] font-bold text-buyer-primary uppercase tracking-widest">{filteredOrders.length} IN PROGRESS</Text>
          )}
        </View>

        {/* ORDER LIST CARDS */}
        <View>
          {isLoading && !refreshing ? (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#004ac6" />
            </View>
          ) : filteredOrders.length === 0 ? (
            <View className="py-10 items-center justify-center bg-buyer-surface-container-lowest rounded-xl border border-buyer-outline-variant/20">
              <MaterialIcons name="inventory-2" size={48} color="#c3c6d7" />
              <Text className="mt-4 font-bold text-buyer-on-surface-variant">No {activeTab.toLowerCase()} orders found.</Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <OrderListItem 
                key={order.id}
                orderNumber={order.orderNumber}
                supplierName={order.shop?.companyName || 'Unknown Supplier'}
                totalAmount={order.totalAmount}
                status={order.status}
                date={order.createdAt}
              />
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}