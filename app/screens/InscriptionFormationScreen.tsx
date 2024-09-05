import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const InscriptionFormationScreen = () => {
  const [medecinDiplome, setMedecinDiplome] = useState(false);
  const [anneeDiplome, setAnneeDiplome] = useState('');
  const [faculte, setFaculte] = useState('');
  const [fonctionEnseignant, setFonctionEnseignant] = useState(false);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [etudiantDIU, setEtudiantDIU] = useState(false);
  const [anneeDIU, setAnneeDIU] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log({
      medecinDiplome,
      anneeDiplome,
      faculte,
      fonctionEnseignant,
      email,
      telephone,
      etudiantDIU,
      anneeDIU,
    });

    // Navigate back to the previous screen or to a confirmation screen
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Inscription à la Formation</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Médecin Diplômé</Text>
        <Switch
          value={medecinDiplome}
          onValueChange={setMedecinDiplome}
        />
      </View>

      {medecinDiplome && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Année de diplôme</Text>
            <TextInput
              style={styles.input}
              value={anneeDiplome}
              onChangeText={setAnneeDiplome}
              keyboardType="numeric"
              placeholder="YYYY"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Faculté</Text>
            <TextInput
              style={styles.input}
              value={faculte}
              onChangeText={setFaculte}
              placeholder="Nom de l'université"
            />
          </View>
        </>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fonction Enseignant</Text>
        <Switch
          value={fonctionEnseignant}
          onValueChange={setFonctionEnseignant}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="votre@email.com"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          placeholder="0123456789"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Étudiant DIU</Text>
        <Switch
          value={etudiantDIU}
          onValueChange={setEtudiantDIU}
        />
      </View>

      {etudiantDIU && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Année DIU</Text>
          <Picker
            selectedValue={anneeDIU}
            onValueChange={(itemValue) => setAnneeDIU(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez une année" value="" />
            <Picker.Item label="1ère année" value="1" />
            <Picker.Item label="2ème année" value="2" />
            <Picker.Item label="3ème année" value="3" />
          </Picker>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#1a53ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InscriptionFormationScreen;