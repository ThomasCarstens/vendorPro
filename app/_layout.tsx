import React, { useState, useEffect } from 'react';
import { Image, Button, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firebase, storage, database } from '../firebase'
import { ref as ref_d, set, get, onValue } from 'firebase/database'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://ionic.io/ionicons/v4
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screen components
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import BackgroundInfoScreen from './screens/BackgroundInfoScreen';
import InscriptionScreen from './(tabs)/InscriptionScreen';
import RechercheFormationsScreen from './(tabs)/RechercheFormationsScreen';
import NotifsScreen from './(tabs)/NotifsScreen';
import ProfilScreen from './(tabs)/ProfilScreen';
import AjoutFormationScreen from './screens/AjoutFormationScreen';
import DemandesFormationsScreen from './(tabs)/DemandesFormationsScreen';
import DemandesProfilsScreen from './(tabs)/DemandesProfilsScreen';
import UnderConstructionScreen from './screens/UnderConstructionScreen';
import FormationScreen from './screens/FormationScreen';
import OrganizationsPartenairesScreen from './screens/OrganizationsPartenairesScreen';
import InscriptionFormationScreen from './screens/InscriptionFormationScreen';
import ValidationProfilScreen from './screens/ValidationProfilScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function NewUserTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Inscription') {
          iconName = focused ? 'search' : 'search';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications-outline' : 'notifications-outline';
        } else if (route.name === 'Profil') {
          iconName = focused ? 'person' : 'person';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: '#1eaae6',
    })}>
      <Tab.Screen name="Inscription" component={InscriptionScreen}  />
      <Tab.Screen name="Notifications" component={NotifsScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'RechercheFormations') {
          iconName = focused ? 'search' : 'search';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications-outline' : 'notifications-outline';
        } else if (route.name === 'DemandesProfils') {
          iconName = focused ? 'people' : 'people';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: '#1eaae6',
    })}>
      <Tab.Screen name="RechercheFormations" component={RechercheFormationsScreen} initialParams={{spoofFormateur: true, spoofAdmin: true, spoofValidated: true}} />
      <Tab.Screen name="Notifications" component={NotifsScreen} />
      <Tab.Screen name="DemandesProfils" component={DemandesProfilsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [gameFileContext, setGameFile] =   React.useState({"isFormateur":"true", "isValidated":"true"}) //ouch
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In case user already logged in - else same in Login component.
  React.useMemo(()=>{
    const userLoggedIn = (auth.currentUser)
    // console.log(userLoggedIn.uid)  
    if (userLoggedIn !== null) {
      // User Roles loaded from Firebase Realtime Database.
      const gameFileRef = ref_d(database, "userdata/"+String(userLoggedIn.uid) );

      onValue(gameFileRef, (snapshot) =>  {
            const data = snapshot.val();
            if (data){
              console.log('Userdata downloaded in App.js'+ data)
              setGameFile(data)
            }
          })

      // Automatic login: if there is a current user, based on id.
      // if (userLoggedIn !== null){
      //   navigation.replace("Selection", {gameFile: gameFile})
      //   return
      // }
    }
    
      }, [])


  
  function UserTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'RechercheFormations') {
            iconName = focused ? 'add-circle' : 'search';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-outline' : 'notifications-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: '#1eaae6',
      })}>
        <Tab.Screen name="RechercheFormations" component={RechercheFormationsScreen} initialParams={{spoofFormateur: false, spoofAdmin: false, spoofValidated: true}}/>
        <Tab.Screen name="Notifications" component={NotifsScreen} initialParams={{"gameFileContext": gameFileContext}}/>
        <Tab.Screen name="Profil" component={ProfilScreen} initialParams={{"gameFileContext": gameFileContext}}/>
      </Tab.Navigator>
    );
  }
  // useEffect(()=>{   
  //   setGameFile({"isFormateur":"true"})
  // }, [])
  // onValue(gameFileRef, (snapshot) =>  {
  //   const data = snapshot.val();
  //   if (data){
  //     console.log('Gamefile downloaded in App.js')
  //     setGameFile(data)
  //   } 
  // })

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>

        <Stack.Screen name="Login"          component={LoginScreen} options={{headerShown: false}} initialParams={{"gameFileContext": gameFileContext}}  />
        <Stack.Screen name="Signup"         component={SignupScreen} />
        <Stack.Screen name="PasswordReset"  component={PasswordResetScreen} />
        <Stack.Screen name="OrganizationsPartenaires" component={OrganizationsPartenairesScreen} />


        
        <Stack.Screen name="AjoutFormation"       component={AjoutFormationScreen} />
        <Stack.Screen name="Formation"       component={FormationScreen} />
        <Stack.Screen name="RechercheFormations"  component={RechercheFormationsScreen} options={{ headerShown: true, headerBackTitleVisible: true }}/>
        <Stack.Screen name="InscriptionFormation" component={InscriptionFormationScreen} />
        {/* tabs if admin */}
        <Stack.Screen name="AdminTabs"            component={AdminTabs} options={{ headerShown: false }}  />
        <Stack.Screen name="ValidationProfil" component={ValidationProfilScreen} />

        {/* tabs if not validated */}
        <Stack.Screen name="NewUserTabs" component={NewUserTabs} options={{ headerShown: false }} />

        {/* tabs if validated */}
        <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }}  />

        

        <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;