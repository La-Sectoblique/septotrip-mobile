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

interface PathDetailsProps {
  origin: StepOutput;
  path: PathOutput;
}

export const PathDetails = (props: PathDetailsProps) => {
  const [destination, setDestination] = useState<StepOutput>({} as StepOutput);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    getStepById(props.path.destinationId)
      .then((res: StepOutput) => setDestination(res))
      .catch((err: ApiError) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>ça charge bg tkt</Text>;

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
          latitudeDelta: 50,
          longitudeDelta: 50,
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
