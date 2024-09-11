import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { ref as ref_d, set } from 'firebase/database';
import { database } from '../../firebase';
import { sendEmailVerification } from 'firebase/auth';

const TABS = ['Etudiant', 'Formateur'];

const AjoutFormateurScreen = () => {
  const [activeTab, setActiveTab] = useState('Formateur');
  const [isEditing, setIsEditing] = useState(true);
  const [profile, setProfile] = useState({
    medecinDiplome: false,
    anneeDiplome: '',
    faculte: '',
    fonctionEnseignant: '',
    email: '',
    telephone: '',
    etudiantDIU: false,
    anneeDIU: '',
    inviteCode: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Ajout d\'un profil',
      headerStyle: { backgroundColor: '#1a53ff' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      //     <Text style={styles.headerButton}>{'< Retour'}</Text>
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation]);

  const handleProfileChange = (key, value) => {
    setProfile(prevProfile => ({ ...prevProfile, [key]: value }));
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const sendWelcomeEmail = (email, inviteCode) => {
    // This is a placeholder for the email sending functionality
    // You would typically use a backend service or a third-party API to send emails
    console.log(`Sending welcome email to ${email} with invite code ${inviteCode}`);
    // Simulating email content
    const emailContent = `
      Bienvenue sur notre plateforme!

      Nous sommes ravis de vous accueillir en tant que nouveau formateur. 
      Votre code d'invitation est: ${inviteCode}

      Pour valider votre compte, veuillez utiliser ce code lors de votre première connexion.

      Si vous avez des questions, n'hésitez pas à nous contacter.

      Cordialement,
      L'équipe de la plateforme
    `;
    console.log(emailContent);
    // In a real application, you would send this email using your preferred method
  };

  const handleSave = () => {
    if (!profile.email) {
      Alert.alert("Erreur", "L'email est obligatoire.");
      return;
    }

    const inviteCode = generateInviteCode();
    const formateurData = { ...profile, inviteCode };

    set(ref_d(database, `formateurs/${inviteCode}`), formateurData)
      .then(() => {
        Alert.alert("Succès", "Le profil du formateur a été ajouté avec succès.");
        sendWelcomeEmail(profile.email, inviteCode);
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement.");
        console.error(error);
      });
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {TABS.map((tab) => (
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

  const renderStudentMessage = () => (
    <View style={styles.studentMessageContainer}>
      <Text style={styles.studentMessageText}>
        Les étudiants n'ont pas de profil spécifique dans notre système. Vos informations sont recueillies lors de votre inscription à une formation.
        {"\n\n"}
        Pour vous inscrire à une formation ou consulter les formations disponibles, veuillez utiliser les options correspondantes dans le menu principal.
      </Text>
    </View>
  );

  const renderFormField = (label, key, type = 'text') => {
    const props = {
      style: styles.input,
      value: profile[key],
      onChangeText: (text) => handleProfileChange(key, text),
      editable: isEditing,
    };

    if (type === 'switch') {
      return (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{label}</Text>
          <Switch
            value={profile[key]}
            onValueChange={(value) => handleProfileChange(key, value)}
            disabled={!isEditing}
          />
        </View>
      );
    }

    if (type === 'picker') {
      return (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{label}</Text>
          <Picker
            selectedValue={profile[key]}
            onValueChange={(itemValue) => handleProfileChange(key, itemValue)}
            style={styles.picker}
            enabled={isEditing}
          >
            <Picker.Item label="Sélectionnez une année" value="" />
            <Picker.Item label="1ère année" value="1" />
            <Picker.Item label="2ème année" value="2" />
            <Picker.Item label="3ème année" value="3" />
          </Picker>
        </View>
      );
    }

    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...props} keyboardType={type === 'number' ? 'numeric' : 'default'} />
      </View>
    );
  };

  const renderProfileForm = () => (
    <ScrollView style={styles.formContainer}>
      {renderFormField('Médecin Diplômé', 'medecinDiplome', 'switch')}
      {profile.medecinDiplome && (
        <>
          {renderFormField('Année de diplôme', 'anneeDiplome', 'number')}
          {renderFormField('Faculté', 'faculte')}
        </>
      )}
      {renderFormField('Fonction Enseignant', 'fonctionEnseignant')}
      {renderFormField('Email', 'email')}
      {renderFormField('Numéro de téléphone', 'telephone')}
      {renderFormField('Étudiant DIU', 'etudiantDIU', 'switch')}
      {profile.etudiantDIU && renderFormField('Année DIU', 'anneeDIU', 'picker')}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>

      <Text style={styles.confidentialText}>
        Ces informations restent confidentielles.
      </Text>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {renderTabs()}
      {activeTab === 'Etudiant' && renderStudentMessage()}
      {activeTab === 'Formateur' && renderProfileForm()}
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
  studentMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  studentMessageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AjoutFormateurScreen;