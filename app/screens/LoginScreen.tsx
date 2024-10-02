import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { storage, database } from '../../firebase'
import { getDownloadURL, list, ref } from 'firebase/storage'


const LoginScreen = ({ navigation }) => {
  const renderButton = (title, phase, phaseName, onPress) => (
    <TouchableOpacity
      style={[styles.button, styles.buttonShadow]}
      onPress={onPress}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonPhase}>{` ${phase} `}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/vendorprologo.webp')} style={styles.logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>VendorPro</Text>
        <Text style={styles.appSlogan}>Towards autonomous vending machines</Text>
      </View>
      {/* <Text style={styles.versionText}>Version « premieres images »</Text> */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
        {renderButton(
            "Vos formations",
            "",
            "Phase Etudiante",
            () => navigation.navigate('RestrainedTabs')
          )}
          {renderButton(
            "Accès Admin",
            "",
            "Phase Universitaire",
            () => navigation.navigate('AdminTabs')
          )}

        </View>
        {renderButton(
          "Partenaires",
          "",
          "",
          () => navigation.navigate('OrganizationsPartenaires')
        )}
        {renderButton(
          "Accès Etudiant",
          "Phase 2",
          "Phase Etudiante",
          () => navigation.navigate('UserTabs')
        )}


        <View style={styles.buttonRow}>
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

        </View>
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
    height: 250,
    marginBottom: 20,
    marginTop:20,
    borderRadius:30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appSlogan: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  versionText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-start'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFFFFF',//#EAE0AE
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: '48%',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTitle: {
    color: '#00008B',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonPhase: {
    color: '#343432',
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default LoginScreen;