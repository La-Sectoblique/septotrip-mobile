import { getStepDays, getTripSteps } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'


export const TripViewerDay = ({route, navigation}: any) => {
    const { trip } = route.params

    const [days, setDays] = useState<DayOutput[]>([] as DayOutput[])
    useEffect(() => {
        getTripSteps(trip.id)
        .then((steps: StepOutput[]) => {
            steps.map((step, index) => {
                getStepDays(step.id)
                .then((days: DayOutput[]) => {
                    setDays(days)
                })
                .catch((err: ApiError) => {
                    console.log("ici")
                    console.log(JSON.stringify(err))
                })
            })
        })
        .catch((err: ApiError) => {
            console.log("labas")
            console.log(JSON.stringify(err))
        })
        
    }, [])

    if(days.length < 1)
        return <Text>Aucun jour disponible</Text>
        
    return (
          <SafeAreaView style={{}}>
              {
                  days.map((day) => {
                      return <Text key={day.id}>{day.number}: {day.description}</Text>
                  })
              }
          </SafeAreaView>
    )
}