import React from "react";
import {
  Dimensions,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from "react-native";

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";

interface StepListProps {
  steps: StepOutput[];
}

export const StepList = (props: StepListProps) => {
  const styles = StyleSheet.create({
    stepcircle: {
      borderRadius:
        Math.round(
          (Dimensions.get("window").width * 1) / (props.steps.length * 5)
        ) / 2,
      width: (Dimensions.get("window").width * 1) / (props.steps.length * 5),
      height: (Dimensions.get("window").width * 1) / (props.steps.length * 5),
      backgroundColor: "#999",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (props.steps.length == 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Ce voyage ne possède aucun étape
      </Text>
    );

  return (
    <>
      <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 18 }}>
        Liste des étapes:{" "}
      </Text>
      {props.steps.map((step: StepOutput, i: number) => {
        return (
          <View
            key={step.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 5,
              marginVertical: 2,
            }}
          >
            <TouchableHighlight
              style={styles.stepcircle}
              underlayColor="#ccc"
              onPress={() =>
                alert(step.name + "\n" + step.localisation.coordinates)
              }
            >
              <Text></Text>
            </TouchableHighlight>
            <Text style={{ textAlign: "center", marginHorizontal: 2 }}>
              {step.name}
            </Text>
          </View>
        );
      })}
    </>
  );
};
