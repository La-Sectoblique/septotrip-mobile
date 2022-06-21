import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message"
import * as SecureStore from 'expo-secure-store';

import { Login } from './src/pages/Login';
import { Register } from './src/pages/Register';
import { TripList } from './src/pages/TripList';

import { getUserTrips, init, Platform } from "@la-sectoblique/septoblique-service";

import { TripNavigation } from "./src/navigation/TripNavigation";
import { RootStackParamList } from "./src/models/NavigationParamList";
import { Parametres } from "./src/pages/Parametres";
import { me } from "@la-sectoblique/septoblique-service/dist/data/user/Login";
import { Loader } from "./src/component/utils/Loader";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";

export default function App() {

  const [initialRoute, setInitalRoute] = useState<keyof RootStackParamList>();

  const [trip, setTrip] = useState<TripOutput>()
  const [isReadOnly, setIsReadonly] = useState<boolean>()

  const [loading, setLoading] = useState<boolean>(true)

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


  useEffect(() => {
    me()
      .then(async () => {
        const user_trips = await getUserTrips()

        if (user_trips.filter(trip => trip.startDate != undefined).length > 0){
          setInitalRoute("Planification")
          setTrip(user_trips[0])
          setIsReadonly(false)
        }
          
        else
          setInitalRoute("TripList");
        setLoading(false)
      })
      .catch(() => {
        setInitalRoute("Login")
        setLoading(false)
      })
  },[])
  const Stack = createNativeStackNavigator<RootStackParamList>();

  if(loading)
    return <Loader />

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} options={{headerTitle: "Se connecter", headerBackVisible: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerTitle: "Créer un compte",}}/>
        <Stack.Screen name="Planification" component={TripNavigation} options={{headerBackVisible: false,}} initialParams={{trip: trip, isReadOnly: isReadOnly}}/>
        <Stack.Screen name="TripList" component={TripList} options={{headerTitle: "Liste de voyage", headerBackVisible: false}}/>
        <Stack.Screen name="Parametres" component={Parametres} options={{headerTitle: "Parametres",}}/>
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}

