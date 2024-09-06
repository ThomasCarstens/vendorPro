import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ref as ref_d, set } from 'firebase/database';
import { database } from '../../firebase';

const AjoutFormationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    title: '',
    date: new Date(),
    image: 'https://via.placeholder.com/150',
    keywords: [],
    category: '',
    lieu: '',
    niveau: '',
    status: 'propose',
    heureDebut: new Date(),
    heureFin: new Date(),
    nature: '',
    anneeConseillee: '',
    tarifEtudiant: '',
    tarifMedecin: '',
    domaine: '',
    affiliationDIU: '',
    competencesAcquises: '',
    prerequis: '',
    instructions: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime, type) => {
    if (type === 'start') {
      setShowStartTimePicker(false);
    } else {
      setShowEndTimePicker(false);
    }
    if (selectedTime) {
      handleInputChange(type === 'start' ? 'heureDebut' : 'heureFin', selectedTime);
    }
  };

  const validateForm = () => {
    // Add validation logic here
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous vraiment ajouter cette formation ?",
        [
          {
            text: "Annuler",
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: () => uploadToFirebase() 
          }
        ]
      );
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
    }
  };

  const uploadToFirebase = () => {
    const formattedData = {
      ...formData,
      date: formData.date.toISOString().split('T')[0],
      heureDebut: formData.heureDebut.toTimeString().split(' ')[0].slice(0, 5),
      heureFin: formData.heureFin.toTimeString().split(' ')[0].slice(0, 5),
      keywords: formData.keywords.split(',').map(k => k.trim()),
    };

    set(ref_d(database, `formations/${formData.id}`), formattedData)
      .then(() => {
        Alert.alert("Succès", "La formation a été ajoutée avec succès.");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de la formation.");
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter une nouvelle formation</Text>

      <Text style={styles.label}>Titre *</Text>
      <TextInput
        style={styles.input}
        value={formData.title}
        onChangeText={(text) => handleInputChange('title', text)}
        placeholder="Titre de la formation"
      />

      <Text style={styles.label}>Date *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{formData.date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Heure de début *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowStartTimePicker(true)}>
        <Text>{formData.heureDebut.toLocaleTimeString().slice(0, 5)}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={formData.heureDebut}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'start')}
        />
      )}

      <Text style={styles.label}>Heure de fin *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowEndTimePicker(true)}>
        <Text>{formData.heureFin.toLocaleTimeString().slice(0, 5)}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={formData.heureFin}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'end')}
        />
      )}

      <Text style={styles.label}>Lieu *</Text>
      <TextInput
        style={styles.input}
        value={formData.lieu}
        onChangeText={(text) => handleInputChange('lieu', text)}
        placeholder="Lieu de la formation"
      />

      <Text style={styles.label}>Nature de la formation *</Text>
      <TextInput
        style={styles.input}
        value={formData.nature}
        onChangeText={(text) => handleInputChange('nature', text)}
        placeholder="Nature de la formation"
      />

      <Text style={styles.label}>Année conseillée *</Text>
      <TextInput
        style={styles.input}
        value={formData.anneeConseillee}
        onChangeText={(text) => handleInputChange('anneeConseillee', text)}
        placeholder="Année conseillée"
      />

      <Text style={styles.label}>Tarif étudiant DIU *</Text>
      <TextInput
        style={styles.input}
        value={formData.tarifEtudiant}
        onChangeText={(text) => handleInputChange('tarifEtudiant', text)}
        placeholder="Tarif étudiant DIU"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tarif médecin *</Text>
      <TextInput
        style={styles.input}
        value={formData.tarifMedecin}
        onChangeText={(text) => handleInputChange('tarifMedecin', text)}
        placeholder="Tarif médecin"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Domaine *</Text>
      <Picker
        selectedValue={formData.domaine}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('domaine', itemValue)}
      >
        <Picker.Item label="Sélectionnez un domaine" value="" />
        <Picker.Item label="Médecine Générale" value="Médecine Générale" />
        <Picker.Item label="Médecine Sport" value="Médecine Sport" />
        <Picker.Item label="Médecine Manuelle" value="Médecine Manuelle" />
        <Picker.Item label="Rhumatologie" value="Rhumatologie" />
        <Picker.Item label="Médecine Physique" value="Médecine Physique" />
        <Picker.Item label="Autres" value="Autres" />
      </Picker>

      <Text style={styles.label}>Affiliation DIU Université *</Text>
      <Picker
        selectedValue={formData.affiliationDIU}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('affiliationDIU', itemValue)}
      >
        <Picker.Item label="Sélectionnez une affiliation" value="" />
        <Picker.Item label="Aix-Marseille" value="Aix-Marseille" />
        <Picker.Item label="Bordeaux" value="Bordeaux" />
        <Picker.Item label="Caen" value="Caen" />
        <Picker.Item label="Dijon" value="Dijon" />
        <Picker.Item label="Lille" value="Lille" />
        <Picker.Item label="Nancy" value="Nancy" />
        <Picker.Item label="Nantes-Angers" value="Nantes-Angers" />
        <Picker.Item label="Nîmes-Montpellier" value="Nîmes-Montpellier" />
        <Picker.Item label="Paris Pitié Salpetrière" value="Paris Pitié Salpetrière" />
        <Picker.Item label="Paris Saclay" value="Paris Saclay" />
        <Picker.Item label="Paris Bobigny" value="Paris Bobigny" />
        <Picker.Item label="Reims" value="Reims" />
        <Picker.Item label="Rennes" value="Rennes" />
        <Picker.Item label="Strasbourg" value="Strasbourg" />
        <Picker.Item label="Toulouse" value="Toulouse" />
        <Picker.Item label="Tours" value="Tours" />
      </Picker>

      <Text style={styles.label}>Catégorie</Text>
      <TextInput
        style={styles.input}
        value={formData.category}
        onChangeText={(text) => handleInputChange('category', text)}
        placeholder="Catégorie de la formation"
      />

      <Text style={styles.label}>Niveau</Text>
      <Picker
        selectedValue={formData.niveau}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange('niveau', itemValue)}
      >
        <Picker.Item label="Sélectionnez un niveau" value="" />
        <Picker.Item label="Débutant" value="Débutant" />
        <Picker.Item label="Intermédiaire" value="Intermédiaire" />
        <Picker.Item label="Avancé" value="Avancé" />
      </Picker>

      <Text style={styles.label}>Mots-clés</Text>
      <TextInput
        style={styles.input}
        value={formData.keywords}
        onChangeText={(text) => handleInputChange('keywords', text)}
        placeholder="Mots-clés séparés par des virgules"
      />

      <Text style={styles.label}>Compétences acquises</Text>
      <TextInput
        style={styles.input}
        value={formData.competencesAcquises}
        onChangeText={(text) => handleInputChange('competencesAcquises', text)}
        placeholder="Compétences acquises"
        multiline
      />

      <Text style={styles.label}>Prérequis</Text>
      <TextInput
        style={styles.input}
        value={formData.prerequis}
        onChangeText={(text) => handleInputChange('prerequis', text)}
        placeholder="Prérequis"
        multiline
      />

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={styles.input}
        value={formData.instructions}
        onChangeText={(text) => handleInputChange('instructions', text)}
        placeholder="Instructions"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter la formation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1a53ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AjoutFormationScreen;