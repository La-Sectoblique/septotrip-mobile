import { isStepOutput, StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { useState } from "react";

export default function useSteps(): [StepOutput[], (steps: StepOutput[]) => void, (step: StepOutput | StepOutput[]) => void, (step: StepOutput) => void] {

  const [steps, setSteps] = useState([] as StepOutput[]);

  const initStep = (steps: StepOutput[]): void => {
    setSteps([...steps])
  };

  const addStep = (steps: StepOutput | StepOutput[]): void => {
    if(isStepOutput(steps))
      setSteps((previousState: StepOutput[]) => [...previousState, steps])
    else
      setSteps((previousState: StepOutput[]) => [...previousState, ...steps])
  };

  const removeStep = (step: StepOutput): void => {
    setSteps(steps.filter((item) => item != step));
  };

  return [steps, initStep, addStep, removeStep];
}