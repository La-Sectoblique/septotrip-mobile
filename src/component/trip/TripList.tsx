import { getUserTrips } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import useTrips from "../../hook/useTrips";
import { DebugScript } from "../utils/DebugScript";
import { TripDetails } from "./TripDetails";

interface TripListProps {
  setActiveTrip: (arg0: TripOutput) => void;
}

export const TripList = (props: TripListProps) => {
  const [trips, initTrip, addTrip, removeTrip] = useTrips();
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const renderItem: ListRenderItem<TripOutput> = ({ item }) => (
    <TripDetails
      key={item.id}
      trip={item}
      setActiveTrip={props.setActiveTrip}
    />
  );
  const fetchData = () => {
    getUserTrips()
      .then((res: TripOutput[]) => {
        setRefreshing(false);
        initTrip(res);
      })
      .catch((err: ApiError) => console.error(JSON.stringify(err)));
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (trips.length == 0)
    return (
      <View>
        <DebugScript />

        <Text>Aucun voyage existe pour ce compte</Text>
        <Text>Utilisez l'application Web pour créer un voyage</Text>
      </View>
    );
  return (
    <>
      <Text
        style={{ textAlign: "center", marginVertical: 10, fontWeight: "bold" }}
      >
        Liste des voyages
      </Text>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item: TripOutput, index: number) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
      {/* <DebugScript /> */}
    </>
  );
};
