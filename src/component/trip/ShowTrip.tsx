/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";

import {
  getTripPoints,
  getTripSteps,
} from "@la-sectoblique/septoblique-service";

import useSteps from "../../hook/useSteps";

import { StepMarkerList } from "../step/StepMarkerList";
import { StepList } from "../step/StepList";
import { StepPathList } from "../step/StepPathList";
import { ModalDetails } from "../utils/ModalDetails";
import { PointMarkerList } from "../point/PointMarkerList";
import usePoints from "../../hook/usePoints";
import { Dropdown } from "../utils/Dropdown";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import {
  LocalisationPoint,
  PointOutput,
} from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "../../models/NavigationParamList";



type ShowTripProps = NativeStackScreenProps<RootTabParamList, 'Voyage'>

export const ShowTrip: React.FC<ShowTripProps> = (props) => {

  const { trip, pointToFocus } = props.route.params
  const [steps, initStep, addStep, removeStep] = useSteps();

  const [activeElement, setActiveElement] = useState<
    StepOutput | PointOutput | { path: PathOutput; origin: StepOutput }
  >();
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const [filter, setFilter] = useState<string>("all");

  const [points, initPoint, addPoint, removePoint] = usePoints();
  
  //Default center the map on Paris coordinate
  const [focus, setFocus] = useState<LocalisationPoint>({
    type: "Point",
    coordinates: [2.349014, 48.864716],
  });
  const [region, setRegion] = useState<Region>();
  const [latitudeDelta, setLatitudeDelta] = useState<number>(0);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0);

  const [refreshing, setRefreshing] = useState<boolean>(true);

  const [error, setError] = useState<string>();
  const [location, setLocation] = useState<Location.LocationObject>();

  const _refresh = (trip: TripOutput) => {
    const trip_step = getTripSteps(trip.id).then((res: StepOutput[]) => {
      initStep(res);
      
      const trip_sort_longitude = res.sort((a, b) => {return a.localisation.coordinates[0] - b.localisation.coordinates[0] } )
      const trip_sort_latitude = res.sort((a, b) => {return a.localisation.coordinates[1] - b.localisation.coordinates[1] } )

      setLongitudeDelta(
        Math.abs(
          trip_sort_longitude[trip_sort_longitude.length - 1].localisation.coordinates[0] - 
          trip_sort_longitude[0].localisation.coordinates[0]
        )
      )
      setLatitudeDelta(
        Math.abs(
          trip_sort_latitude[trip_sort_latitude.length - 1].localisation.coordinates[1] - 
          trip_sort_latitude[0].localisation.coordinates[1]
        )
      )

      if (res.length > 0)
        setFocus({
          type: "Point",
          coordinates: res[0].localisation.coordinates,
        });
    });

    const trip_point = getTripPoints(trip.id).then((res: PointOutput[]) => {
      initPoint(res);
    });

    Promise.all([trip_step, trip_point])
      .catch((err: ApiError) => console.log(JSON.stringify(err)))
      .finally(() => setRefreshing(false));
  };

 
  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get("window").height * 50/100,
      width: Dimensions.get("window").width,
      backgroundColor: "tomato",
    },
    map: {
      flex: 1,
    },
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (trip == undefined) return;

    _refresh(trip);

  }, []);


  //WHen POI is click on Day page pointToFocus change and navigate to ShowTrip, so region have to change
  useEffect(() => {
    if(pointToFocus === undefined)
      return
    setRegion({
      longitude: pointToFocus.localisation.coordinates[0],
      latitude: pointToFocus.localisation.coordinates[1],
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    })
  }, [pointToFocus])

  if (trip == undefined) {
    return <></>;
  }

  if (refreshing) {
    return <Text>ça charche bg tkt</Text>;
  }

  return (
    <PTRView onRefresh={() => _refresh(trip)}>
      <View>
        <ModalDetails
          activeElement={activeElement}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Dropdown
          items={[
            { label: "Etape", value: "step" },
            { label: "Point d'intérêts", value: "point" },
            { label: "Tout", value: "all" },
          ]}
          setCurrentValue={setFilter}
          currentValue={filter}
          key="dropdown"
        />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            rotateEnabled={false}
            provider={null}
            showsUserLocation={true}
            loadingEnabled={true}
            initialRegion={{
              latitude: focus.coordinates[1],
              longitude: focus.coordinates[0],
              latitudeDelta: latitudeDelta*5,
              longitudeDelta: longitudeDelta*5,
            }}
            region={region}
            
            
          >
            {filter == "step" || filter == "all" ? (
              <>
                <StepMarkerList
                  steps={steps}
                  setActiveElement={setActiveElement}
                  setModalVisible={setModalVisible}
                  setRegion={setRegion}
                />
                <StepPathList
                  steps={steps}
                  setActiveElement={setActiveElement}
                  setModalVisible={setModalVisible}
                />
              </>
            ) : (
              <></>
            )}

            {filter == "point" || filter == "all" ? (
              <PointMarkerList
                points={points}
                setActiveElement={setActiveElement}
                setModalVisible={setModalVisible}
                setRegion={setRegion}
              />
            ) : (
              <></>
            )}
          </MapView>
        </View>
        <StepList
          steps={steps}
          setActiveElement={setActiveElement}
          setModalVisible={setModalVisible}
          setRegion={setRegion}
        ></StepList>
      </View>
    </PTRView>
  );
};
