import { EventActionType, LatLng, Point } from "react-native-maps";

export interface MarkerCustom {
    name?: string;
    coordinate: LatLng; 
    position?: Point; 
  }
export interface Route extends MarkerCustom{
    coordinateEnd: LatLng
  }
export interface MapEvent extends MarkerCustom{
    action: EventActionType; 
    id?: string | undefined;
  }