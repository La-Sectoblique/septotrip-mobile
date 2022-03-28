import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step'
import { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'

interface ListMarkerProps {
    steps: StepOutput[], 
}

export const StepList = (props: ListMarkerProps) => {


    if(props.steps.length == 0)
        return <></>
    else
        return <></>
    // return (
    //     <>
    //         {
    //         props.steps.map((step: StepOutput, i: number) => 
    //         <Marker key={step.id} 
    //             coordinate={{longitude: step., latitude: step.} as LatLng} 
    //             onPress={(event) => props.handlePressEvent(marker)}
    //         />)
    //         }
    //     </>
    // )
}