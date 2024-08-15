import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackActions } from '@react-navigation/native';
import { auth, firebase } from '../../firebase'

const ProfilScreen = ({ navigation }) => {
  const [name, setName] = useState('Dr. John Doe');
  const [domain, setDomain] = useState('Cardiologie');
  const [practice, setPractice] = useState('hopital');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    // await AsyncStorage.clear()
      auth
        .signOut()
        .then(()=> {
            console.log('Users are not signing out')
            navigation.dispatch(StackActions.popToTop());
        })
  }

  const handleSave = () => {
    // In a real app, you would save the changes to a backend here
    setIsEditing(false);
    // Show a confirmation message to the user
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        {isEditing && (
          <TouchableOpacity style={styles.changeImageButton}>
            <Text style={styles.buttonText}>Changer la photo</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.info}>{name}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Domaine de pratique</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={domain}
            onChangeText={setDomain}
          />
        ) : (
          <Text style={styles.info}>{domain}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Type de pratique</Text>
        {isEditing ? (
          <Picker
            selectedValue={practice}
            style={styles.picker}
            onValueChange={(itemValue) => setPractice(itemValue)}
          >
            <Picker.Item label="Hôpital" value="hopital" />
            <Picker.Item label="Clinique privée" value="clinique" />
            <Picker.Item label="Cabinet individuel" value="cabinet" />
          </Picker>
        ) : (
          <Text style={styles.info}>{practice}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => isEditing ? handleSave() : setIsEditing(true)}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Enregistrer les modifications' : 'Modifier le profil'}
        </Text>
      </TouchableOpacity>
      <Button title="Logout" onPress={handleLogout} />  
      <TouchableOpacity
            style={styles.newFormationButton}
            onPress={() => navigation.navigate('Login')}
          ><Text style={styles.newFormationButtonText}>Login</Text>
          </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeImageButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfilScreen;