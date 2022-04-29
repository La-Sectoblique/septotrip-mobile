import { getStepDays, getTripSteps } from '@la-sectoblique/septoblique-service';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'


export const TripViewerDay = ({route, navigation}: any) => {
    const [days, setDays] = useState<DayOutput[]>([] as DayOutput[])
    const trip = {id: 1}
    useEffect(() => {
        getTripSteps(trip.id)
        .then((steps: StepOutput[]) => {
            steps.map((step, index) => {
                getStepDays(step.id)
                .then((days: DayOutput[]) => {
                    setDays(days)
                })
            })
        })
        
    }, [])

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