import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


// Must sync with Formation page.
const MOCK_FORMATIONS = [
  { 
    id: '1', 
    title: 'Cardiologie avancée', 
    date: '2024-09-15', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour cardiologues certifiés', '3e cycle'], 
    category: 'Médecine', 
    lieu: 'Paris', 
    niveau: 'Avancé', 
    status: 'inscrit',
    heureDebut: '09:00',
    heureFin: '17:00',
    nature: 'Formation continue',
    anneeConseillee: '3e année et plus',
    tarifEtudiant: 80,
    tarifMedecin: 120
  },
  { 
    id: '2', 
    title: 'Pédiatrie moderne', 
    date: '2024-10-01', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour pédiatres en formation continue', 'post-certification'], 
    category: 'Médecine', 
    lieu: 'Lyon', 
    niveau: 'Intermédiaire', 
    status: 'propose',
    heureDebut: '10:00',
    heureFin: '18:00',
    nature: 'Formation spécialisée',
    anneeConseillee: '2e année et plus',
    tarifEtudiant: 70,
    tarifMedecin: 100
  },
  { 
    id: '3', 
    title: 'Chirurgie laparoscopique', 
    date: '2024-10-20', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour chirurgiens 3e année', 'formation technique avancée'], 
    category: 'Chirurgie', 
    lieu: 'Marseille', 
    niveau: 'Avancé', 
    status: 'inscrit',
    heureDebut: '08:30',
    heureFin: '16:30',
    nature: 'Formation pratique',
    anneeConseillee: '3e année et plus',
    tarifEtudiant: 100,
    tarifMedecin: 150
  },
  { 
    id: '4', 
    title: 'Psychiatrie clinique', 
    date: '2024-11-05', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour psychiatres en activité', 'certification en santé mentale'], 
    category: 'Psychiatrie', 
    lieu: 'Bordeaux', 
    niveau: 'Intermédiaire',
    status: 'propose',
    heureDebut: '09:30',
    heureFin: '17:30',
    nature: 'Formation théorique et pratique',
    anneeConseillee: '2e année et plus',
    tarifEtudiant: 75,
    tarifMedecin: 110
  },
  { 
    id: '5', 
    title: 'Urgences médicales', 
    date: '2024-11-15', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['formation initiale', 'pour internes en 1re année'], 
    category: 'Médecine', 
    lieu: 'Lille', 
    niveau: 'Débutant',
    status: 'inscrit',
    heureDebut: '08:00',
    heureFin: '16:00',
    nature: 'Formation initiale',
    anneeConseillee: '1ère année',
    tarifEtudiant: 60,
    tarifMedecin: 90
  },
  { 
    id: '6', 
    title: 'Neurologie clinique', 
    date: '2024-12-01', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour neurologues certifiés', 'spécialisation en neurodiagnostic'], 
    category: 'Neurologie', 
    lieu: 'Toulouse', 
    niveau: 'Avancé', 
    status: 'propose',
    heureDebut: '09:00',
    heureFin: '18:00',
    nature: 'Formation spécialisée',
    anneeConseillee: '3e année et plus',
    tarifEtudiant: 90,
    tarifMedecin: 130
  },
  { 
    id: '7', 
    title: 'Dermatologie pratique', 
    date: '2024-12-10', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour dermatologues en formation', 'techniques pratiques'], 
    category: 'Dermatologie', 
    lieu: 'Nice', 
    niveau: 'Intermédiaire',
    status: 'inscrit',
    heureDebut: '10:00',
    heureFin: '17:00',
    nature: 'Formation pratique',
    anneeConseillee: '2e année et plus',
    tarifEtudiant: 65,
    tarifMedecin: 95
  },
  { 
    id: '8', 
    title: 'Oncologie moderne', 
    date: '2025-01-05', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour oncologues certifiés', 'post-certification'], 
    category: 'Oncologie', 
    lieu: 'Strasbourg', 
    niveau: 'Avancé',
    status: 'propose',
    heureDebut: '09:00',
    heureFin: '18:00',
    nature: 'Formation continue',
    anneeConseillee: '3e année et plus',
    tarifEtudiant: 95,
    tarifMedecin: 140
  },
  { 
    id: '9', 
    title: 'Gynécologie obstétrique', 
    date: '2025-01-20', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour gynécologues en 3e année', 'formation en obstétrique'], 
    category: 'Gynécologie', 
    lieu: 'Nantes', 
    niveau: 'Intermédiaire',
    status: 'inscrit',
    heureDebut: '08:30',
    heureFin: '16:30',
    nature: 'Formation spécialisée',
    anneeConseillee: '3e année',
    tarifEtudiant: 75,
    tarifMedecin: 105
  },
  { 
    id: '10', 
    title: 'Anesthésiologie avancée', 
    date: '2025-02-01', 
    image: 'https://via.placeholder.com/150', 
    keywords: ['pour anesthésistes certifiés', 'spécialisation en techniques avancées'], 
    category: 'Anesthésiologie', 
    lieu: 'Montpellier', 
    niveau: 'Avancé',
    status: 'propose',
    heureDebut: '09:00',
    heureFin: '17:30',
    nature: 'Formation avancée',
    anneeConseillee: '3e année et plus',
    tarifEtudiant: 110,
    tarifMedecin: 160
  },
];

