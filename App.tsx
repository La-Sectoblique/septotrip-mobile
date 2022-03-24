import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState } from 'react';

import { NavigationContainer, ParamListBase, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { init, login } from '@la-sectoblique/septoblique-service';

import { Register } from './src/pages/Register';
import { Login } from './src/pages/Login';
import { Accueil } from './src/pages/Accueil';



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
  
  const Tab = createBottomTabNavigator<ParamListBase>();


  type RootTabParamList = {
    Register: { name: string };
    Login: { name: string };
  };

  type Props = BottomTabScreenProps<RootTabParamList, 'Login'>;

  // const screenOptions = ({ navigation, route }: Props) => ({
  //   tabBarIcon: ({ focused, color, size }: any) => {
  //     let iconName: string;

  //     if (route.) {
  //       iconName = focused
  //         ? 'ios-information-circle'
  //         : 'ios-information-circle-outline';
  //     } else if (route.name === 'Settings') {
  //       iconName = focused ? 'ios-list-box' : 'ios-list';
  //     }

  //     // You can return any component that you like here!
  //     return <Ionicons name={iconName} size={size} color={color} />;
  //   },
  //   tabBarActiveTintColor: 'tomato',
  //   tabBarInactiveTintColor: 'gray',
  // });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Connexion" component={Login} />
        <Tab.Screen name="Inscription" component={Register} />
        {/* Add invisble Tab screen to navigate through it when login */}
        <Tab.Screen name="Accueil" component={Accueil} options={{
          tabBarButton: () => null,
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


