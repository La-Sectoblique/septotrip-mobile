
import React, { useLayoutEffect } from "react";

import { ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TripViewerTask } from "../pages/TripViewerTask";
import { ShowTrip } from "../pages/ShowTrip";
import { TripViewerDay } from "../pages/TripViewerDay";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";


import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import { TripViewerJournal } from "../pages/TripViewerJournal";

import { TripViewerFiles } from "../pages/TripViewerFiles";


type TripNavigationProps = NativeStackScreenProps<RootStackParamList, 'Planification'>

export const TripNavigation: React.FC<TripNavigationProps> = ({route, navigation}) => {

  const Tab = createBottomTabNavigator<ParamListBase>();

  const { trip, isReadOnly } = route.params

  const moveToParameters = () => {
    navigation.replace('Parametres', {trip: trip})
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: trip.name,
      headerRight: () => <FontAwesome onPress={() => moveToParameters()} name="gear" size={24} color="black" />,
    });
  }, [navigation]);

  return (

      <Tab.Navigator
        screenOptions= {({ route }) => ({
          tabBarIcon: ({ focused }) => {

            const color = focused ? "blue" : "black"
            if (route.name === 'Carte') {
              return <FontAwesome name="plane" size={24} color={color} />
            } else if (route.name === 'Tache') {
              return <Entypo name="info" size={24} color={color} />
            } else if (route.name === 'Planning'){
              return <FontAwesome name="calendar" size={24} color={color}/>
            } else if (route.name === "Gallery"){
              return <FontAwesome name="photo" size={24} color={color} />
            } else if (route.name === "Journal"){
              return <FontAwesome name="newspaper-o" size={24} color={color} />
            } else {
              return <FontAwesome name="file-o" size={24} color={color} />
            }
          },
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
      })}>
        <Tab.Screen name="Carte" component={ShowTrip} initialParams={{trip: trip}} />
        <Tab.Screen name="Tache" component={TripViewerTask} initialParams={{trip: trip}} />
        <Tab.Screen name="Planning" component={TripViewerDay} initialParams={{trip: trip}} />
        { !isReadOnly && <Tab.Screen name="Journal" component={TripViewerJournal} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/> }
        <Tab.Screen name="Fichier" component={TripViewerFiles} initialParams={{trip: trip}} />
      </Tab.Navigator>
  );
}
