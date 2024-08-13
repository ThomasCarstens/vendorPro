import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screen components
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import BackgroundInfoScreen from './screens/BackgroundInfoScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import RechercheFormationsScreen from './screens/RechercheFormationsScreen';
import NotifsScreen from './screens/NotifsScreen';
import ProfilScreen from './screens/ProfilScreen';
import AjoutFormationScreen from './screens/AjoutFormationScreen';
import DemandesFormationsScreen from './screens/DemandesFormationsScreen';
import DemandesProfilsScreen from './screens/DemandesProfilsScreen';
import UnderConstructionScreen from './screens/UnderConstructionScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inscription" component={InscriptionScreen} />
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
            <Stack.Screen name="BackgroundInfo" component={BackgroundInfoScreen} />
          </>
        ) : isAdmin ? (
          <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
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