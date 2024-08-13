import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const RechercheFormationsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formations, setFormations] = useState([
    { id: '1', title: 'Cardiologie avancée', date: '2024-09-15' },
    { id: '2', title: 'Nouvelles techniques en pédiatrie', date: '2024-10-01' },
    { id: '3', title: 'Gestion du stress en médecine d\'urgence', date: '2024-10-20' },
  ]);

  const renderFormationItem = ({ item }) => (
    <TouchableOpacity style={styles.formationItem}>
      <Text style={styles.formationTitle}>{item.title}</Text>
      <Text style={styles.formationDate}>Date: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche Formations</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une formation..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={formations}
        renderItem={renderFormationItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
  },
  formationItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  formationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formationDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default RechercheFormationsScreen;