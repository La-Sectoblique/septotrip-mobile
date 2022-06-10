import React from "react";
import {
  Text,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { Region } from "react-native-maps";

interface PointListProps {
  setModalVisible: (arg0: boolean) => void;
  setActiveElement: (
    arg0: StepOutput | { path: PathOutput; origin: StepOutput } | PointOutput
  ) => void;
  setRegion: (arg0: Region) => void;
  points: PointOutput[];
}

export const PointList = (props: PointListProps) => {
 
  const handleClick = (point: PointOutput) => {
    props.setActiveElement(point);
    props.setModalVisible(true);
    props.setRegion({
      latitude: point.localisation.coordinates[1],
      longitude: point.localisation.coordinates[0],
      latitudeDelta: 1,
      longitudeDelta: 1
    })
  };

  if (props.points.length == 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Ce voyage ne possède aucun points d'intérêts
      </Text>
    );

  return (
    <>
      <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 18 }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Liste des points d'intérêts:{" "}
      </Text>
    
      <ScrollView>
      {props.points.map((point: PointOutput, index) => {
        return (
            <TouchableHighlight
                underlayColor="#ccc"
                key={point.id}
                onPress={() =>
                handleClick(point)
                }
            >
              <Text style={{ marginHorizontal: 10 }}>
                  {++index}: {point.title}
              </Text>
            </TouchableHighlight>
        );
        
        })}
      </ScrollView>
    </>
  );
};
