import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { auth, firebase, storage, database } from '../../firebase'
import { ref as ref_d, set, get, onValue } from 'firebase/database'

const RechercheFormationsScreen = (props, { route }) => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lieuFilter, setLieuFilter] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('');
  const [activeTab, setActiveTab] = useState('Visibles');
  const [isFormateur, setIsFormateur] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filterHeight = useState(new Animated.Value(0))[0];

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [lieuOptions, setLieuOptions] = useState([]);
  const [niveauOptions, setNiveauOptions] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchFormations();
  }, []);
  useEffect(() => {
    applyFilters(activeTab)
  }, [formations]);
  
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

  const fetchFormations = () => {
    setLoading(true);
    const formationsRef = ref_d(database, "formations/");
    onValue(formationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formationsArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setFormations(formationsArray);
        setFilteredFormations(formationsArray);
        setLoading(false);
        updateFilterOptions(formationsArray);
      } else {
        setError('Aucune formation trouvée');
        setLoading(false);
      }
    }, (error) => {
      setError('Erreur lors du chargement des formations');
      setLoading(false);
    });
  };

  const updateFilterOptions = (formationsArray) => {
    const categories = [...new Set(formationsArray.map(f => f.domaine))];
    const lieux = [...new Set(formationsArray.map(f => f.lieu))];
    const niveaux = [...new Set(formationsArray.map(f => f.niveau))];

    setCategoryOptions(categories);
    setLieuOptions(lieux);
    setNiveauOptions(niveaux);
  };

  const renderAppliedFilters = () => {
    const appliedFilters = [];
    if (categoryFilter) appliedFilters.push({ type: 'Domaine', value: categoryFilter });
    if (lieuFilter) appliedFilters.push({ type: 'Lieu', value: lieuFilter });
    if (niveauFilter) appliedFilters.push({ type: 'Niveau', value: niveauFilter });
  
    return (
      <View style={styles.appliedFiltersContainer}>
        {appliedFilters.map((filter, index) => (
          <View key={index} style={styles.appliedFilterItem}>
            <Text style={styles.appliedFilterText}>{filter.type}: {filter.value}</Text>
            <TouchableOpacity onPress={() => removeFilter(filter.type)}>
              <Ionicons name="close-circle" size={20} color="#1a53ff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(filterHeight, {
      toValue: showFilters ? 0 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const applyFilters = (tab) => {
    let filtered = formations;
    if (categoryFilter) {
      filtered = filtered.filter(f => f.category === categoryFilter);
    }
    if (lieuFilter) {
      filtered = filtered.filter(f => f.lieu === lieuFilter);
    }
    if (niveauFilter) {
      filtered = filtered.filter(f => f.niveau === niveauFilter);
    }

    if (tab === "J'y suis inscrit") {
      filtered = filtered.filter(f => (f.status === 'inscrit'));
    } else if (tab === 'Je propose') {
      filtered = filtered.filter(f => (f.status === 'propose'));
    } else if (tab === 'Corbeille') {
      filtered = filtered.filter(f => f.active === false);
    } else {
      // 'Visibles' tab
      filtered = filtered.filter(f => f.active === true);
    }
    setFilteredFormations(filtered);
  };

  const renderFilterButtons = (title, options, selectedValue, setSelectedValue) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <View style={styles.filterButtonsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              selectedValue === option && styles.filterButtonSelected
            ]}
            onPress={() => setSelectedValue(selectedValue === option ? '' : option)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedValue === option && styles.filterButtonTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFormationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.formationItem} 
      onPress={() => navigation.navigate('Formation', { formationId: item.id, role: {isAdmin: isAdmin, isFormateur: isFormateur} })}
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
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des formations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {(isFormateur?['Visibles', "J'y suis inscrit", 'Je propose', 'Corbeille']:['Visibles', "J'y suis inscrit"]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
              applyFilters(tab)
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.filterToggleButton} onPress={toggleFilters}>
        <Text style={styles.filterToggleButtonText}>Filtres de recherche</Text>
        <Ionicons name={showFilters ? "chevron-up" : "chevron-down"} size={24} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.filtersContainer, { height: filterHeight }]}>
        <ScrollView>
          {renderFilterButtons('Domaine', categoryOptions, categoryFilter, setCategoryFilter)}
          {renderFilterButtons('Lieu', lieuOptions, lieuFilter, setLieuFilter)}
          {renderFilterButtons('Niveau', niveauOptions, niveauFilter, setNiveauFilter)}
          
          <TouchableOpacity style={styles.applyFilterButton} onPress={() => { applyFilters(); toggleFilters(); }}>
            <Text style={styles.applyFilterButtonText}>Appliquer les filtres</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      <FlatList
        data={filteredFormations}
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
    backgroundColor: '#1a53ff',
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
    backgroundColor: '#1a53ff',
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
  
  filterToggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a53ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterToggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  filtersContainer: {
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  filterSection: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#1a53ff',
  },
  filterButtonSelected: {
    backgroundColor: '#1a53ff',
  },
  filterButtonText: {
    color: '#1a53ff',
  },
  filterButtonTextSelected: {
    color: 'white',
  },
  applyFilterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  applyFilterButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RechercheFormationsScreen;
