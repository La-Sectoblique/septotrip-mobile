import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView, { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'
import React, { useState } from 'react';
import useMarkers from './hook/useMarkers';


interface MarkerCustom {
  name?: string;
  coordinate: LatLng; 
  position?: Point; 
}
interface Route extends MarkerCustom{
  coordinateEnd: LatLng
}
interface MapEvent extends MarkerCustom{
  action: EventActionType; 
  id?: string | undefined;
}

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
  const [markers, addMarker, removeMarker] = useMarkers([]);
  const [routes, addRoute, removeRoute] = useMarkers([]);
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

  const handlePressEvent = (marker: MarkerCustom): void => {
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
            {
              markers.length == 0 ? <></>:
              markers.map((marker: MarkerCustom, i: number) => 
                <Marker key={i} 
                  coordinate={marker.coordinate} 
                  anchor={marker.position} 
                  onPress={(event) => handlePressEvent(marker)}
                />)
            }
            {
              routes.length == 0? <></> :
              routes.map((route: Route,i: number) => {
                return <Polyline
                  key={i}
                  coordinates={[
                    route.coordinate,
                    route.coordinateEnd
                  ]}
                  strokeColor= {i%2 ? "red": "blue"}
                  strokeWidth={6}
                  tappable={true}
                  onPress={(e) => {handlePressEvent(route)}}
              />
              })

            }
            
          </MapView>
        </View>
        <TextInput style={styles.input} placeholder='nom du marker' value={formName} onChangeText={setFormName}/>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}
