import { isPointOutput, PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { useState } from "react";

export default function usePoints(): [PointOutput[], (points: PointOutput[]) => void, (point: PointOutput | PointOutput[]) => void, (point: PointOutput) => void] {

  const [points, setPoints] = useState([] as PointOutput[]);

  const initPoint = (points: PointOutput[]): void => {
    setPoints([...points])
  };

  const addPoint = (points: PointOutput | PointOutput[]): void => {
    if(isPointOutput(points))
      setPoints((previousState: PointOutput[]) => [...previousState, points])
    else
      setPoints((previousState: PointOutput[]) => [...previousState, ...points])
  };

  const removePoint = (point: PointOutput): void => {
    setPoints(points.filter((item) => item != point));
  };

  return [points, initPoint, addPoint, removePoint];
}