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
        return <Text></Text>
        
    return (
          <View style={{}}>
              {
                  points.map((point) => {
                      return <View key={point.id} style={{marginHorizontal: 2, marginVertical: 5}}>
                            <Text>{point.title} </Text>
                            { point.description ? <Text style={{fontStyle: 'italic'}}>{ point.description }</Text> : <></> }
                          </View>
                  })
              }
          </View>
    )
}
