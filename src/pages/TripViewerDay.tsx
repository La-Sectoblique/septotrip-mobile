import { getStepDays, getTripSteps } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StepDayList } from '../component/step/StepDayList';


export const TripViewerDay = ({route, navigation}: any) => {
    const { trip } = route.params

    const [steps, setSteps] = useState<StepOutput[]>([] as StepOutput[])
    
    const _refresh = () => {
        getTripSteps(trip.id)
        .then((steps: StepOutput[]) => {
            setSteps(steps)
        })
        .catch((err: ApiError) => {
            console.log(JSON.stringify(err))
        })
    }


    
    useEffect(() => {
        _refresh()
    }, [])

    if(steps.length < 1)
        return <Text>Aucune étape n'est disponible, veuillez planifier votre voyage d'abord sur le site internet</Text>
        
    return (
        <PTRView onRefresh={() => _refresh()}>
          <SafeAreaView style={{}}>
              {
                  steps.map((step) => {
                      return <StepDayList key={step.id} step={step} />
                  })
              }
          </SafeAreaView>
        </PTRView>
    )
}