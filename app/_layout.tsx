import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
    <Tab.Navigator >
      <Tab.Screen name="Inscription" component={InscriptionScreen} />
      <Tab.Screen name="Notifs" component={NotifsScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}


function UserTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="RechercheFormations" component={RechercheFormationsScreen} />
      <Tab.Screen name="Notifs" component={NotifsScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DemandesFormations" component={DemandesFormationsScreen} />
      <Tab.Screen name="Notifications" component={NotifsScreen} />
      <Tab.Screen name="DemandesProfils" component={DemandesProfilsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(true);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>

            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
            <Stack.Screen name="BackgroundInfo" component={BackgroundInfoScreen} />
          </>
        ) : isAdmin ? (
          <>

            <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
            <Stack.Screen name="AjoutFormation" component={AjoutFormationScreen} />
            <Stack.Screen name="RechercheFormations" component={RechercheFormationsScreen} />
          </>
        ) : !isValidated ? (
          <>

          <Stack.Screen name="NewUserTabs" component={NewUserTabs} options={{ headerShown: false }} />
          </>
        ) : (
          <>

            <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
            <Stack.Screen name="AjoutFormation" component={AjoutFormationScreen} />
            <Stack.Screen name="RechercheFormations" component={RechercheFormationsScreen} />
          </>
        )}
        <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;