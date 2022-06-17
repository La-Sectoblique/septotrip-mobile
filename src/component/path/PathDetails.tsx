import { getStepById } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, {
  LatLng,
  Marker,
  Polyline,
} from "react-native-maps";
import { Loader } from "../utils/Loader";

interface PathDetailsProps {
  origin: StepOutput;
  path: PathOutput;
}

export const PathDetails = (props: PathDetailsProps) => {
  const [destination, setDestination] = useState<StepOutput>({} as StepOutput);
  const [loading, setLoading] = useState<boolean>(true);

  const [latitudeDelta, setLatitudeDelta] = useState<number>(0);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0);

  useEffect(() => {
    setLoading(true);


    

    getStepById(props.path.destinationId)
      .then((res: StepOutput) => {

        setLongitudeDelta(Math.abs(res.localisation.coordinates[0] - props.origin.localisation.coordinates[0]))
        setLatitudeDelta(Math.abs(res.localisation.coordinates[1] - props.origin.localisation.coordinates[1]))
        
        setDestination(res)
        setLoading(false)
      })
      .catch((err: ApiError) => {
        console.log(err)
        setLoading(false)
      })
  }, []);

  if (loading) return <Loader />;

  return (
    <View>
      <MapView
        rotateEnabled={false}
        provider={null}
        showsUserLocation={true}
        style={{
          width: (Dimensions.get("window").width * 50) / 100,
          height: (Dimensions.get("window").width * 50) / 100,
        }}
        loadingEnabled={true}
        initialRegion={{
          latitude: props.origin.localisation.coordinates[1],
          longitude: props.origin.localisation.coordinates[0],
          latitudeDelta: latitudeDelta*5,
          longitudeDelta: longitudeDelta*5,
        }}
      >
        <Marker
          key={props.origin.id}
          coordinate={
            {
              longitude: props.origin.localisation.coordinates[0],
              latitude: props.origin.localisation.coordinates[1],
            } as LatLng
          }
        />
        <Marker
          key={destination.id}
          coordinate={
            {
              longitude: destination.localisation.coordinates[0],
              latitude: destination.localisation.coordinates[1],
            } as LatLng
          }
        />
        <Polyline
          coordinates={[
            {
              longitude: props.origin.localisation.coordinates[0],
              latitude: props.origin.localisation.coordinates[1],
            } as LatLng,
            {
              longitude: destination.localisation.coordinates[0],
              latitude: destination.localisation.coordinates[1],
            } as LatLng,
          ]}
          strokeColor="blue"
          strokeWidth={6}
        />
      </MapView>
      <Text>Description: {props.path.description}</Text>
    </View>
  );
};
