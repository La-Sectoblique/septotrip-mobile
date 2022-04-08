import { PathOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Path'
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step'
import { LatLng, Marker} from 'react-native-maps'

interface PointMarkerListProps {
    points: PointOutput[],
    setActiveElement: (arg0: StepOutput | PathOutput | PointOutput) => void
    setModalVisible: (arg0: boolean) => void
}

export const PointMarkerList = (props: PointMarkerListProps) => {
    
    const handleClick = (point: PointOutput) => {
        props.setActiveElement(point)
        props.setModalVisible(true)
    }

    if(props.points.length == 0)
        return <></>
    
    return (
        <>
            {
            props.points.map((point: PointOutput, i: number) => {
            return <Marker key={point.id} 
                coordinate={{longitude: point.localisation.coordinates[0], latitude: point.localisation.coordinates[1]} as LatLng} 
                pinColor="purple"
                onPress={() => { handleClick(point)}}
            />})
            }
        </>
    )
}