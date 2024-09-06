import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { auth, firebase, storage, database } from '../../firebase';
import { ref as ref_d, set, get, onValue } from 'firebase/database';

const FormationScreen = ({ route, navigation }) => {
  const { formationId } = route.params;
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const formationRef = ref_d(database, `/formations/${formationId}`);
    const unsubscribe = onValue(formationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFormation(data);
      } else {
        Alert.alert("Erreur", "Formation non trouvée");
        navigation.goBack();
      }
    });

    return () => unsubscribe();
  }, [formationId]);

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir désactiver cette formation ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "OK", onPress: () => {
          const formationRef = ref_d(database, `/formations/${formationId}`);
          set(formationRef, { ...formation, active: false })
            .then(() => {
              Alert.alert("Succès", "La formation a été désactivée");
              navigation.goBack();
            })
            .catch((error) => {
              Alert.alert("Erreur", "Impossible de désactiver la formation");
            });
        }}
      ]
    );
  };

  if (!formation) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: formation.image }} style={styles.image} />
      <Text style={styles.title}>{formation.title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => navigation.navigate('InscriptionFormation', { formationId: formation.id })}
        >
          <Text style={styles.signUpButtonText}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modifyButton}
          onPress={() => navigation.navigate('AjoutFormation', { formationId: formation.id })}
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.info}>Date: {formation.date}</Text>
      <Text style={styles.info}>Lieu: {formation.lieu}</Text>
      <Text style={styles.info}>Niveau: {formation.niveau}</Text>
      <Text style={styles.info}>Prix: {formation.price} €</Text>
      
      <Text style={styles.sectionTitle}>Catégorie</Text>
      <Text style={styles.text}>{formation.category}</Text>
      
      <Text style={styles.sectionTitle}>Mots-clés</Text>
      <View style={styles.keywordsContainer}>
        {formation.keywords.map((keyword, index) => (
          <Text key={index} style={styles.keyword}>{keyword}</Text>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Compétences acquises</Text>
      <Text style={styles.text}>{formation.competencesAcquises}</Text>
      
      <Text style={styles.sectionTitle}>Prérequis</Text>
      <Text style={styles.text}>{formation.prerequis}</Text>
      
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.text}>{formation.instructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  modifyButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  keyword: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
});

export default FormationScreen;