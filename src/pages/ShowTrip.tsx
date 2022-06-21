/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import Toast from "react-native-toast-message"
import * as Location from "expo-location";

import {
  getTripPoints,
  getTripSteps,
} from "@la-sectoblique/septoblique-service";


import { StepMarkerList } from "../component/step/StepMarkerList";
import { StepPathList } from "../component/step/StepPathList";
import { ModalDetails } from "../component/utils/ModalDetails";
import { PointMarkerList } from "../component/point/PointMarkerList";
import { Dropdown } from "../component/utils/Dropdown";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import {
  LocalisationPoint,
  PointOutput,
} from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "../models/NavigationParamList";
import { Loader } from "../component/utils/Loader";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";



type ShowTripProps = NativeStackScreenProps<RootTabParamList, 'Carte'>

export const ShowTrip: React.FC<ShowTripProps> = ({route, navigation}) => {
  const isFocused= useIsFocused()

  const { trip, pointToFocus } = route.params
  const [steps, setSteps] = useState<StepOutput[]>([] as StepOutput[]);

  const [activeElement, setActiveElement] = useState<
    StepOutput | PointOutput | { path: PathOutput; origin: StepOutput }
  >();
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const [filter, setFilter] = useState<string>("all");

  const [points, setPoints] = useState<PointOutput[]>([] as PointOutput[]);
  
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
      setSteps(res.sort((a,b) => a.order - b.order));

      if (res.length > 0)
        setFocus({
          type: "Point",
          coordinates: res[0].localisation.coordinates,
        });
      
      if(res.length < 2)
        return

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

      
    });

    const trip_point = getTripPoints(trip.id).then((res: PointOutput[]) => {
      setPoints(res);
    });

    Promise.all([trip_step, trip_point])
      .then(() => setRefreshing(false))
      .catch((err: ApiError) => {
        console.error(err)

        Toast.show({
          type: 'error',
          text1: err.name,
          text2: err.code + " " + err.message
        })
        setRefreshing(false)
      })
  };

 
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,

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

  }, [isFocused]);



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
    return <Loader />;
  }

  return (
      <View>
        <ModalDetails
          activeElement={activeElement}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
    
        <View style={styles.container}>
        <Dropdown
          items={[
            { label: "Etape", value: "step" },
            { label: "Point d'intérêts", value: "point" },
            { label: "Tout", value: "all" },
          ]}
          setCurrentValue={setFilter}
          currentValue={filter}
          map={true}
          key="dropdown"
        />

        <TouchableOpacity
          style={{
              backgroundColor: "#1B91BF",
              marginLeft: 5,
              padding: 5,
              borderRadius: 10,
              position: "absolute",
              top: 60,
              zIndex: 999,
              opacity: 0.7
          }}
          onPress={() => _refresh(trip)}
        >
          <Feather name="refresh-ccw" size={32} color="white" />
        </TouchableOpacity> 


          <MapView
            style={styles.map}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
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
            {(filter == "step" || filter == "all") && (
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
            )}

            {(filter == "point" || filter == "all") && (
              <PointMarkerList
                points={points}
                setActiveElement={setActiveElement}
                setModalVisible={setModalVisible}
                setRegion={setRegion}
              />
            )}
          </MapView>
        </View>
      </View>
  );
};
