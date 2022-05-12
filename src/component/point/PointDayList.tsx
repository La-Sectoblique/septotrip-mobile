/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPointsByDay } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import usePoints from '../../hook/usePoints';

interface PointDayListProps {
    day: DayOutput
}

export const PointDayList = ({ day }: PointDayListProps) => {
    const [points, initPoint, addPoint, removePoint] = usePoints();
    
    useEffect(() => {
        getPointsByDay(day.id)
        .then((points: PointOutput[]) => {
            initPoint(points)
        })
        .catch((err: ApiError) => {
            console.log(JSON.stringify(err))
        })
        
    }, [])

    if(points.length < 1)
        return <Text>Aucun point lié à ce jour</Text>
        
    return (
          <View style={{}}>
              {
                  points.map((point) => {
                      return <Text key={point.id}>{point.title}: {point.description ? point.description : "Aucune description"}</Text>
                  })
              }
          </View>
    )
}
