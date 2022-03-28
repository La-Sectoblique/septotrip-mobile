import { isTripOutput, TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { useState } from "react";

export default function useTrips(): [TripOutput[], (trips: TripOutput[]) => void, (trip: TripOutput | TripOutput[]) => void, (trip: TripOutput) => void] {

  const [trips, setTrips] = useState([] as TripOutput[]);

  const initTrip = (trips: TripOutput[]): void => {
    setTrips([...trips])
  };

  const addTrip = (trips: TripOutput | TripOutput[]): void => {
    if(isTripOutput(trips))
      setTrips((previousState: TripOutput[]) => [...previousState, trips])
    else
      setTrips((previousState: TripOutput[]) => [...previousState, ...trips])
  };

  const removeTrip = (trip: TripOutput): void => {
    setTrips(trips.filter((item) => item != trip));
  };

  return [trips, initTrip, addTrip, removeTrip];
}