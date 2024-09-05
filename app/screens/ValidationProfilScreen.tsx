import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileItem = ({ label, value }) => (
  <Text style={styles.profileItem}>
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value.toString()}</Text>
  </Text>
);

const ValidationProfil = ({ route, navigation }) => {
  const { profile } = route.params;

  const handleValidation = (isValid) => {
    // Here you would typically update the profile status in your backend
    // For now, we'll just navigate back
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.validateButton]}
          onPress={() => handleValidation(true)}
        >
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleValidation(false)}
        >
          <Text style={styles.buttonText}>Rejeter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{profile.name}</Text>
      <ProfileItem label="Médecin Diplômé" value={profile.medecinDiplome ? 'Oui' : 'Non'} />
      <ProfileItem label="Année de diplôme" value={profile.anneeDiplome} />
      <ProfileItem label="Faculté" value={profile.faculte} />
      <ProfileItem label="Fonction Enseignant" value={profile.fonctionEnseignant ? 'Oui' : 'Non'} />
      {profile.etudiantDIU && <ProfileItem label="Étudiant DIU (Année)" value={profile.etudiantDIU} />}
      <ProfileItem label="Diplôme" value={profile.diplome} />
      <ProfileItem label="Année de diplôme (formateur)" value={profile.anneeDiplomeFormateur} />
      <ProfileItem label="Faculté d'enseignement" value={profile.faculteEnseignement} />
      <ProfileItem label="Groupe d'enseignement privé" value={profile.groupeEnseignementPrive} />
      <ProfileItem label="Pratique Structurelle" value={profile.pratiqueStructurelle ? 'Oui' : 'Non'} />
      <ProfileItem label="Pratique Fonctionnelle" value={profile.pratiqueFonctionnelle} />
      <ProfileItem label="Adresse" value={profile.adresse} />
      <ProfileItem label="Courriel" value={profile.courriel} />
      <ProfileItem label="Téléphone" value={profile.telephone} />
      <ProfileItem label="Date de complétion" value={profile.dateCompletion} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  validateButton: {
    backgroundColor: '#2ecc71',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  profileItem: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  value: {
    color: '#7f8c8d',
  },
});

export default ValidationProfil;