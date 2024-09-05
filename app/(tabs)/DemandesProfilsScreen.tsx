import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const mockProfiles = [
  {
    status: 'Profil Validé',
    name: 'Dr. Marie Dupont',
    medecinDiplome: true,
    anneeDiplome: 2005,
    faculte: 'Université Paris Descartes',
    fonctionEnseignant: true,
    diplome: 'Médecin Ostéopathe',
    anneeDiplomeFormateur: 2010,
    faculteEnseignement: 'École Supérieure d\'Ostéopathie',
    groupeEnseignementPrive: 'N/A',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Thérapie cranio-sacrale',
    adresse: '15 Rue de la Santé, 75013 Paris',
    courriel: 'm.dupont@osteofrance.fr',
    telephone: '01 23 45 67 89',
  },
  {
    status: 'Profil Rejeté',
    name: 'Jean Lefevre',
    medecinDiplome: false,
    anneeDiplome: 'N/A',
    faculte: 'N/A',
    fonctionEnseignant: false,
    etudiantDIU: 2,
    diplome: 'En cours (Ostéopathe)',
    anneeDiplomeFormateur: 'N/A',
    faculteEnseignement: 'N/A',
    groupeEnseignementPrive: 'N/A',
    pratiqueStructurelle: false,
    pratiqueFonctionnelle: 'Non',
    adresse: '7 Avenue des Étudiants, 69003 Lyon',
    courriel: 'j.lefevre@etudiant.fr',
    telephone: '06 12 34 56 78',
  },
  {
    status: 'Profil en attente',
    name: 'Dr. Sophie Martin',
    medecinDiplome: true,
    anneeDiplome: 2012,
    faculte: 'Université de Bordeaux',
    fonctionEnseignant: true,
    diplome: 'Médecin Kinésithérapeute',
    anneeDiplomeFormateur: 2018,
    faculteEnseignement: 'Institut de Formation en Masso-Kinésithérapie de Bordeaux',
    groupeEnseignementPrive: 'Réseau Kiné Plus',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Rééducation posturale',
    adresse: '22 Cours de la Marne, 33000 Bordeaux',
    courriel: 's.martin@kinefrance.fr',
    telephone: '05 56 78 90 12',
  },
];

const ProfileItem = ({ label, value }) => (
  <Text style={styles.profileItem}>
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value.toString()}</Text>
  </Text>
);

const FormateurProfile = ({ profile }) => (
  <View style={styles.profileContainer}>
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
  </View>
);

const FormateursProfileList = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Liste des Profils de Formateurs</Text>
      {['Profil Validé', 'Profil Rejeté', 'Profil en attente'].map((status) => (
        <View key={status}>
          <Text style={styles.statusTitle}>{status}</Text>
          {mockProfiles
            .filter((profile) => profile.status === status)
            .map((profile, index) => (
              <FormateurProfile key={index} profile={profile} />
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  profileItem: {
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  value: {
    color: '#7f8c8d',
  },
});

export default FormateursProfileList;