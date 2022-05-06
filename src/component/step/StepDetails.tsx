import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";

interface StepDetailsProps {
  step: StepOutput;
}

export const StepDetails = (props: StepDetailsProps) => {
  if (props.step == null) return <></>;
  return (
    <View>
      <MapView
        rotateEnabled={false}
        provider={null}
        style={{
          width: (Dimensions.get("window").width * 50) / 100,
          height: (Dimensions.get("window").width * 50) / 100,
        }}
        showsUserLocation={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: props.step.localisation.coordinates[1],
          longitude: props.step.localisation.coordinates[0],
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        <Marker
          key={props.step.id}
          coordinate={
            {
              longitude: props.step.localisation.coordinates[0],
              latitude: props.step.localisation.coordinates[1],
            } as LatLng
          }
        />
      </MapView>
      <Text>{`Nom de l'étape: ${props.step.name}`}</Text>
      <Text>{`Durée de l'étape: ${props.step.duration} `} </Text>
    </View>
  );
};
