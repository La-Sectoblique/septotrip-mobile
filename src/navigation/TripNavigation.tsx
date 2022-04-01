import * as SecureStore from 'expo-secure-store';

import React, { useEffect, useState } from 'react';

import { NavigationContainer, ParamListBase, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { init, login } from '@la-sectoblique/septoblique-service';
import { TripViewerMap } from '../pages/trip_viewer/trip_viewer_map';
import { TripViewerInfo } from '../pages/trip_viewer/trip_viewer_info';




export default function TripNavigation() {

  const Tab = createBottomTabNavigator<ParamListBase>();


  return (
      <Tab.Navigator>
        <Tab.Screen name="Voyage" component={TripViewerMap} />
        <Tab.Screen name="Info" component={TripViewerInfo} />
      </Tab.Navigator>
  );
}


