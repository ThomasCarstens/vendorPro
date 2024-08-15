import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MOCK_FORMATIONS = [
  { id: '1', 'title': 'Cardiologie avancée', date: '2024-09-15', image: 'https://via.placeholder.com/150', keywords: ['conseillé 3e année', 'postgrad'], price: 120, category: 'Médecine', lieu: 'Paris', niveau: 'Avancé' },
  { id: '2', 'title': 'Pédiatrie moderne', date: '2024-10-01', image: 'https://via.placeholder.com/150', keywords: ['postgrad'], price: 100, category: 'Médecine', lieu: 'Lyon', niveau: 'Intermédiaire' },
  { id: '3', 'title': 'Chirurgie laparoscopique', date: '2024-10-20', image: 'https://via.placeholder.com/150', keywords: ['conseillé 3e année'], price: 150, category: 'Chirurgie', lieu: 'Marseille', niveau: 'Avancé' },
  { id: '4', 'title': 'Psychiatrie clinique', date: '2024-11-05', image: 'https://via.placeholder.com/150', keywords: ['postgrad'], price: 110, category: 'Psychiatrie', lieu: 'Bordeaux', niveau: 'Intermédiaire' },
  { id: '5', 'title': 'Urgences médicales', date: '2024-11-15', image: 'https://via.placeholder.com/150', keywords: ['conseillé 3e année'], price: 90, category: 'Médecine', lieu: 'Lille', niveau: 'Débutant' },
  { id: '6', 'title': 'Neurologie clinique', date: '2024-12-01', image: 'https://via.placeholder.com/150', keywords: ['postgrad'], price: 130, category: 'Neurologie', lieu: 'Toulouse', niveau: 'Avancé' },
  { id: '7', 'title': 'Dermatologie pratique', date: '2024-12-10', image: 'https://via.placeholder.com/150', keywords: ['conseillé 3e année'], price: 95, category: 'Dermatologie', lieu: 'Nice', niveau: 'Intermédiaire' },
  { id: '8', 'title': 'Oncologie moderne', date: '2025-01-05', image: 'https://via.placeholder.com/150', keywords: ['postgrad'], price: 140, category: 'Oncologie', lieu: 'Strasbourg', niveau: 'Avancé' },
  { id: '9', 'title': 'Gynécologie obstétrique', date: '2025-01-20', image: 'https://via.placeholder.com/150', keywords: ['conseillé 3e année'], price: 105, category: 'Gynécologie', lieu: 'Nantes', niveau: 'Intermédiaire' },
  { id: '10', 'title': 'Anesthésiologie avancée', date: '2025-02-01', image: 'https://via.placeholder.com/150', keywords: ['postgrad'], price: 160, category: 'Anesthésiologie', lieu: 'Montpellier', niveau: 'Avancé' },
];

const RechercheFormationsScreen = ( props, { navigation, route } ) => {
  const [formations, setFormations] = useState(MOCK_FORMATIONS);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lieuFilter, setLieuFilter] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('');
  const [isFormateur, setIsFormateur] = useState(false);
  React.useEffect(() => {
    if (props.route.params.gameFileContext.isFormateur) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      // const isFormateur = route.params?.gameFileContext.isFormateur;
      setIsFormateur(props.route.params?.gameFileContext.isFormateur)
      console.log('isFormateur:', props.route.params.gameFileContext.isFormateur)
    }
  }, [props.route.params.gameFileContext.isFormateur]);
  

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
    setFormations(filteredFormations);
  };

  const renderFormationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.formationItem} 
      onPress={() => navigation.navigate('FormationScreen', { formationId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.formationImage} />
      <Text style={styles.formationTitle}>{item.title}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Prix: {item.price} €</Text>
      <View style={styles.keywordsContainer}>
        {item.keywords.map((keyword, index) => (
          <Text key={index} style={styles.keyword}>{keyword}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.newFormationButton}
            onPress={() => navigation.navigate('Login')}
          ><Text style={styles.newFormationButtonText}>Login</Text>
          </TouchableOpacity>
        {isFormateur && (
          <TouchableOpacity 
            style={styles.newFormationButton}
            onPress={() => navigation.navigate('AjoutFormation')}
          >
            <Text style={styles.newFormationButtonText}>Nouvelle Formation</Text>
          </TouchableOpacity>
        )}
        <Picker
          selectedValue={categoryFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setCategoryFilter(itemValue)}
        >
          <Picker.Item label="Toute Catégorie" value="" />
          <Picker.Item label="Médecine" value="Médecine" />
          <Picker.Item label="Chirurgie" value="Chirurgie" />
          <Picker.Item label="Psychiatrie" value="Psychiatrie" />
          {/* Add more categories as needed */}
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
          {/* Add more locations as needed */}
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

        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Appliquer les filtres</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={formations}
        renderItem={renderFormationItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filtersContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  picker: {
    height: 30,
    width: 200,
  },
  filterButton: {
    marginTop: 10,
    marginBottom:10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  list: {
    flex: 1,
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
  newFormationButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  newFormationButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RechercheFormationsScreen;