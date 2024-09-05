import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install expo icons or use another icon library

const InscriptionScreen = ({ navigation }) => {
  const [stepsCompleted, setStepsCompleted] = useState({
    createAccount: true,
    authorizeNotifications: false,
    fillProfile: false,
  });
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Procédure d\'inscription',
      headerStyle: {
        backgroundColor: '#1a53ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.headerButton}>{'< Retour'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const handleCompleteStep = (step) => {
    setStepsCompleted(prev => ({ ...prev, [step]: true }));
  };

  const renderStep = (number, title, description, completed, onPress) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepNumber, completed && styles.stepCompleted]}>
          <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        <Text style={styles.stepTitle}>{title}</Text>
        {completed && <MaterialIcons name="check-circle" size={24} color="#4CAF50" />}
      </View>
      <Text style={styles.stepDescription}>{description}</Text>
      {!completed && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Compléter cette étape</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>3 étapes:</Text>
      
      {renderStep(
        1,
        "Créer un compte",
        "Vous avez déjà créé votre compte.",
        stepsCompleted.createAccount
      )}

      {renderStep(
        2,
        "Autoriser les notifications",
        "Activez les notifications pour rester informé de changements et des annulations.",
        stepsCompleted.authorizeNotifications,
        () => {
          navigation.navigate('Notifs');
          handleCompleteStep('authorizeNotifications');
        }
      )}

      {renderStep(
        3,
        "Compléter votre profil",
        "Votre profil reste strictement confidentiel.",
        stepsCompleted.fillProfile,
        () => {
          navigation.navigate('Profil');
          handleCompleteStep('fillProfile');
        }
      )}

      {Object.values(stepsCompleted).every(Boolean) && (
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>Félicitations ! Vous avez terminé le processus d'inscription.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UserTabs')}
          >
            <Text style={styles.buttonText}>Aller à l'accueil</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',
  },
});

export default InscriptionScreen;