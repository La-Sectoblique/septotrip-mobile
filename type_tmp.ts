import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { EventActionType, LatLng } from "react-native-maps";
export interface Route extends PointOutput{
    coordinateEnd: LatLng
  }
export interface MapEvent extends PointOutput{
    action: EventActionType; 
  }