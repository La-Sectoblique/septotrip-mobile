import { useState } from "react";
import { MarkerCustom } from "../type_tmp";

export default function useMarkers(): [MarkerCustom[], (marker: MarkerCustom) => void, (marker: MarkerCustom) => void] {

  const [markers, setMarkers] = useState([] as MarkerCustom[]);

  const addMarker = (marker: MarkerCustom): void => {
    setMarkers((previousState: MarkerCustom[]) => [...previousState, marker])
  };

  const removeMarker = (marker: MarkerCustom): void => {
    setMarkers(markers.filter((item) => item != marker));
  };

  return [markers, addMarker, removeMarker];
}