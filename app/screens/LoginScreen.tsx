import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { browserLocalPersistence, browserSessionPersistence, getReactNativePersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebase } from '../../firebase'
import { StackActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  
  
  // {!isLoggedIn ? () : isAdmin ? () : !isValidated ? () : ()
  const handleAutomaticLogin = () => {
    if (isLoggedIn!=null){
    console.log('isLoggedIn: ', isLoggedIn.email)
    {isLoggedIn? navigation.navigate('UserTabs', {isFormateur: 'true', isValidated:'true'}):(null)}
    }
  }

  useEffect(()=>{
    handleAutomaticLogin()
  })
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
        
        console.log('nav to user tabs')
        navigation.navigate('UserTabs', {isFormateur: true, validated:'true'})

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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />    
      <Button title="Logout" onPress={handleLogout} />  
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
      <Button title="Reset Password" onPress={() => navigation.navigate('PasswordReset')} />
      <Button title="Background Info" onPress={() => navigation.navigate('BackgroundInfo')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;