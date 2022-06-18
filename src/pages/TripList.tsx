import { getAllPublicTrips, getUserTrips } from "@la-sectoblique/septoblique-service"
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ListRenderItem, RefreshControl, Image } from "react-native"
import useTrips from "../hook/useTrips"
import { RootStackParamList } from "../models/NavigationParamList"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DebugScript } from "../component/utils/DebugScript"
import { TripDetails } from "../component/trip/TripDetails"

import { Loader } from "../component/utils/Loader"

type TripListProps = NativeStackScreenProps<RootStackParamList, 'TripList'>


export const TripList: React.FC<TripListProps> = (props) => {
    const [trips, initTrip] = useTrips();
    const [public_trips, setPublicTrips] = useState<TripOutput[]>([] as TripOutput[])
    const [started_trip, setStartedTrip] = useState<TripOutput>();
    const [refreshing, setRefreshing] = useState<boolean>(true)
    
    useEffect(() => {
        props.navigation.addListener('beforeRemove', (e) => {
          // Prevent default behavior of leaving the screen
          e.preventDefault();

        })}, [props.navigation]);
        
    const renderItem: ListRenderItem<TripOutput> = ({item}) => (
        <TripDetails key={item.id} trip={item} navigation={props.navigation} have_started_trip={started_trip !== undefined}/>
    )

    const fetchData = () => {
        const get_user_trip = getUserTrips()
          .then((res: TripOutput[]) => {
            const filtered_trips = res.filter(trip => trip.startDate != undefined)
            setStartedTrip(filtered_trips[0])
            initTrip(res.filter(trip => trip.startDate == undefined))
        })
        .catch((err: ApiError) => {
            console.error(JSON.stringify(err))
        })

        const get_public_trip = getAllPublicTrips()
        .then((res: TripOutput[]) => setPublicTrips(res))
        .catch(async (err: ApiError) => {
          console.error(JSON.stringify(err))
        })

        Promise.all([get_user_trip, get_public_trip])
        .then(() => setRefreshing(false))

    }
    useEffect(() => { 
        fetchData()      
      }, [])
  
  if (started_trip){
    props.navigation.navigate("Planification", {trip: started_trip, isReadOnly: false})
  }

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
      </View>
    );
  
  
  return (
    <View>
    {/* <DebugScript /> */}

      {
        started_trip &&
        <View>
          <Text style={{ textAlign: "left", marginVertical: 10,marginStart: 10, fontWeight: "bold", fontSize: 24 }}>Voyage commencé</Text>

          <TripDetails key={started_trip.id} trip={started_trip} navigation={props.navigation} started={true} have_started_trip={started_trip !== undefined}/>
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
        <View style={{height: "50%"}}>
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
      
      {/* <DebugScript /> */}
    </View>
  );
};
