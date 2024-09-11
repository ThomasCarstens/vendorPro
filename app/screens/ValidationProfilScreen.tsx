import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ref, update } from 'firebase/database';
import { database } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';

const ValidationProfil = ({ route, navigation }) => {
  const { profile } = route.params;
  const [status, setStatus] = useState(profile.status || 'En attente');

  const handleValidation = async (newStatus) => {
    try {
      let updates = {};
      if (profile.type === 'demande') {
        updates[`/demandes/${profile.id.split('_')[0]}/${profile.id.split('_')[1]}/status`] = newStatus;
      } else {
        updates[`/formations/${profile.id}/status`] = newStatus === 'Validée' ? 'active' : 'inactive';
        updates[`/formations/${profile.id}/active`] = newStatus === 'Validée';
      }

      await update(ref(database), updates);
      setStatus(newStatus);
      Alert.alert(
        'Mise à jour réussie',
        `La demande a été ${newStatus === 'Validée' ? 'validée' : 'rejetée'} avec succès.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du statut.');
    }
  };

  const renderField = (label, value) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value || 'Non spécifié'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {profile.type === 'demande' ? "Demande d'inscription" : "Demande de validation Formation"}
        </Text>
        <Ionicons 
          name={profile.type === 'demande' ? "person" : "school"} 
          size={24} 
          color="#007AFF" 
        />
      </View>

      {profile.type === 'demande' ? (
        <>
          {renderField('Email', profile.email)}
          {renderField('Téléphone', profile.telephone)}
          {renderField('Médecin Diplômé', profile.medecinDiplome ? 'Oui' : 'Non')}
          {renderField('Année de diplôme', profile.anneeDiplome)}
          {renderField('Faculté', profile.faculte)}
          {renderField('Fonction Enseignant', profile.fonctionEnseignant ? 'Oui' : 'Non')}
          {renderField('Étudiant DIU', profile.etudiantDIU ? 'Oui' : 'Non')}
          {renderField('Année DIU', profile.anneeDIU)}
          {renderField('Date de soumission', new Date(profile.timestamp).toLocaleString())}
        </>
      ) : (
        <>
          {renderField('Titre', profile.title)}
          {renderField('Catégorie', profile.category)}
          {renderField('Domaine', profile.domaine)}
          {renderField('Lieu', profile.lieu)}
          {renderField('Date', profile.date)}
          {renderField('Heure de début', profile.heureDebut)}
          {renderField('Heure de fin', profile.heureFin)}
          {renderField('Tarif Étudiant', `${profile.tarifEtudiant} €`)}
          {renderField('Tarif Médecin', `${profile.tarifMedecin} €`)}
          {renderField('Niveau', profile.niveau)}
          {renderField('Nature', profile.nature)}
          {renderField('Affiliation DIU', profile.affiliationDIU)}
          {renderField('Année conseillée', profile.anneeConseillee)}
          {renderField('Compétences acquises', profile.competencesAcquises)}
          {renderField('Prérequis', profile.prerequis)}
          {renderField('Instructions', profile.instructions)}
        </>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Statut actuel:</Text>
        <Text style={[styles.statusValue, { color: status === 'Validée' ? 'green' : (status === 'Rejetée' ? 'red' : 'orange') }]}>
          {status}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.validateButton]}
          onPress={() => handleValidation('Validée')}
        >
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleValidation('Rejetée')}
        >
          <Text style={styles.buttonText}>Rejeter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  field: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  fieldValue: {
    fontSize: 16,
    color: '#2c3e50',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  validateButton: {
    backgroundColor: '#2ecc71',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ValidationProfil;