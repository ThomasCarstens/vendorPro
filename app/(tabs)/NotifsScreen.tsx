import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const notifications = {
  etudiant: [
    {
      id: '1',
      type: 'new',
      content: 'Nouvelle Formation de Médecine Manuelle (Ostéopathie Médicale)',
      date: '2024-09-10',
      icon: 'school-outline'
    },
    {
      id: '4',
      type: 'reminder',
      content: 'Il vous reste 3 jours pour rejoindre la formation de Nutrition Clinique',
      date: '2024-09-06',
      icon: 'time-outline'
    },
  ],
  formateur: [
    {
      id: '1',
      type: 'new_student',
      content: 'Nouvel étudiant inscrit à Formation de Médecine Manuelle',
      date: '2024-09-10',
      icon: 'person-add-outline'
    },
    {
      id: '2',
      type: 'closing_soon',
      content: 'Inscriptions closes dans 3 jours pour Formation de Nutrition Clinique',
      date: '2024-09-08',
      icon: 'timer-outline'
    },
  ],
  admin: [
    {
      id: '1',
      type: 'new_trainer',
      content: 'Nouveau Profil Formateur à valider',
      date: '2024-09-10',
      icon: 'person-outline'
    },
    {
      id: '2',
      type: 'new_formation',
      content: 'Nouvelle Formation à valider',
      date: '2024-09-08',
      icon: 'clipboard-outline'
    },
  ]
};

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Ionicons name={item.icon} size={24} color="#007AFF" style={styles.icon} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationText}>{item.content}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  </View>
);

const NotificationsList = ({ role }) => (
  <FlatList
    data={notifications[role]}
    renderItem={({ item }) => <NotificationItem item={item} />}
    keyExtractor={item => item.id}
  />
);

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState('etudiant');

  const tabs = ['etudiant', 'formateur', 'admin'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <NotificationsList role={activeTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationsScreen;