import { useState } from "react";

export default function useMarkers(initialMarkers) {

  const [markers, setMarkers] = useState(initialMarkers);

  const addMarker = (marker) => {
    setMarkers(((old) => [...old, marker]))
  };

  const removeMarker = (marker) => {
    setMarkers(markers.filter((item) => item != marker));
  };

  return [markers, addMarker, removeMarker];
}