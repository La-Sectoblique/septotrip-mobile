import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'

import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet, ColorPropType } from 'react-native';

import MapView from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import { Route } from '../../type_tmp'

import { ListMarkers } from '../component/ListMarkers';
import { ListRoutes } from '../component/ListRoutes';

import useMarkers from '../hook/useMarkers'
import useRoutes from '../hook/useRoutes'
import { getUserPoints } from '@la-sectoblique/septoblique-service';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    container: {
      height: 300,
      width: Dimensions.get("window").width,
      backgroundColor: 'tomato'
    },
    map: {
      flex: 1
    },
    input: {
      borderWidth: 2,
      width: Dimensions.get('window').width,
      paddingVertical: 2,
      paddingLeft: 10,
      marginVertical: 10 
    }
  });
  
export const Accueil = () => {
    const [markers, initMarker, addMarker, removeMarker] = useMarkers();
    const [routes, addRoute, removeRoute] = useRoutes();
    const [activeComponent, setActiveComponent] = useState<PointOutput | Route | null>(null)


    useEffect(() => { 
        getUserPoints()
        .then((res) => initMarker(res))
        .catch((err) => console.error(JSON.stringify(err)))
    }, [])
    
    const handlePressEvent = (marker: PointOutput | Route): void => {
        setActiveComponent(marker)
    }

    return (
        <SafeAreaView style={styles.page}>
        {
           activeComponent == null ? <Text>{markers.length}</Text>:
           <>
             <Text>{activeComponent.title}</Text>
             <Text>{activeComponent.localisation.coordinates}</Text>
           </>
         }
       <View style={styles.container}>
         
         <MapView style={styles.map} rotateEnabled={false} provider={null} showsUserLocation={true} loadingEnabled={true}>
             <ListMarkers markers={markers} handlePressEvent={handlePressEvent}/>
             <ListRoutes routes={routes} handlePressEvent={handlePressEvent} />
           
         </MapView>
       </View>
       <StatusBar style="auto" />
     </SafeAreaView>
    )
}