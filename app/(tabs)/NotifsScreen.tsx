import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  {
    id: '1',
    type: 'new',
    content: 'Nouvelle Formation de Médecine Manuelle (Ostéopathie Médicale)',
    date: '2024-09-10'
  },
  {
    id: '2',
    type: 'delete',
    content: 'Suppression Formation de Kinésithérapie Sportive',
    date: '2024-09-08'
  },
  {
    id: '3',
    type: 'modify',
    content: 'Modification Formation de Réadaptation Cardiovasculaire',
    date: '2024-09-07'
  },
  {
    id: '4',
    type: 'reminder',
    content: 'Il vous reste 3 jours pour rejoindre la formation de Nutrition Clinique',
    date: '2024-09-06'
  },
  {
    id: '5',
    type: 'new',
    content: 'Nouvelle Formation de Thérapie Manuelle Neurodynamique',
    date: '2024-09-05'
  }
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationContent}>{item.content}</Text>
    <Text style={styles.notificationDate}>{item.date}</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <FlatList
      data={notifications}
      renderItem={({ item }) => <NotificationItem item={item} />}
      keyExtractor={item => item.id}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationsScreen;