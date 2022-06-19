import React from "react";
import {
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { Region } from "react-native-maps";

interface StepListProps {
  setModalVisible: (arg0: boolean) => void;
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setRegion: (arg0: Region) => void;
  steps: StepOutput[];
}

export const StepList = (props: StepListProps) => {
 
  const handleClick = (step: StepOutput) => {
    props.setActiveElement(step);
    props.setModalVisible(true);
    props.setRegion({
      latitude: step.localisation.coordinates[1],
      longitude: step.localisation.coordinates[0],
      latitudeDelta: 1,
      longitudeDelta: 1
    })
  };

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

      <ScrollView>
      {props.steps.map((step: StepOutput) => {
        return (
          <TouchableHighlight
            underlayColor="#ccc"
            key={step.id}
            onPress={() =>
              handleClick(step)
            }
          >
            <Text style={{ marginHorizontal: 10 }}>
              {step.order}: {step.name}
            </Text>
          </TouchableHighlight>
        );
       
      })}
      </ScrollView>
    </>
  );
};
