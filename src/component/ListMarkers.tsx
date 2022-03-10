import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'
import MapView, { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'

interface ListMarkerProps {
    markers: PointOutput[], 
    handlePressEvent: (arg0: PointOutput) => void,
}

export const ListMarkers = (props: ListMarkerProps) => {

    return (
        <>
            {props.markers.length == 0 ? <></>:
            props.markers.map((marker: PointOutput, i: number) => 
            <Marker key={i} 
                coordinate={{longitude: marker.localisation.coordinates[0], latitude: marker.localisation.coordinates[1]} as LatLng} 
                onPress={(event) => props.handlePressEvent(marker)}
            />)
            }
        </>
    )
}