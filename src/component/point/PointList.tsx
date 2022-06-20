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

export const PointList = ({gotoMap, points}: PointListProps) => {
 
  const handleClick = (point: PointOutput) => {
    gotoMap(point)
  };

  if (points.length == 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Ce voyage ne possède aucun points d'intérêts
      </Text>
    );

  return (
    <>
      <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 24, textAlign: "center", fontWeight: "bold"}}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Liste des points d'intérêts
      </Text>
    
      <ScrollView>
      {points.map((point: PointOutput, i) => {
        return (
            <TouchableHighlight
                underlayColor="#ccc"
                key={point.id}
                style={{ 
                  padding: 5, 
                  flexDirection: 'row', 
                  alignContent: 'center', 
                  justifyContent: 'flex-start', 
                  backgroundColor: i%2 === 0 ? 'rgba(8, 182, 238, .2)': 'none'
                }}
                onPress={ () => handleClick(point) }
            >
              <Text style={{marginLeft: 5, fontSize: 20, textAlign:'center'}}>
                  {++i}: {point.title}
              </Text>
            </TouchableHighlight>
        );
        
        })}
      </ScrollView>
    </>
  );
};
