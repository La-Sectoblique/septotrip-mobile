import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView, { Polyline } from 'react-native-maps'
import React, { useEffect, useState } from 'react';

import useMarkers from './src/hook/useMarkers';
import useRoutes from './src/hook/useRoutes';

import { ListMarkers } from './src/component/ListMarkers';
import { ListRoutes } from './src/component/ListRoutes';

import { Route, MapEvent } from './type_tmp';
import { addPoint, getUserPoints, init, login, register } from '@la-sectoblique/septoblique-service';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';


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
  const [activeComponent, setActiveComponent] = useState<PointOutput | Route | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {

    // register({email: 'test@ladwein.fr', password: '1234'})
    // .then((res) => console.log(res.message))

    login({email: 'test@ladwein.fr', password: '1234'})
    .then(() => {
      setLoading(true)
      getUserPoints()
        .then((res) => {
          addMarker(res);
          setLoading(false);
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))

    
  },[])

  init({url: 'http://api.septotrip.com', 
    getToken: async  () => {
      const get_auth = await SecureStore.getItemAsync('auth_token')
      if (!get_auth){
        return ''
      }

      return get_auth
    },
    storeToken: (token: string) => {
      SecureStore.setItemAsync('auth_token', token);
    }
  })
  
  const handlePressEvent = (marker: PointOutput | Route): void => {
    setActiveComponent(marker)
  }

  if(loading)
    return <></>
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
          
          <MapView style={styles.map} rotateEnabled={false}>
              <ListMarkers markers={markers} handlePressEvent={handlePressEvent}/>
              <ListRoutes routes={routes} handlePressEvent={handlePressEvent} />
            
          </MapView>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}
