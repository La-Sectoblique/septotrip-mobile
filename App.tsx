import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView, { Polyline } from 'react-native-maps'
import React, { useState } from 'react';

import useMarkers from './hook/useMarkers';
import useRoutes from './hook/useRoutes';

import { ListMarkers } from './component/ListMarkers';
import { ListRoutes } from './component/ListRoutes';

import { MarkerCustom, Route, MapEvent } from './type_tmp';


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




export default function App() {
  const [markers, addMarker, removeMarker] = useMarkers();
  const [routes, addRoute, removeRoute] = useRoutes();
  const [formName, setFormName] = useState<string>('')
  const [activeComponent, setActiveComponent] = useState<MarkerCustom | Route | null>(null)

  const handleMapPressEvent = (event: MapEvent): void => {
    if(formName.length == 0)
      return

    const newMarker = {name:formName, coordinate: event.coordinate, point: event.position}
    addMarker(newMarker)
    setFormName('')

    if(markers.length < 1)
      return
    const departure = markers[markers.length - 1]
    const destination = newMarker

    addRoute({name:`${departure.name} - ${destination.name}`, coordinate: departure.coordinate, coordinateEnd: destination.coordinate})
  }

  const handlePressEvent = (marker: MarkerCustom | Route): void => {
    setActiveComponent(marker)
  }

  return (
       <SafeAreaView style={styles.page}>
         {
            activeComponent == null ? <></>:
            <>
              <Text>{activeComponent.name}</Text>
              <Text>{activeComponent.coordinate.latitude} : {activeComponent.coordinate.longitude}</Text>
            </>
          }
        <View style={styles.container}>
          
          <MapView style={styles.map} rotateEnabled={false} onPress={(e) => {handleMapPressEvent(e.nativeEvent)}}>
            
              <ListMarkers markers={markers} handlePressEvent={handlePressEvent}/>
              <ListRoutes routes={routes} handlePressEvent={handlePressEvent} />
            
          </MapView>
        </View>
        <TextInput style={styles.input} placeholder='nom du marker' value={formName} onChangeText={setFormName}/>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}
