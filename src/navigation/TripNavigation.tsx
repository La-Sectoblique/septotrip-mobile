
import React, {  } from "react";

import { ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TripViewerInfo } from "../pages/TripViewerInfo";
import { ShowTrip } from "../component/trip/ShowTrip";
import { TripViewerDay } from "../pages/TripViewerDay";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";

type TripNavigationProps = NativeStackScreenProps<RootStackParamList, 'Planification'>

export const TripNavigation: React.FC<TripNavigationProps> = (props) => {

  const Tab = createBottomTabNavigator<ParamListBase>();

  const { trip, isReadOnly } = props.route.params
  return (

      <Tab.Navigator>
        <Tab.Screen name="Voyage" component={ShowTrip} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        <Tab.Screen name="Info" component={TripViewerInfo} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        <Tab.Screen name="Day" component={TripViewerDay} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>
        { !isReadOnly ? <Tab.Screen name="Fichier" component={ShowTrip} initialParams={{trip: trip}} options={{headerTitle: trip.name}}/>: <></> }
      </Tab.Navigator>
  );
}
