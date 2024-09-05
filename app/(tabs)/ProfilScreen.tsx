import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Etudiant');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    medecinDiplome: false,
    anneeDiplome: '',
    faculte: '',
    fonctionEnseignant: '',
    email: '',
    telephone: '',
    etudiantDIU: false,
    anneeDIU: '',
  });
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Mon profil',
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
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {['Etudiant', 'Formateur', 'Rejete par l\'admin'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'Rejete par l\'admin') {
      return (
        <View style={styles.rejectedContainer}>
          <Text style={styles.rejectedText}>
            Votre demande a été rejetée pour la raison suivante : 
            {"\n\n"}
            [Insérer la raison du rejet ici]
            {"\n\n"}
            Pour toute correspondance ultérieure, veuillez contacter admindumay@gmail.com
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Médecin Diplômé</Text>
          <Switch
            value={profile.medecinDiplome}
            onValueChange={(value) => isEditing && setProfile({ ...profile, medecinDiplome: value })}
            disabled={!isEditing}
          />
        </View>

        {profile.medecinDiplome && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Année de diplôme</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={profile.anneeDiplome}
                onChangeText={(text) => isEditing && setProfile({ ...profile, anneeDiplome: text })}
                editable={isEditing}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Faculté</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={profile.faculte}
                onChangeText={(text) => isEditing && setProfile({ ...profile, faculte: text })}
                editable={isEditing}
              />
            </View>
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fonction Enseignant</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profile.fonctionEnseignant}
            onChangeText={(text) => isEditing && setProfile({ ...profile, fonctionEnseignant: text })}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profile.email}
            onChangeText={(text) => isEditing && setProfile({ ...profile, email: text })}
            editable={isEditing}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profile.telephone}
            onChangeText={(text) => isEditing && setProfile({ ...profile, telephone: text })}
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Étudiant DIU</Text>
          <Switch
            value={profile.etudiantDIU}
            onValueChange={(value) => isEditing && setProfile({ ...profile, etudiantDIU: value })}
            disabled={!isEditing}
          />
        </View>

        {profile.etudiantDIU && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Année DIU</Text>
            <Picker
              selectedValue={profile.anneeDIU}
              onValueChange={(itemValue) => isEditing && setProfile({ ...profile, anneeDIU: itemValue })}
              style={[styles.picker, !isEditing && styles.disabledPicker]}
              enabled={isEditing}
            >
              <Picker.Item label="Sélectionnez une année" value="" />
              <Picker.Item label="1ère année" value="1" />
              <Picker.Item label="2ème année" value="2" />
              <Picker.Item label="3ème année" value="3" />
            </Picker>
          </View>
        )}

        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.modifyButtonText}>
            {isEditing ? 'Sauvegarder' : 'Modifier'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.confidentialText}>
          Ces informations restent confidentielles.
        </Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {renderTabs()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  disabledPicker: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  confidentialText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  rejectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rejectedText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  modifyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;