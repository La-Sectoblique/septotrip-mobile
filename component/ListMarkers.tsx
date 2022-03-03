import MapView, { EventActionType, LatLng, Marker, Point, Polyline } from 'react-native-maps'
import { MarkerCustom } from '../type_tmp'

interface ListMarkerProps {
    markers: MarkerCustom[], 
    handlePressEvent: (arg0: MarkerCustom) => void,
}

export const ListMarkers = (props: ListMarkerProps) => {

    return (
        <>
            {props.markers.length == 0 ? <></>:
            props.markers.map((marker: MarkerCustom, i: number) => 
            <Marker key={i} 
                coordinate={marker.coordinate} 
                anchor={marker.position} 
                onPress={(event) => props.handlePressEvent(marker)}
            />)
            }
        </>
    )
}