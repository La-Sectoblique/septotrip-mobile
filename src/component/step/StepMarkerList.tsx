import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import {
  LatLng,
  Marker,
  Region,
} from "react-native-maps";

interface StepMarkerListProps {
  steps: StepOutput[];
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setModalVisible: (arg0: boolean) => void;
  setRegion: (arg0: Region) => void
}

export const StepMarkerList = (props: StepMarkerListProps): JSX.Element => {
  const handleClick = (step: StepOutput) => {
    props.setActiveElement(step);
    props.setModalVisible(true);
    props.setRegion({
      longitude: step.localisation.coordinates[0],
      latitude: step.localisation.coordinates[1],
      longitudeDelta: 0.05,
      latitudeDelta: 0.05
    })
  };

  if (props.steps.length == 0) return <></>;

  return (
    <>
      {props.steps.map((step: StepOutput) => {
        return (
          <Marker
            key={step.id}
            coordinate={
              {
                longitude: step.localisation.coordinates[0],
                latitude: step.localisation.coordinates[1],
              } as LatLng
            }
            onPress={() => handleClick(step)}
          />
        );
      })}
    </>
  );
};
