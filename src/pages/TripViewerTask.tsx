import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl, ListRenderItem } from "react-native";
import Toast from "react-native-toast-message"
import { StatusBar } from "expo-status-bar";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTodoEntriesByTripId } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { TodoEntryOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Todo";
import { Todo } from "../component/todoEntry/Todo";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });

type TripViewerTaskProps = NativeStackScreenProps<RootTabParamList, 'Tache'>

export const TripViewerTask: React.FC<TripViewerTaskProps> = ({route}) => {
  const { trip } = route.params;
  
  const [loading, setLoading] = useState<boolean>(true)
  const [todoEntries, setTodoEntries] = useState<TodoEntryOutput[]>([] as TodoEntryOutput[]);

  const renderItem: ListRenderItem<TodoEntryOutput> = ({ item }) => (
    <Todo key={item.id} todo={item} refresh={_refresh}/>  
  )

  const _refresh = () => {
    getTodoEntriesByTripId(trip.id)
    .then((res: TodoEntryOutput[]) => {
        setTodoEntries(res)
        setLoading(false)
    })
    .catch((err: ApiError) => {
      console.error(err)

      Toast.show({
        type: 'error',
        text1: err.name,
        text2: err.code + " " + err.message
      })
      setLoading(false)
    })
  }

  useEffect(() => {
    _refresh()
  }, [])

  return (
      <View style={styles.page}>
        <Text style={{fontSize: 20, marginStart: 10}}>Liste des taches</Text>
        <FlatList
            data={todoEntries}
            renderItem={renderItem}
            keyExtractor={(item: TodoEntryOutput) => item.id.toString()}
            style={{
            }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={_refresh} />
            }
        />
        <StatusBar style="auto" />
      </View>
  );
};
