import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";

import { TripList } from "../../component/trip/TripList";
import { ShowTrip } from "../../component/trip/ShowTrip";
import { TripViewerInfo } from "./trip_viewer_info";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export const TripViewerMap = ({ navigation }: any) => {
  const [activeTrip, setActiveTrip] = useState<TripOutput>({} as TripOutput);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (activeTrip != null) navigation.navigate("ShowTrip");
  }, [activeTrip]);

  if (loading) {
    return <></>;
  }

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VoyageList"
        children={() => <TripList setActiveTrip={setActiveTrip} />}
      />
      <Stack.Screen
        name="ShowTrip"
        children={() => <ShowTrip trip={activeTrip} />}
      />
      <Stack.Screen name="Info" component={TripViewerInfo} />
    </Stack.Navigator>
  );
};
