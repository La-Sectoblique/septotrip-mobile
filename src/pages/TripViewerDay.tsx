import { getTripSteps } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StepDayList } from '../component/step/StepDayList';
import { RootTabParamList } from '../models/NavigationParamList';

type TripViewerDayProps = NativeStackScreenProps<RootTabParamList, 'Day'>

export const TripViewerDay: React.FC<TripViewerDayProps> = ({route, }) => {
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
        return <Text>{"Aucune étape n'est disponible, veuillez planifier votre voyage d'abord sur le site internet"}</Text>
        
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