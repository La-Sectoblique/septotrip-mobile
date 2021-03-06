import { getPathToStep } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import { useState } from "react";
import Toast from "react-native-toast-message"
import { LatLng, Polyline } from "react-native-maps";

interface StepPathListProps {
  steps: StepOutput[];
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setModalVisible: (arg0: boolean) => void;
}

export const StepPathList = ({steps, setActiveElement, setModalVisible}: StepPathListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [origin, setOrigin] = useState<StepOutput>({} as StepOutput);

  const handleClick = (step: StepOutput, nextStep: StepOutput) => {
    if (step === null || nextStep === null) return;
    setOrigin(step);
    getPathToStep(nextStep.id)
      .then((res: PathOutput) => {
        setActiveElement({ path: res, origin: step });
        setModalVisible(true);
      })
      .catch((err: ApiError) => {
        console.error(err)

        Toast.show({
          type: 'error',
          text1: err.name,
          text2: err.code + " " + err.message
        })
      });
  };

  if (steps.length == 0) return <></>;

  return (
    <>
      {steps.sort((a, b) => a.order - b.order).map((step: StepOutput, i: number, steps: StepOutput[]) => {
        if (i == steps.length - 1) return;
        return (
            <Polyline
              key={step.id + "_" + steps[i + 1].id}
              coordinates={[ 
                {
                  longitude: step.localisation.coordinates[0],
                  latitude: step.localisation.coordinates[1],
                } as LatLng,
                {
                  longitude: steps[i + 1].localisation.coordinates[0],
                  latitude: steps[i + 1].localisation.coordinates[1],
                } as LatLng,
              ]}
              strokeColor={"blue"}
              strokeWidth={6}
              tappable={true}
              onPress={() => {
                handleClick(step, steps[i + 1]);
              }}
            />
        );
      })}
    </>
  );
};
