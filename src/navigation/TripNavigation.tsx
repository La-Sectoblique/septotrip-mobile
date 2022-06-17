
import React, {  } from "react";

import { ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TripViewerInfo } from "../pages/TripViewerInfo";
import { ShowTrip } from "../pages/ShowTrip";
import { TripViewerDay } from "../pages/TripViewerDay";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";


import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import { Gallery } from "../pages/Gallery";
import { TripViewerFiles } from "../pages/TripViewerFiles";

type TripNavigationProps = NativeStackScreenProps<RootStackParamList, 'Planification'>

export const TripNavigation: React.FC<TripNavigationProps> = (props) => {

  const Tab = createBottomTabNavigator<ParamListBase>();

  const { trip, isReadOnly } = props.route.params
  return (

      <Tab.Navigator
        screenOptions= {({ route }) => ({
          tabBarIcon: ({ focused }) => {

            const color = focused ? "blue" : "black"
            if (route.name === 'Voyage') {
              return <FontAwesome name="plane" size={24} color={color} />
            } else if (route.name === 'Info') {
              return <Entypo name="info" size={24} color={color} />
            } else if (route.name === 'Day'){
              return <FontAwesome name="calendar" size={24} color={color}/>
            } else {
              return <FontAwesome name="file-o" size={24} color={color} />
            }
          },
          tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Voyage" component={ShowTrip} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        <Tab.Screen name="Info" component={TripViewerInfo} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        <Tab.Screen name="Day" component={TripViewerDay} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        { !isReadOnly && <Tab.Screen name="Fichier" component={TripViewerFiles} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>}
        { !isReadOnly && <Tab.Screen name="Gallery" component={Gallery} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>}
      </Tab.Navigator>
  );
}
