import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InscriptionScreen = ({ navigation, route }) => {
  const { isValidated } = route.params || { isValidated: false };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      {isValidated && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AjoutFormation')}
        >
          <Text style={styles.buttonText}>Créer une formation</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RechercheFormations')}
      >
        <Text style={styles.buttonText}>Recherche formations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profil')}
      >
        <Text style={styles.buttonText}>Modifier mon profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Notifs')}
      >
        <Text style={styles.buttonText}>Activer mes Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default InscriptionScreen;