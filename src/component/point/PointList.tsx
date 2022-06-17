import React from "react";
import {
  Text,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";

interface PointListProps {
  gotoMap: (arg0: PointOutput | StepOutput) => void;
  points: PointOutput[];
}

export const PointList = (props: PointListProps) => {
 
  const handleClick = (point: PointOutput) => {
    props.gotoMap(point)
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
