
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import * as SecureStore from 'expo-secure-store';

import { init, Platform } from '@la-sectoblique/septoblique-service';


import TripNavigation from './src/navigation/TripNavigation';
import { Login } from './src/pages/Login';
import { Register } from './src/pages/Register';
import { ShowTrip } from './src/component/trip/ShowTrip';
import { TripViewerInfo } from './src/pages/TripViewerInfo';
import { TripList } from './src/component/trip/TripList';



export default function App() {

  init({
  url: 'http://api.septotrip.com',
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
  
  const Stack = createNativeStackNavigator();

  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Planification" component={TripNavigation} />
        <Stack.Screen name="TripList" component={TripList} />
        <Stack.Screen name="Info" component={TripViewerInfo} />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}



