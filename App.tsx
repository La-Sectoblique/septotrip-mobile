
import React from 'react';
import { NavigationContainer, ParamListBase, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import * as SecureStore from 'expo-secure-store';

import { init, login } from '@la-sectoblique/septoblique-service';


import TripNavigation from './src/navigation/TripNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';



export default function App() {

  init({url: 'http://api.septotrip.com', 
    getToken: async  () => {
      const get_auth = await SecureStore.getItemAsync('auth_token')
      if (!get_auth){
        return ''
      }

      return get_auth
    },
    storeToken: (token: string) => {
      SecureStore.setItemAsync('auth_token', token);
    }
  })
  
  const Stack = createNativeStackNavigator();

  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Authentification" component={AuthNavigation} />
        <Stack.Screen name="Planification" component={TripNavigation} />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}



