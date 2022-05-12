import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import * as React from "react";
import { View, Text } from "react-native";

interface StepDetailsProps {
  step: StepOutput;
}

export const StepDetails = (props: StepDetailsProps) => {
  if (props.step == null) return <></>;
  return (
    <View>
      <Text>{`Nom de l'étape: ${props.step.name}`}</Text>
      <Text>{`Durée de l'étape: ${props.step.duration} `} </Text>
    </View>
  );
};
