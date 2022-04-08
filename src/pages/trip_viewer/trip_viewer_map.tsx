import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native';

import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import { addStep, getUserTrips } from '@la-sectoblique/septoblique-service';

import { TripOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Trip';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';

import useTrips from '../../hook/useTrips';

import { TripList } from '../../component/trip/TripList';
import { ShowTrip } from '../../component/trip/ShowTrip';
import { ApiResponse } from '@la-sectoblique/septoblique-service/dist/types/utils/Api';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { TripViewerInfo } from './trip_viewer_info';
import { NavigationRouteContext } from '@react-navigation/native';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });
  
export const TripViewerMap = ({navigation}: any) => {
    const [trips, initTrip, addTrip, removeTrip] = useTrips();
    const [activeTrip, setActiveTrip] = useState<TripOutput>();
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => { 
      setLoading(true)

      getUserTrips()
        .then((res: TripOutput[]) => initTrip(res))
        .catch((err: ApiError) => console.error(JSON.stringify(err)))
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
      if(activeTrip != null)
        navigation.navigate("ShowTrip")
    }, [activeTrip])
    
    if(loading){
      return <></>
    }
      
    

    const Stack = createNativeStackNavigator();
  
    return (
      <Stack.Navigator>
        <Stack.Screen name="VoyageList" 
          children={() => <TripList trips={trips} setActiveTrip={setActiveTrip}/>}/>
        <Stack.Screen name="ShowTrip"
          children={() => <ShowTrip trip={activeTrip} />} />
        <Stack.Screen name="Info" component={TripViewerInfo} />
      </Stack.Navigator>
    )
}