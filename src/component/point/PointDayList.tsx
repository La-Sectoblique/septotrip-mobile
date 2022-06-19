/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPointsByDay } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';
import React, { useEffect, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native';
import { Loader } from '../utils/Loader';

interface PointDayListProps {
    day: DayOutput
    gotoMap: (arg0: PointOutput) => void
}

export const PointDayList = ({ day, gotoMap }: PointDayListProps) => {
    const [points, setPoints] = useState<PointOutput[]>([] as PointOutput[]);

    const [loading, setLoading] = useState<boolean>(true)

    const handleClick = (point: PointOutput): void => {
       gotoMap(point)
    }

    useEffect(() => {
        getPointsByDay(day.id)
        .then((points: PointOutput[]) => {
            setPoints(points)
            setLoading(false)
        })
        .catch((err: ApiError) => {
            console.log(JSON.stringify(err))
            setLoading(false)
        })
    }, [])

    if(loading)
        return <Loader />

    if(points.length < 1)
        return <Text></Text>
        
    return (
          <View style={{}}>
              {
                  points.map((point) => {
                      return <View key={point.id} style={{marginHorizontal: 2, marginVertical: 5}}>
                        <TouchableHighlight
                            underlayColor="#ccc"
                            onPress={() =>
                                handleClick(point)
                            }
                        >
                            <>
                                <Text>{point.title} </Text>
                                { point.description && <Text style={{fontStyle: 'italic'}}>{ point.description }</Text> }
                            </>
                        </TouchableHighlight>
                          </View>
                  })
              }
          </View>
    )
}


