
import React, {  } from 'react';

import { ParamListBase, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TripViewerInfo } from '../pages/TripViewerInfo';
import { TripViewerDay } from '../pages/TripViewerDay';
import { ShowTrip } from '../component/trip/ShowTrip';





export default function TripNavigation({route, navigation}:any) {

  const Tab = createBottomTabNavigator<ParamListBase>();


  return (
      <Tab.Navigator>
        <Tab.Screen name="Voyage" component={ShowTrip}/>
        <Tab.Screen name="Info" component={TripViewerInfo} />
        <Tab.Screen name="Day" component={TripViewerDay} />
      </Tab.Navigator>
  );
}


