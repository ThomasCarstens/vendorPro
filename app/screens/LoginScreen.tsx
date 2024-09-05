import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { browserLocalPersistence, browserSessionPersistence, getReactNativePersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebase, storage, database } from '../../firebase'
import { StackActions } from '@react-navigation/native';
import { ref as ref_d, set, get, onValue } from 'firebase/database'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [gameFileContext, setGameFile] =useState({});
  const [userRoles, setUserRoles] =   useState({});


  // In case user just logged in (place in onLogin section...) - else if already logged in, in App component.
  React.useMemo(()=>{
    const userLoggedIn = (auth.currentUser)

    if (userLoggedIn !== null) {
      // User Roles loaded from Firebase Realtime Database.
      const gameFileRef = ref_d(database, "userdata/"+String(userLoggedIn.uid) );

      onValue(gameFileRef, (snapshot) =>  {
            const data = snapshot.val();
            if (data){
              console.log('Userdata downloaded in Login.js'+ data.isFormateur)
              setUserRoles(data)

            }
          })

      // Automatic login: if there is a current user, based on id.
      // if (userLoggedIn !== null){
      //   navigation.replace("Selection", {gameFile: gameFile})
      //   return
      // }
    }
    
      }, [])


  // {!isLoggedIn ? () : isAdmin ? () : !isValidated ? () : ()
  // const handleAutomaticLogin = () => {
  //   if (isLoggedIn!=null){
  //   console.log('isLoggedIn: ', isLoggedIn.email)
  //   {isLoggedIn? navigation.navigate('UserTabs', {isFormateur: 'true', isValidated:'true'}):(null)}
  //   }
  // }

  // useEffect(()=>{
  //   handleAutomaticLogin()
  // })
    // navigation.navigate('UserTabs', {role: 'formateur', validated:'true'})}

  // How to reset programmatically?


  const handleLogin = () => {
    // Implement your login logic here
    // in login button: onPress={handleLogin} 
    console.log('Login attempt with:', email, password);

    signInWithEmailAndPassword(auth,email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log('logged in with:', user.email);
        
        
        const userLoggedIn = (auth.currentUser)

        // if (userLoggedIn !== null) {
          // User Roles loaded from Firebase Realtime Database.
          const gameFileRef = ref_d(database, "userdata/"+String(userLoggedIn.uid) );
    
          onValue(gameFileRef, (snapshot) =>  {
                const data = snapshot.val();
                if (data){
                  console.log('Userdata downloaded upon Login'+ data.isAdmin)
                  // setGamerFile(data)
                  console.log('nav to user tabs')
                  navigation.navigate('UserTabs', {userRoles: data, formateur: true, validated:'true'})
                }
              })

        

    }).catch(error => alert(error.message))  

    
  };

  const handleLogout = async () => {
    // await AsyncStorage.clear()
      auth
        .signOut()
        .then(()=> {
            console.log('Apparently the user signed out')
            navigation.dispatch(StackActions.popToTop());
        })
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        /> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewUserTabs', {spoofFormateur: false, spoofAdmin: false, spoofValidated: false})}
        >
          <Text style={styles.buttonText}>Exemple d'Inscription (Démo)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserTabs', {spoofFormateur: false, spoofAdmin: false, spoofValidated: true})}
        >
          <Text style={styles.buttonText}>Accès Etudiant (Démo)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminTabs')}
        >
          <Text style={styles.buttonText}>Accès Admin (Démo)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserTabs', {spoofFormateur: true, spoofAdmin: false, spoofValidated: true})}
        >
          <Text style={styles.buttonText}>Accès Formateur (Démo)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrganizationsPartenaires')}
        >
          <Text style={styles.buttonText}>Partenaires</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00008B', // Dark blue background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#00008B',
    fontWeight: 'bold',
  },
});

export default LoginScreen;