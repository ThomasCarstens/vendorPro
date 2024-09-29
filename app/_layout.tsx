import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data
const machines = [
  { id: '1', name: "Mall Entrance", urgency: "high", location: { rating: 4.5, footTraffic: "High", competition: "Low" }, lastInteraction: "2023-09-15", contract: { start: "2023-01-01", end: "2024-12-31" } },
  { id: '2', name: "Office Building", urgency: "medium", location: { rating: 3.8, footTraffic: "Medium", competition: "Medium" }, lastInteraction: "2023-08-20", contract: { start: "2023-03-01", end: "2025-02-28" } },
  { id: '3', name: "University Campus", urgency: "low", location: { rating: 4.2, footTraffic: "High", competition: "High" }, lastInteraction: "2023-09-01", contract: { start: "2023-06-01", end: "2024-05-31" } },
];

const inventory = [
  { id: '1', product: "Soda", stock: 150, optimal: 200, expirationDate: "2024-03-15" },
  { id: '2', product: "Chips", stock: 80, optimal: 100, expirationDate: "2023-12-31" },
  { id: '3', product: "Candy Bars", stock: 100, optimal: 120, expirationDate: "2024-06-30" },
];

const routes = [
  { id: '1', name: "Monday Route", machines: ["Mall Entrance", "Office Building"], urgency: "high" },
  { id: '2', name: "Wednesday Route", machines: ["University Campus"], urgency: "medium" },
];

const equipment = [
  { id: '1', model: "VendMaster 3000", location: "Mall Entrance", lastMaintenance: "2023-08-15", nextMaintenance: "2023-11-15" },
  { id: '2', model: "SnackPro 500", location: "Office Building", lastMaintenance: "2023-09-01", nextMaintenance: "2023-12-01" },
];

const financials = [
  { id: '1', machine: "Mall Entrance", revenue: 5000, costs: 3000, profit: 2000 },
  { id: '2', machine: "Office Building", revenue: 3500, costs: 2000, profit: 1500 },
  { id: '3', machine: "University Campus", revenue: 4000, costs: 2500, profit: 1500 },
];

const suppliers = [
  { id: '1', name: "Soda Supplier Inc.", lastOrder: "2023-08-15", nextOrderDue: "2023-10-15" },
  { id: '2', name: "Snack Foods Co.", lastOrder: "2023-09-01", nextOrderDue: "2023-11-01" },
];

const TabButton = ({ isActive, onPress, icon, label }) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTabButton]}
    onPress={onPress}
  >
    <Ionicons name={icon} size={24} color={isActive ? "white" : "black"} />
    <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>{label}</Text>
  </TouchableOpacity>
);

const MachineCard = ({ machine }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{machine.name}</Text>
    <Text>Urgency: {machine.urgency}</Text>
    <Text>Location Rating: {machine.location.rating}</Text>
    <Text>Foot Traffic: {machine.location.footTraffic}</Text>
    <Text>Competition: {machine.location.competition}</Text>
    <Text>Last Interaction: {machine.lastInteraction}</Text>
    <Text>Contract: {machine.contract.start} - {machine.contract.end}</Text>
  </View>
);

const InventoryCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.product}</Text>
    <Text>Current Stock: {item.stock}</Text>
    <Text>Optimal Stock: {item.optimal}</Text>
    <Text>Expiration Date: {item.expirationDate}</Text>
  </View>
);

const RouteCard = ({ route }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{route.name}</Text>
    <Text>Machines: {route.machines.join(', ')}</Text>
    <Text>Urgency: {route.urgency}</Text>
  </View>
);

const EquipmentCard = ({ equipment }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{equipment.model}</Text>
    <Text>Location: {equipment.location}</Text>
    <Text>Last Maintenance: {equipment.lastMaintenance}</Text>
    <Text>Next Maintenance: {equipment.nextMaintenance}</Text>
  </View>
);

const FinancialCard = ({ financial }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{financial.machine}</Text>
    <Text>Revenue: ${financial.revenue}</Text>
    <Text>Costs: ${financial.costs}</Text>
    <Text>Profit: ${financial.profit}</Text>
  </View>
);

const SupplierCard = ({ supplier }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{supplier.name}</Text>
    <Text>Last Order: {supplier.lastOrder}</Text>
    <Text>Next Order Due: {supplier.nextOrderDue}</Text>
  </View>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('machines');

  const renderContent = () => {
    switch(activeTab) {
      case 'machines':
        return (
          <FlatList
            data={machines}
            renderItem={({ item }) => <MachineCard machine={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'inventory':
        return (
          <FlatList
            data={inventory}
            renderItem={({ item }) => <InventoryCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'routes':
        return (
          <FlatList
            data={routes}
            renderItem={({ item }) => <RouteCard route={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'equipment':
        return (
          <FlatList
            data={equipment}
            renderItem={({ item }) => <EquipmentCard equipment={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'financials':
        return (
          <FlatList
            data={financials}
            renderItem={({ item }) => <FinancialCard financial={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'community':
        return (
          <ScrollView contentContainerStyle={styles.list}>
            <Text style={styles.sectionTitle}>Community Forum</Text>
            <Text>Forum discussions would be displayed here.</Text>
            <Text style={styles.sectionTitle}>Knowledge Base</Text>
            <Text>Knowledge base articles would be listed here.</Text>
            <Text style={styles.sectionTitle}>Local Mentors</Text>
            <Text>A list of local mentors would be shown here.</Text>
          </ScrollView>
        );
      case 'suppliers':
        return (
          <FlatList
            data={suppliers}
            renderItem={({ item }) => <SupplierCard supplier={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        );
      case 'time':
        return (
          <ScrollView contentContainerStyle={styles.list}>
            <Text style={styles.sectionTitle}>Time Tracking</Text>
            <Text>Time tracking features would be displayed here.</Text>
            <Text style={styles.sectionTitle}>Time Usage Insights</Text>
            <Text>Insights on time optimization would be shown here.</Text>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>VendorPro</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        <TabButton isActive={activeTab === 'machines'} onPress={() => setActiveTab('machines')} icon="location" label="Machines" />
        <TabButton isActive={activeTab === 'inventory'} onPress={() => setActiveTab('inventory')} icon="cube" label="Inventory" />
        <TabButton isActive={activeTab === 'routes'} onPress={() => setActiveTab('routes')} icon="map" label="Routes" />
        <TabButton isActive={activeTab === 'equipment'} onPress={() => setActiveTab('equipment')} icon="build" label="Equipment" />
        <TabButton isActive={activeTab === 'financials'} onPress={() => setActiveTab('financials')} icon="cash" label="Financials" />
        <TabButton isActive={activeTab === 'community'} onPress={() => setActiveTab('community')} icon="people" label="Community" />
        <TabButton isActive={activeTab === 'suppliers'} onPress={() => setActiveTab('suppliers')} icon="cart" label="Suppliers" />
        <TabButton isActive={activeTab === 'time'} onPress={() => setActiveTab('time')} icon="time" label="Time" />
      </ScrollView>
      {renderContent()}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabButtonText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTabButtonText: {
    color: 'white',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default App;