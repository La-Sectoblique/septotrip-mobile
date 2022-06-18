import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTodoEntriesByTripId } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { TodoEntryOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Todo";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });

type TripViewerTaskProps = NativeStackScreenProps<RootTabParamList, 'Tache'>

export const TripViewerTask: React.FC<TripViewerTaskProps> = (props) => {
  const { trip } = props.route.params;
  
  const [todoEntries, setTodoEntries] = useState<TodoEntryOutput[]>([] as TodoEntryOutput[]);

  const _refresh = () => {
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
      <SafeAreaView style={styles.page}>
        <Text style={{fontSize: 20, marginStart: 10}}>Liste des taches</Text>
        <View>
          {
            todoEntries.map((todoEntry) => {
              return <Text key={todoEntry.id}>- {todoEntry.description}</Text>
            })
          }
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
};
