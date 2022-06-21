import { getAllPublicTrips, getUserTrips } from "@la-sectoblique/septoblique-service"
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState, useLayoutEffect } from "react"
import { View, Text, FlatList, ListRenderItem, RefreshControl, Image, TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message"
import { RootStackParamList } from "../models/NavigationParamList"
import { TripDetails } from "../component/trip/TripDetails"

import { Loader } from "../component/utils/Loader"
import { MaterialIcons } from "@expo/vector-icons"
import { DebugScript } from "../component/utils/DebugScript";

type TripListProps = NativeStackScreenProps<RootStackParamList, 'TripList'>


export const TripList: React.FC<TripListProps> = ({navigation}) => {
    const [trips, setTrips] = useState<TripOutput[]>([] as TripOutput[]);
    const [public_trips, setPublicTrips] = useState<TripOutput[]>([] as TripOutput[])
    const [started_trip, setStartedTrip] = useState<TripOutput>();
    const [refreshing, setRefreshing] = useState<boolean>(true)
    
    const disconnect = async () => {
      await SecureStore.deleteItemAsync('token');
      navigation.replace('Login')

    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          return <MaterialIcons onPress={() => disconnect()} name="logout" size={24} color="black" />
        },
      });
    }, [navigation]);
  


    const renderItem: ListRenderItem<TripOutput> = ({item}) => (
        <TripDetails key={item.id} trip={item} navigation={navigation} have_started_trip={started_trip !== undefined} is_public={item.visibility === "public"}/>
    )

    const fetchData = () => {
        const get_user_trip = getUserTrips()
          .then((res: TripOutput[]) => {
            const filtered_trips = res.filter(trip => trip.startDate != undefined)
            setStartedTrip(filtered_trips[0])
            setTrips(res.filter(trip => trip.startDate == undefined))
        })
        .catch((err: ApiError) => {
          console.error(err)

          Toast.show({
            type: 'error',
            text1: err.name,
            text2: err.code + " " + err.message
          })
        })

        const get_public_trip = getAllPublicTrips()
        .then((res: TripOutput[]) => setPublicTrips(res))
        .catch((err: ApiError) => {
          console.error(err)

          Toast.show({
            type: 'error',
            text1: err.name,
            text2: err.code + " " + err.message
          })
        })

        Promise.all([get_user_trip, get_public_trip])
        .then(() => setRefreshing(false))

    }
    useEffect(() => { 
        fetchData()      
      }, [])
  

  if(refreshing)
    return <Loader />
    
  if (trips.length == 0 && !started_trip)
    return (
      <View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
        {/* <DebugScript /> */}
        <Image source={require("../../assets/splash.png")} style={{resizeMode: 'contain', aspectRatio: 4}}/>
        <View>
          <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold"}}>Aucun voyage existe pour ce compte</Text>
          <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold"}}>Utilisez le service Web pour créer un voyage</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => fetchData()}
          style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
        >
          <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Rafraîchir</Text>
        </TouchableOpacity>
      </View>
    );
  
  
  return (
    <View>
      {/* <DebugScript /> */}

      {
        started_trip &&
        <View>
          <Text style={{ textAlign: "left", marginVertical: 10,marginStart: 10, fontWeight: "bold", fontSize: 24 }}>Voyage commencé</Text>

          <TripDetails key={started_trip.id} trip={started_trip} navigation={navigation} started={true} have_started_trip={started_trip !== undefined} />
        </View>
      }
      {
        trips.length > 0 &&
        <View style={{height: "50%"}}>
          <Text style={{ textAlign: "left", marginVertical: 10,marginStart: 10, fontWeight: "bold", fontSize: 24 }}>Mes voyages</Text>
          <FlatList
            data={trips}
            renderItem={renderItem}
            keyExtractor={(item: TripOutput) => item.id.toString()}
            style={{borderWidth: 1, margin: 5, borderRadius: 10}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          />
        </View>
      }
      {
        public_trips.length > 0 &&
        <View style={{height: "40%"}}>
          <Text style={{ textAlign: "left", marginVertical: 10,marginStart: 10, fontWeight: "bold", fontSize: 24 }}>Voyages publics</Text>
          <FlatList
            data={public_trips}
            renderItem={renderItem}
            keyExtractor={(item: TripOutput) => item.id.toString()}
            style={{borderWidth: 1, margin: 5, borderRadius: 10}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          />
        </View>
      }
      </View>
  );
};
