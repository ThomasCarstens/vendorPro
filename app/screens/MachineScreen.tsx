import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Tab, TabView, Card, Button, Icon } from '@rneui/themed';
import { Calendar } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const MachineDetailScreen = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState('Cola');
  const { machine } = route.params;

  const stockItems = [
    { name: 'Cola', current: 15, total: 60 },
    { name: 'Chips', current: 8, total: 15 },
    { name: 'Candy', current: 12, total: 25 },
    { name: 'Extra Stock', current: 30 },
  ];

  const popularityData = {
    Cola: {
      '2024-10-15': { marked: true, dotColor: 'red' },
      '2024-10-20': { marked: true, dotColor: 'red' },
    },
    Chips: {
      '2024-10-18': { marked: true, dotColor: 'blue' },
      '2024-10-25': { marked: true, dotColor: 'blue' },
    },
    Candy: {
      '2024-10-12': { marked: true, dotColor: 'green' },
      '2024-10-22': { marked: true, dotColor: 'green' },
    },
  };

  const InventoryTab = () => (
    <ScrollView style={styles.tabContent}>
      <Image source={machine.image} style={styles.image} />
      
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      
      <Text style={styles.imageText}>{machine.name}</Text>
      {stockItems.map((item, index) => (
        <Card key={index} containerStyle={styles.card}>
          <View style={styles.stockRow}>
            <Text style={styles.stockName}>{item.name}</Text>
            <View style={styles.stockInfo}>
              <Text style={styles.stockCurrent}>{item.current}</Text>
              {item.total && (
                <>
                  <Text style={styles.stockSeparator}>/</Text>
                  <Text style={styles.stockTotal}>{item.total}</Text>
                </>
              )}
            </View>
          </View>
          {item.total && (
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${(item.current / item.total) * 100}%` }]} />
            </View>
          )}
        </Card>
      ))}


    </ScrollView>
  );

  const PopularTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.itemSelector}>
        {Object.keys(popularityData).map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.itemButton, selectedItem === item && styles.selectedItemButton]}
            onPress={() => setSelectedItem(item)}
          >
            <Text style={[styles.itemButtonText, selectedItem === item && styles.selectedItemButtonText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>Popularity Calendar for {selectedItem}</Text>
        <Calendar
          markedDates={popularityData[selectedItem]}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00adf5',
            monthTextColor: '#2d4150',
            indicatorColor: '#00adf5',
          }}
        />
      </Card>
    </ScrollView>
  );

  const RestockTab = () => (
    <ScrollView style={[styles.tabContent, styles.restockTab]}>
      <Card containerStyle={styles.restockCard}>
        <Icon
          name="calendar-refresh"
          type="material-community"
          color="#ffffff"
          size={40}
          containerStyle={styles.restockIcon}
        />
        <Text style={styles.restockTitle}>Upcoming Restocks</Text>
        <View style={styles.restockItem}>
          <Icon name="calendar-today" type="material" color="#ffffff" size={24} />
          <Text style={styles.restockText}>October 15, 2024 - Full Restock</Text>
        </View>
        <View style={styles.restockItem}>
          <Icon name="local-drink" type="material" color="#ffffff" size={24} />
          <Text style={styles.restockText}>October 30, 2024 - Partial Restock (Beverages)</Text>
        </View>
        <View style={styles.restockItem}>
          <Icon name="calendar-today" type="material" color="#ffffff" size={24} />
          <Text style={styles.restockText}>November 15, 2024 - Full Restock</Text>
        </View>
      </Card>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tabIndicator}
        variant="primary"
      >
        <Tab.Item
          title="Inventory"
          titleStyle={styles.tabTitle}
          icon={{ name: 'cube-outline', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Popular"
          titleStyle={styles.tabTitle}
          icon={{ name: 'trending-up', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Restock"
          titleStyle={styles.tabTitle}
          icon={{ name: 'refresh', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <InventoryTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <PopularTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <RestockTab />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  tabContent: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  stockName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockCurrent: {
    color: '#00ADF5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockSeparator: {
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 5,
  },
  stockTotal: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#00ADF5',
  },
  itemSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  itemButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  selectedItemButton: {
    backgroundColor: '#00ADF5',
  },
  itemButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedItemButtonText: {
    color: '#1E1E1E',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restockTab: {
    backgroundColor: '#1E1E1E',
  },
  restockCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
  },
  restockIcon: {
    backgroundColor: '#00ADF5',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  restockTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  restockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  restockText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  tabIndicator: {
    backgroundColor: '#00ADF5',
    height: 3,
  },
  tabTitle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default MachineDetailScreen;