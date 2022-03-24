import { isPointOutput, PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { useState } from "react";

export default function useMarkers(): [PointOutput[], (markers: PointOutput[]) => void, (marker: PointOutput | PointOutput[]) => void, (marker: PointOutput) => void] {

  const [markers, setMarkers] = useState([] as PointOutput[]);

  const initMarker = (markers: PointOutput[]): void => {
    setMarkers([...markers])
  };

  const addMarker = (markers: PointOutput | PointOutput[]): void => {
    if(isPointOutput(markers))
      setMarkers((previousState: PointOutput[]) => [...previousState, markers])
    else
      setMarkers((previousState: PointOutput[]) => [...previousState, ...markers])
  };

  const removeMarker = (marker: PointOutput): void => {
    setMarkers(markers.filter((item) => item != marker));
  };

  return [markers, initMarker, addMarker, removeMarker];
}