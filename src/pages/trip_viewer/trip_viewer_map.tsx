import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'

import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native';

import MapView from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import { Route } from '../../../type_tmp'

import { ListMarkers } from '../../component/ListMarkers';
import { ListRoutes } from '../../component/ListRoutes';

import useMarkers from '../../hook/useMarkers'
import useRoutes from '../../hook/useRoutes'
import { getUserPoints } from '@la-sectoblique/septoblique-service';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    container: {
      height: 150,
      width: Dimensions.get("window").width,
      backgroundColor: 'lightgray',
      padding: 5,
      marginBottom: 5,
      borderRadius: 10
    },
    mapContainer: {
      height: 600,
      width: Dimensions.get("window").width,
      backgroundColor: 'lightgray',
      padding: 5,
      marginBottom: 5,
      borderRadius: 10
    },
    containerTitle: {
      fontSize: 35
    },
    map: {
      flex: 1,
    },
    input: {
      borderWidth: 2,
      width: Dimensions.get('window').width,
      paddingVertical: 2,
      paddingLeft: 10,
      marginVertical: 10 
    }
  });
  
export const TripViewerMap = () => {
    const [markers, addMarker, removeMarker] = useMarkers();
    const [routes, addRoute, removeRoute] = useRoutes();
    const [activeComponent, setActiveComponent] = useState<PointOutput | Route | null>(null)


    useEffect(() => { 
        getUserPoints()
        .then((res) => addMarker(res))
        .catch((err) => console.error(JSON.stringify(err)))
    }, [])
    
    const handlePressEvent = (marker: PointOutput | Route): void => {
        setActiveComponent(marker)
    }

    return (
          <SafeAreaView style={styles.page}>
            <View style={styles.mapContainer}>
              <MapView style={styles.map} rotateEnabled={false}>
                  <ListMarkers markers={markers} handlePressEvent={handlePressEvent}/>
                  <ListRoutes routes={routes} handlePressEvent={handlePressEvent} />
              </MapView>
            </View>
            <View style={styles.container}>
              <Text style={styles.containerTitle}>Liste des points du voyage</Text>
              <Text> This will contain all points of the trip. Clicking on a point must move the map to the selected point </Text>
            </View>
           <StatusBar style="auto" />
          </SafeAreaView>
    )
}