const RechercheFormationsScreen = (props, { route }) => {
  const [formations, setFormations] = useState(MOCK_FORMATIONS);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lieuFilter, setLieuFilter] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('');
  const [activeTab, setActiveTab] = useState('Toutes');
  const [isFormateur, setIsFormateur] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const filterHeight = useState(new Animated.Value(0))[0];

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Recherche formations',
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

  useEffect(() => {
    if (props.route.params?.spoofFormateur) {
      setIsFormateur(props.route.params.spoofFormateur);
    }
  }, [props.route.params?.spoofFormateur]);

  useEffect(() => {
    if (props.route.params?.spoofAdmin) {
      setIsAdmin(props.route.params.spoofAdmin);
    }
  }, [props.route.params?.spoofAdmin]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterHeight, {
      toValue: showFilters ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const applyFilters = () => {
    let filteredFormations = MOCK_FORMATIONS;
    if (categoryFilter) {
      filteredFormations = filteredFormations.filter(f => f.category === categoryFilter);
    }
    if (lieuFilter) {
      filteredFormations = filteredFormations.filter(f => f.lieu === lieuFilter);
    }
    if (niveauFilter) {
      filteredFormations = filteredFormations.filter(f => f.niveau === niveauFilter);
    }
    if (activeTab === "J'y suis inscrit") {
      filteredFormations = filteredFormations.filter(f => f.status === 'inscrit');
    } else if (activeTab === 'Je propose') {
      filteredFormations = filteredFormations.filter(f => f.status === 'propose');
    }
    setFormations(filteredFormations);
    toggleFilters();
  };

  const renderFormationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.formationItem} 
      onPress={() => navigation.navigate('Formation', { formationId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.formationImage} />
      <Text style={styles.formationTitle}>{item.title}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Lieu: {item.lieu}</Text>
      <Text>Horaires: {item.heureDebut} - {item.heureFin}</Text>
      <Text>Nature: {item.nature}</Text>
      <Text>Année conseillée: {item.anneeConseillee}</Text>
      <Text>Tarif étudiant DIU: {item.tarifEtudiant} €</Text>
      <Text>Tarif médecin: {item.tarifMedecin} €</Text>
      <View style={styles.keywordsContainer}>
        {item.keywords.map((keyword, index) => (
          <Text key={index} style={styles.keyword}>{keyword}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {(isFormateur?['Toutes', "J'y suis inscrit", 'Je propose']:['Toutes', "J'y suis inscrit"]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
              applyFilters();
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
        <Text style={styles.filterButtonText}>Filtres</Text>
        <Ionicons name={showFilters ? "chevron-up" : "chevron-down"} size={24} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.filtersContainer, { height: filterHeight }]}>
        <Picker
          selectedValue={categoryFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setCategoryFilter(itemValue)}
        >
          <Picker.Item label="Toute Catégorie" value="" />
          <Picker.Item label="Médecine" value="Médecine" />
          <Picker.Item label="Chirurgie" value="Chirurgie" />
          <Picker.Item label="Psychiatrie" value="Psychiatrie" />
        </Picker>
        <Picker
          selectedValue={lieuFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setLieuFilter(itemValue)}
        >
          <Picker.Item label="Tout Lieu" value="" />
          <Picker.Item label="Paris" value="Paris" />
          <Picker.Item label="Lyon" value="Lyon" />
          <Picker.Item label="Marseille" value="Marseille" />
        </Picker>
        <Picker
          selectedValue={niveauFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setNiveauFilter(itemValue)}
        >
          <Picker.Item label="Tout Niveau" value="" />
          <Picker.Item label="Débutant" value="Débutant" />
          <Picker.Item label="Intermédiaire" value="Intermédiaire" />
          <Picker.Item label="Avancé" value="Avancé" />
        </Picker>
        <TouchableOpacity style={styles.applyFilterButton} onPress={applyFilters}>
          <Text style={styles.applyFilterButtonText}>Appliquer les filtres</Text>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={formations}
        renderItem={renderFormationItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      {isFormateur && (
        <TouchableOpacity 
          style={styles.newFormationButton}
          onPress={() => navigation.navigate('AjoutFormation')}
        >
          <Text style={styles.newFormationButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#1a53ff',
  },
  tabText: {
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a53ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  filtersContainer: {
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    marginBottom: 5,
  },
  applyFilterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyFilterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  newFormationButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newFormationButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  formationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  keyword: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
  },
  formationItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  formationImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  headerButton: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RechercheFormationsScreen;
