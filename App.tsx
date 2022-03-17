import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { init, login } from '@la-sectoblique/septoblique-service';

import { Register } from './src/pages/Register';
import { Login } from './src/pages/Login';



export default function App() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
  
    login({email: 'test@ladwein.fr', password: '1234'})
    .then(() => {
      setLoading(false)
    })
    .catch((err) => console.error(err))

    
  },[])

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
  
  const Tab = createBottomTabNavigator();


  if(loading)
    return <></>


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inscription" component={Register} />
        <Tab.Screen name="Connexion" component={Login} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
