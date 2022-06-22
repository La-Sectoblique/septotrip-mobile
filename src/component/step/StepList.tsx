import React from "react";
import {
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { useTranslation } from "react-i18next";

interface StepListProps {
  gotoMap: (arg0: StepOutput | PointOutput) => void;
  steps: StepOutput[];
}

export const StepList = ({gotoMap, steps}: StepListProps) => {
  const { t, i18n } = useTranslation("locale");

  const handleClick = (step: StepOutput) => {
    gotoMap(step)
  };

  if (steps.length == 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        {t("trip.noStep")}
      </Text>
    );

  return (
    <>
      <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 24, textAlign: "center", fontWeight: "bold" }}>
      {t("trip.stepList")}
      </Text>

      <ScrollView>
      {steps.map((step: StepOutput, i) => {
        return (
          <TouchableHighlight
            underlayColor="#ccc"
            key={step.id}
            style={{ 
              padding: 5, 
              flexDirection: 'row', 
              alignContent: 'center', 
              justifyContent: 'flex-start', 
              backgroundColor: i%2 === 0 ? 'rgba(8, 182, 238, .2)': 'none'
            }}
            onPress={() => handleClick(step)}
          >
            <Text style={{marginLeft: 5, fontSize: 20, textAlign:'center'}}>
              {step.order}: {step.name}
            </Text>
          </TouchableHighlight>
        );
       
      })}
      </ScrollView>
    </>
  );
};
