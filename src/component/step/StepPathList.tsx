import { getPathToStep } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import { useState } from "react";
import { LatLng, Polyline } from "react-native-maps";

interface StepPathListProps {
  steps: StepOutput[];
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setModalVisible: (arg0: boolean) => void;
}

export const StepPathList = ({steps, setActiveElement, setModalVisible}: StepPathListProps) => {
  if (steps.length == 0) return <></>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [origin, setOrigin] = useState<StepOutput>({} as StepOutput);

  const handleClick = (step: StepOutput) => {
    if (step === null) return;
    setOrigin(step);

    getPathToStep(step.id)
      .then((res: PathOutput) => {
        setActiveElement({ path: res, origin: step });
        setModalVisible(true);
      })
      .catch((err: ApiError) => console.log(JSON.stringify(err)));
  };

  if (steps.length == 0) return <></>;

  return (
    <>
      {steps.map((step: StepOutput, i: number, steps: StepOutput[]) => {
        if (i == steps.length - 1) return;

        return (
            <Polyline
              key={step.id}
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
                handleClick(step);
              }}
            />
        );
      })}
    </>
  );
};
