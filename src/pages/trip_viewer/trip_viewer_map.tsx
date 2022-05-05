import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { addStep, getUserTrips } from "@la-sectoblique/septoblique-service";

import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";

import useTrips from "../../hook/useTrips";

import { TripList } from "../../component/trip/TripList";
import { ShowTrip } from "../../component/trip/ShowTrip";
import { ApiResponse } from "@la-sectoblique/septoblique-service/dist/types/utils/Api";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export const TripViewerMap = () => {
  const [trips, initTrip, addTrip, removeTrip] = useTrips();
  const [activeTrip, setActiveTrip] = useState<TripOutput>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getUserTrips()
      .then((res: TripOutput[]) => initTrip(res))
      .catch((err: ApiError) => console.error(JSON.stringify(err)))
      .finally(() => setLoading(false));
  }, []);

  if (activeTrip != null) return <ShowTrip trip={activeTrip} />;

  return (
    <SafeAreaView style={styles.page}>
      <Text>Liste des voyages</Text>
      <TripList trips={trips} setActiveTrip={setActiveTrip} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
