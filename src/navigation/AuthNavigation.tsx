import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';


export default function AuthNavigation({navigation}: any) {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  );
}


