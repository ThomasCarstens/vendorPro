import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();


const mockProfiles = [
  {
    id: '1',
    status: 'En attente',
    name: 'Dr. Sophie Martin',
    medecinDiplome: true,
    anneeDiplome: 2012,
    faculte: 'Université de Bordeaux',
    fonctionEnseignant: true,
    etudiantDIU: null,
    diplome: 'Médecin Kinésithérapeute',
    anneeDiplomeFormateur: 2018,
    faculteEnseignement: 'Institut de Formation en Masso-Kinésithérapie de Bordeaux',
    groupeEnseignementPrive: 'Réseau Kiné Plus',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Rééducation posturale',
    adresse: '22 Cours de la Marne, 33000 Bordeaux',
    courriel: 's.martin@kinefrance.fr',
    telephone: '05 56 78 90 12',
    dateCompletion: '2023-05-15',
  },
  {
    id: '2',
    status: 'Validé',
    name: 'Dr. Marie Dupont',
    medecinDiplome: true,
    anneeDiplome: 2005,
    faculte: 'Université Paris Descartes',
    fonctionEnseignant: true,
    etudiantDIU: null,
    diplome: 'Médecin Ostéopathe',
    anneeDiplomeFormateur: 2010,
    faculteEnseignement: 'École Supérieure d\'Ostéopathie',
    groupeEnseignementPrive: 'N/A',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Thérapie cranio-sacrale',
    adresse: '15 Rue de la Santé, 75013 Paris',
    courriel: 'm.dupont@osteofrance.fr',
    telephone: '01 23 45 67 89',
    dateCompletion: '2023-04-20',
  },
  {
    id: '3',
    status: 'Rejeté',
    name: 'Jean Lefevre',
    medecinDiplome: false,
    anneeDiplome: null,
    faculte: 'N/A',
    fonctionEnseignant: false,
    etudiantDIU: 2,
    diplome: 'En cours (Ostéopathe)',
    anneeDiplomeFormateur: null,
    faculteEnseignement: 'N/A',
    groupeEnseignementPrive: 'N/A',
    pratiqueStructurelle: false,
    pratiqueFonctionnelle: 'Non',
    adresse: '7 Avenue des Étudiants, 69003 Lyon',
    courriel: 'j.lefevre@etudiant.fr',
    telephone: '06 12 34 56 78',
    dateCompletion: '2023-05-01',
  },
  {
    id: '4',
    status: 'En attente',
    name: 'Dr. Isabelle Rousseau',
    medecinDiplome: true,
    anneeDiplome: 2008,
    faculte: 'Université Claude Bernard Lyon 1',
    fonctionEnseignant: true,
    etudiantDIU: null,
    diplome: 'Médecin Rhumatologue',
    anneeDiplomeFormateur: 2015,
    faculteEnseignement: 'Faculté de Médecine de Lyon',
    groupeEnseignementPrive: 'Groupe Hospitalier Est',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Échographie musculo-squelettique',
    adresse: '8 Avenue Rockefeller, 69008 Lyon',
    courriel: 'i.rousseau@chu-lyon.fr',
    telephone: '04 72 35 58 69',
    dateCompletion: '2023-05-18',
  },
  {
    id: '5',
    status: 'Validé',
    name: 'Pierre Dubois',
    medecinDiplome: false,
    anneeDiplome: null,
    faculte: 'N/A',
    fonctionEnseignant: true,
    etudiantDIU: null,
    diplome: 'Kinésithérapeute',
    anneeDiplomeFormateur: 2013,
    faculteEnseignement: 'IFMK Saint-Michel, Paris',
    groupeEnseignementPrive: 'Réseau Kiné France',
    pratiqueStructurelle: true,
    pratiqueFonctionnelle: 'Méthode Mézières',
    adresse: '45 Rue du Bac, 75007 Paris',
    courriel: 'p.dubois@kinefrance.fr',
    telephone: '01 45 67 89 01',
    dateCompletion: '2023-03-10',
  }
];


const ProfileItem = ({ profile, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <Text style={styles.name}>{profile.name}</Text>
    <Text>Médecin Diplômé: {profile.medecinDiplome ? 'Oui' : 'Non'}</Text>
    <Text>Fonction Enseignant: {profile.fonctionEnseignant ? 'Oui' : 'Non'}</Text>
    <Text>Date de complétion: {profile.dateCompletion}</Text>
  </TouchableOpacity>
);

const ProfileList = ({ status, navigation }) => {
  const filteredProfiles = mockProfiles.filter(profile => profile.status === status);
  
  return (
    <FlatList
      data={filteredProfiles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProfileItem 
          profile={item} 
          onPress={() => navigation.navigate('ValidationProfil', { profile: item })}
        />
      )}
      ListEmptyComponent={<Text style={styles.emptyList}>Aucun profil trouvé</Text>}
    />
  );
};

const FormateursProfileList = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('En attente');
  const tabs = ['En attente', 'Validé', 'Rejeté'];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ProfileList status={activeTab} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  profileItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default FormateursProfileList;