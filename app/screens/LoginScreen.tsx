import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const renderButton = (title, phase, phaseName, onPress) => (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonPhase}>{`                 Pour ${phase} `}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.versionText}>Version « structurelle » </Text>
      <View style={styles.buttonContainer}>
        {renderButton(
          "Accès Etudiant",
          "Phase 2",
          "Phase Etudiante",
          () => navigation.navigate('UserTabs')
        )}
        {renderButton(
          "Accès Admin",
          "Phase 1",
          "Phase Universitaire",
          () => navigation.navigate('AdminTabs')
        )}
        {renderButton(
          "Accès Formateur",
          "Phase 3",
          "Phase Formateurs connus",
          () => navigation.navigate('FormateurTabs')
        )}
        {renderButton(
          "Exemple d'Inscription de Formateur",
          "Phase 4",
          "Phase Formateurs inconnus",
          () => navigation.navigate('NewUserTabs')
        )}
        {renderButton(
          "Partenaires",
          "Toutes phases",
          "",
          () => navigation.navigate('OrganizationsPartenaires')
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00008B', // Dark blue background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  versionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonTitle: {
    color: '#00008B',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  buttonPhase: {
    color: '#343432',
    fontSize: 15,
    fontStyle: "italic"
  },
});

export default LoginScreen;