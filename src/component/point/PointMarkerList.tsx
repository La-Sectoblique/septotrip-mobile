import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import { LatLng, Marker, Region } from "react-native-maps";

interface PointMarkerListProps {
  points: PointOutput[];
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setModalVisible: (arg0: boolean) => void;
  setRegion: (arg0: Region) => void
}

export const PointMarkerList = ({points, setActiveElement, setModalVisible, setRegion}: PointMarkerListProps) => {
  const handleClick = (point: PointOutput) => {
    setActiveElement(point);
    setModalVisible(true);
    setRegion({
      longitude: point.localisation.coordinates[0],
      latitude: point.localisation.coordinates[1],
      longitudeDelta: 0.05,
      latitudeDelta: 0.05
    })
  };

  if (points.length == 0) return <></>;

  return (
    <>
      {points.map((point: PointOutput) => {
        return (
          <Marker
            key={point.id}
            coordinate={
              {
                longitude: point.localisation.coordinates[0],
                latitude: point.localisation.coordinates[1],
              } as LatLng
            }
            pinColor="purple"
            onPress={() => {
              handleClick(point)
            }}
          />
        );
      })
      }
    </>
  );
};
