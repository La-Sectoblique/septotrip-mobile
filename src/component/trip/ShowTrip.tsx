import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet} from "react-native"
import MapView from "react-native-maps"


import { getTripSteps } from "@la-sectoblique/septoblique-service"

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError"

import useSteps from "../../hook/useSteps"
import { StepList } from "../StepList"

interface TripListProps {
    trip: TripOutput,
}

export const ShowTrip = (props: TripListProps) => {
    const [steps, initStep, addStep, removeStep] = useSteps();
    const [loading, setLoading] = useState<boolean>(false)
    const styles = StyleSheet.create({
        container: {

        },
        map: {

        },
        
    });

    useEffect(() => {
        setLoading(true)
        getTripSteps(props.trip.id)
        .then((res: StepOutput[]) => initStep(res))
        .catch((err: ApiError) => console.log(JSON.stringify(err)))
        .finally(() => setLoading(false))
    },[])

    if(loading)
        return <Text>ça charche bg tkt</Text>

    return (
        <View>
            <Text>Titre : {props.trip.name}</Text>

            
            <View style={styles.container}>
                <MapView style={styles.map} rotateEnabled={false} provider={null} showsUserLocation={true} loadingEnabled={true}>
                    <StepList steps={steps}/>                
                </MapView>
            </View>
        </View>
    )
}
