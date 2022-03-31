import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState } from 'react';

import {Text} from 'react-native';

import { init, login } from '@la-sectoblique/septoblique-service';

import { Accueil } from './src/pages/Accueil';

import {Loader} from './src/component/Loader';

import Appstyles from './App.scss';

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

  if(loading)
    return <></>

  return (
    
    <Accueil />

  );
}
