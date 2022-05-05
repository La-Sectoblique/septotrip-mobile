import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";

interface TripDetailsProps {
  trip: TripOutput;
  setActiveTrip: (arg0: TripOutput) => void;
}

export const TripDetails = (props: TripDetailsProps) => {
  const handlePressEvent = () => {
    props.setActiveTrip(props.trip);
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePressEvent}>
        <Text>{props.trip.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
