import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text } from "react-native";
import { TripDetails } from "./TripDetails";

interface TripListProps {
  trips: TripOutput[];
  setActiveTrip: (arg0: TripOutput) => void;
}

export const TripList = (props: TripListProps) => {
  if (props.trips.length == 0)
    return (
      <View>
        <Text>Aucun voyage existe pour ce compte</Text>
        <Text>Utilisez l'application Web pour créer un voyage</Text>
      </View>
    );
  return (
    <View>
      {props.trips.map((trip) => {
        return (
          <TripDetails
            key={trip.id}
            trip={trip}
            setActiveTrip={props.setActiveTrip}
          />
        );
      })}
    </View>
  );
};
