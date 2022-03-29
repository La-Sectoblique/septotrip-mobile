import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step'
import { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'

interface StepMarkerListProps {
    steps: StepOutput[],
    handleMarkerPress: (arg0: StepOutput) => void
}

export const StepMarkerList = (props: StepMarkerListProps) => {
    

    if(props.steps.length == 0)
        return <></>
    
    return (
        <>
            {
            props.steps.map((step: StepOutput, i: number) => {
            return <Marker key={step.id} 
                coordinate={{longitude: step.localisation.coordinates[1], latitude: step.localisation.coordinates[0]} as LatLng} 
                onPress={(event) => props.handleMarkerPress(step)}
            />})
            }
        </>
    )
}