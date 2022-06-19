import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTodoEntriesByTripId, getTravelers } from "@la-sectoblique/septoblique-service";
import { UserOutput } from "@la-sectoblique/septoblique-service/dist/types/models/User";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import PTRView from "react-native-pull-to-refresh";
import { TodoEntryOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Todo";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    mainContainer: {
      flexDirection: 'row',
    },
    container: {
      height: 150,
      width: Dimensions.get("window").width / 2,
      backgroundColor: 'lightgray',
      padding: 5,
      margin: 5,
      borderRadius: 10,
      flex: 1
    },
    containerTitle: {
      fontSize: 35
    },
    input: {
      borderWidth: 2,
      width: Dimensions.get('window').width,
      paddingVertical: 2,
      paddingLeft: 10,
      marginVertical: 10 
    }
  });

type TripViewerInfoProps = NativeStackScreenProps<RootTabParamList, 'Info'>

export const TripViewerInfo: React.FC<TripViewerInfoProps> = (props) => {
  const { trip } = props.route.params;
  
  const [travelers, setTravelers] = useState<UserOutput[]>([] as UserOutput[]);
  const [todoEntries, setTodoEntries] = useState<TodoEntryOutput[]>([] as TodoEntryOutput[]);

  const _refresh = () => {
    getTravelers(trip.id)
    .then((res: UserOutput[]) => {
      setTravelers(res)
    })
    .catch((err: ApiError) => {
      console.error(err)
    })

    getTodoEntriesByTripId(trip.id)
    .then((res: TodoEntryOutput[]) => {
        setTodoEntries(res)
    })
    .catch((err: ApiError) => {
      console.error(err)
    })
  }

  useEffect(() => {
    _refresh()
  }, [])

  return (
    <PTRView style={{flex: 1}} onRefresh={() => {_refresh()}}>
      <SafeAreaView style={styles.page}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={{fontSize: 20}}>Liste des membres: </Text>
            {
              travelers.map((traveler) => {
                return <Text key={traveler.id}>- {traveler.firstName} {traveler.lastName}</Text>
              })
            }
          </View>
          <View style={styles.container}>
            <Text  style={{fontSize: 20}}>Liste des taches</Text>
            {
              todoEntries.map((todoEntry) => {
                return <Text key={todoEntry.id}>- {todoEntry.description}</Text>
              })
            }
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PTRView>
  );
};
