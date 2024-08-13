import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';

const NotifsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Check if notifications are enabled when the component mounts
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = () => {
    // In a real app, you would check the actual notification permissions here
    // For this example, we'll just use the state
    if (!isNotificationsEnabled) {
      Alert.alert(
        "Notifications Désactivées",
        "Voulez-vous activer les notifications pour rester informé des nouvelles formations ?",
        [
          { text: "Non", style: "cancel" },
          { text: "Oui", onPress: () => setIsNotificationsEnabled(true) }
        ]
      );
    }
  };

  const toggleNotifications = () => {
    // In a real app, you would request permission here if not already granted
    setIsNotificationsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres de Notifications</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Activer les notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>
      <Text style={styles.description}>
        Activez les notifications pour recevoir des mises à jour sur les nouvelles formations et les événements importants.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});

export default NotifsScreen;