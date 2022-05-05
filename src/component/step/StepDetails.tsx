import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";

interface StepDetailsProps {
  step: StepOutput | undefined;
}

export const StepDetails = (props: StepDetailsProps) => {
  if (props.step == null) return <></>;
  return (
    <View style={{ borderWidth: 2, marginHorizontal: 5, marginVertical: 5 }}>
      <Text
        style={{
          marginVertical: 5,
          marginHorizontal: 5,
          textDecorationLine: "underline",
        }}
      >
        Détails de l'étape:{" "}
      </Text>

      <Text style={{ textAlign: "center", marginVertical: 5 }}>
        {props.step.name}
      </Text>
      <Text style={{ textAlign: "center", marginVertical: 5 }}>
        Etape: {props.step.order}
      </Text>
    </View>
  );
};
