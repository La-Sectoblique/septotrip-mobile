import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message"
import * as SecureStore from 'expo-secure-store';

import { Login } from './src/pages/Login';
import { Register } from './src/pages/Register';
import { TripList } from './src/pages/TripList';

import { init, Platform } from "@la-sectoblique/septoblique-service";

import { TripNavigation } from "./src/navigation/TripNavigation";
import { RootStackParamList } from "./src/models/NavigationParamList";
import { Parametres } from "./src/pages/Parametres";

export default function App() {

  init({
    url: 'https://api.septotrip.com',
    getToken: async () => {
      const get_auth = await SecureStore.getItemAsync('token');
      if (!get_auth) {
        return '';
      }

      return get_auth;
    },
    storeToken: async (token: string) => {
      await SecureStore.setItemAsync('token', token);
    },
    platform: Platform.MOBILE,
    context: 'development'
})



  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerTitle: "Se connecter", headerBackVisible: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerTitle: "Créer un compte",}}/>
        <Stack.Screen name="Planification" component={TripNavigation} options={{headerBackVisible: false}}/>
        <Stack.Screen name="TripList" component={TripList} options={{headerTitle: "Liste de voyage", headerBackVisible: false}}/>
        <Stack.Screen name="Parametres" component={Parametres} options={{headerTitle: "Parametres",}}/>
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}

