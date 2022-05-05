
import React, {  } from 'react';

import { ParamListBase, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TripViewerInfo } from '../pages/TripViewerInfo';
import { TripViewerDay } from '../pages/TripViewerDay';
import { ShowTrip } from '../component/trip/ShowTrip';





export default function TripNavigation({route, navigation}:any) {

  const Tab = createBottomTabNavigator<ParamListBase>();

  const { trip } = route.params
  return (
      <Tab.Navigator>
        <Tab.Screen name="Voyage" component={ShowTrip} initialParams={{trip: trip}}/>
        <Tab.Screen name="Info" component={TripViewerInfo} />
        <Tab.Screen name="Day" component={TripViewerDay} initialParams={{trip: trip}} />
      </Tab.Navigator>
  );
}


