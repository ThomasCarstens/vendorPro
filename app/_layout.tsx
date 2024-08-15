import React, { useState, useEffect } from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function NewUserTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Inscription') {
          iconName = focused ? 'add-circle' : 'add-circle';
        } else if (route.name === 'Notifs') {
          iconName = focused ? 'add-circle' : 'add-circle';
        } else if (route.name === 'Profil') {
          iconName = focused ? 'add-circle' : 'add-circle';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: '#1eaae6',
    })}>
      <Tab.Screen name="Inscription" component={InscriptionScreen}  />
      <Tab.Screen name="Notifs" component={NotifsScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}




function AdminTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'DemandesFormations') {
          iconName = focused ? 'add-circle' : 'add-circle';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'add-circle' : 'add-circle';
        } else if (route.name === 'DemandesProfils') {
          iconName = focused ? 'add-circle' : 'add-circle';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: '#1eaae6',
    })}>
      <Tab.Screen name="DemandesFormations" component={DemandesFormationsScreen} options={{ tabBarIcon: '', tabBarBadge: 3 }} />
      <Tab.Screen name="Notifications" component={NotifsScreen} />
      <Tab.Screen name="DemandesProfils" component={DemandesProfilsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [gameFileContext, setGameFile] =   React.useState({"isFormateur":"true", "isValidated":"true"})
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  function UserTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'RechercheFormations') {
            iconName = focused ? 'add-circle' : 'add-circle';
          } else if (route.name === 'Notifs') {
            iconName = focused ? 'add-circle' : 'add-circle';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'add-circle' : 'add-circle';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: '#1eaae6',
      })}>
        <Tab.Screen name="RechercheFormations" component={RechercheFormationsScreen} initialParams={{"gameFileContext": gameFileContext}}/>
        <Tab.Screen name="Notifs" component={NotifsScreen} initialParams={{"gameFileContext": gameFileContext}}/>
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
        <Stack.Screen name="BackgroundInfo" component={BackgroundInfoScreen} />


        <Stack.Screen name="AdminTabs"            component={AdminTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AjoutFormation"       component={AjoutFormationScreen} />
        <Stack.Screen name="RechercheFormations"  component={RechercheFormationsScreen} />


        <Stack.Screen name="NewUserTabs" component={NewUserTabs} options={{ headerShown: false }} />


        <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }}  />
        {/* <Stack.Screen name="AjoutFormation" component={AjoutFormationScreen} />
        <Stack.Screen name="RechercheFormations" component={RechercheFormationsScreen} /> */}
        

        <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;