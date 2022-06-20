import { getTripSteps } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import Toast from "react-native-toast-message"
import PTRView from 'react-native-pull-to-refresh';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StepDayList } from '../component/step/StepDayList';
import { Loader } from '../component/utils/Loader';
import { RootTabParamList } from '../models/NavigationParamList';

type TripViewerDayProps = NativeStackScreenProps<RootTabParamList, 'Planning'>

export const TripViewerDay: React.FC<TripViewerDayProps> = ({route, navigation }) => {
    const { trip } = route.params

    const [steps, setSteps] = useState<StepOutput[]>([] as StepOutput[])
    const [loading, setLoading] = useState<boolean>(true)
    
    const _refresh = () => {
        getTripSteps(trip.id)
        .then((steps: StepOutput[]) => {
            setSteps(steps)
            
            setLoading(false)
        })
        .catch((err: ApiError) => {
            console.error(err)

            Toast.show({
                type: 'error',
                text1: err.name,
                text2: err.code + " " + err.message
              })
        })
    }

    const gotoMap = (point_or_step: PointOutput | StepOutput) => {
        navigation.navigate('Carte', {trip: trip, pointToFocus: point_or_step})
    }
    
    useEffect(() => {
        _refresh()
    }, [])

    if(loading)
        return <Loader />

    if(steps.length < 1)
        return <Text>{"Aucune étape n'est disponible, veuillez planifier votre voyage d'abord sur le site internet"}</Text>
        
    return (
        <PTRView onRefresh={() => _refresh()}>
          <View style={{}}>
              <Text style={{textAlign: 'center', marginBottom:10}}>Cliquez pour accédez sur la map</Text>
              {
                  steps.map((step) => {
                      return <StepDayList 
                        key={step.id} 
                        step={step} 
                        gotoMap={gotoMap} 
                        started_trip={trip.startDate !== null} 
                        />
                  })
              }
          </View>
        </PTRView>
    )
}