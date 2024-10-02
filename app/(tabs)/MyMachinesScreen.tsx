import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const machines = [
  {
    name: 'Seapoint FNB',
    image: require('../../assets/images/spoofMachines/seapoint-fnb.png'),
    stockStatus: '75% full',
    popularItem: 'Cola, Redbull',
    moneyMade: '$500',
    lastService: '2024-09-15',
    photoTime: '2024-09-10 14:30'
  },
  {
    name: 'Protea Hotel',
    image: require('../../assets/images/spoofMachines/protea-hotel.png'),
    stockStatus: '60% full',
    popularItem: 'None',
    moneyMade: '$750',
    lastService: '2024-09-10',
    photoTime: '2024-09-10 14:30'
  },
  {
    name: 'Trevor',
    image: require('../../assets/images/spoofMachines/trevor.png'),
    stockStatus: '90% full',
    popularItem: 'Lays, Doritos',
    moneyMade: '$300',
    lastService: '2024-09-20',
    photoTime: '2024-09-10 14:30'
  },
];



const MyMachinesScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Machines',
      headerStyle: {
        backgroundColor: '#1a53ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });
  }, [navigation]);
  const MachineCard = ({ machine }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("Machine", {machine: machine})}>
      <Card.Content>
        <Text style={styles.cardTitle}>{machine.name}</Text>
        <Image source={machine.image} style={styles.machineImage} />
        <Text>Photo Taken: {machine.photoTime}</Text>
        <Text>Running Low: {machine.popularItem}</Text>
        <Text>Stock Status: {machine.stockStatus}</Text>
        <Text>Profit in Machine: {machine.moneyMade}</Text>
        <Text>Last Service Date: {machine.lastService}</Text>
      </Card.Content>
    </Card>
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {machines.map((machine, index) => (
          <MachineCard key={index} machine={machine} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AjoutMachine")}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  machineImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MyMachinesScreen;