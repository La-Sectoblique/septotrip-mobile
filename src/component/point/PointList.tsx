import React from "react";
import {
  Text,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { useTranslation } from "react-i18next";

interface PointListProps {
  gotoMap: (arg0: PointOutput | StepOutput) => void;
  points: PointOutput[];
}

export const PointList = ({gotoMap, points}: PointListProps) => {
  const { t, i18n } = useTranslation("locale");

  const handleClick = (point: PointOutput) => {
    gotoMap(point)
  };

  if (points.length == 0)
    return (
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {t("trip.noPoints")}
      </Text>
    );

  return (
    <>
      <Text style={{ marginVertical: 5, marginHorizontal: 5, fontSize: 24, textAlign: "center", fontWeight: "bold"}}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {t("trip.pointsList")}
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
