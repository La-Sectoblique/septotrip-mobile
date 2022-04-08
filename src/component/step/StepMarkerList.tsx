import { PathOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Path'
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step'
import { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'

interface StepMarkerListProps {
    steps: StepOutput[],
    setActiveElement: (arg0: StepOutput | PathOutput | PointOutput) => void
    setModalVisible: (arg0: boolean) => void
}

export const StepMarkerList = (props: StepMarkerListProps) => {
    
    const handleClick = (step: StepOutput) => {
        props.setActiveElement(step)
        props.setModalVisible(true)
    }

    if(props.steps.length == 0)
        return <></>
    
    return (
        <>
            {
            props.steps.map((step: StepOutput, i: number) => {
            return <Marker key={step.id} 
                coordinate={{longitude: step.localisation.coordinates[0], latitude: step.localisation.coordinates[1]} as LatLng} 
                onPress={(event) => handleClick(step)}
            />})
            }
        </>
    )
}