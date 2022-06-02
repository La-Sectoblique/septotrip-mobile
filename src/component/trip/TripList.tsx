import { getUserTrips } from "@la-sectoblique/septoblique-service"
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ListRenderItem, RefreshControl } from "react-native"
import useTrips from "../../hook/useTrips"
import { RootStackParamList } from "../../models/NavigationParamList"
import { DebugScript } from "../utils/DebugScript"
import { TripDetails } from "./TripDetails"

type TripListProps = NativeStackScreenProps<RootStackParamList, 'TripList'>


export const TripList: React.FC<TripListProps> = (props) => {
    const [trips, initTrip] = useTrips();
    const [started_trip, setStartedTrip] = useState<TripOutput>();
    const [refreshing, setRefreshing] = useState<boolean>(true)

    const renderItem: ListRenderItem<TripOutput> = ({item}) => (
        <TripDetails key={item.id} trip={item} navigation={props.navigation} have_started_trip={started_trip !== undefined}/>
    )
    const fetchData = () => {
        getUserTrips()
          .then((res: TripOutput[]) => {
            setRefreshing(false)
            const filtered_trips = res.filter(trip => trip.startDate != undefined)
            setStartedTrip(filtered_trips[0])
            initTrip(res.filter(trip => trip.startDate == undefined))
        })
        .catch(async (err: ApiError) => {
            console.error(JSON.stringify(err))
        })

    }
    useEffect(() => { 
        fetchData()      
      }, [])
  
  
  if (trips.length == 0)
    return (
      <View>
        <DebugScript />

        <Text>Aucun voyage existe pour ce compte</Text>
        <Text>Utilisez le service Web pour créer un voyage</Text>
      </View>
    );
  
  if (started_trip){
    props.navigation.navigate("Planification", {trip: started_trip, isReadOnly: false})
  }

  return (
    <>
    {/* <DebugScript /> */}
      <Text
        style={{ textAlign: "center", marginVertical: 10, fontWeight: "bold" }}
      >
        Liste des voyages
      </Text>
      {
        started_trip ?
          <TripDetails key={started_trip.id} trip={started_trip} navigation={props.navigation} started={true} have_started_trip={started_trip !== undefined}/>
        :
        <></>
      }
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item: TripOutput) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
      {/* <DebugScript /> */}
    </>
  );
};
