import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import React from "react"
import { View, Text, Dimensions } from "react-native"
import MapView, { LatLng, Marker } from "react-native-maps"

interface PointDetailsProps {
    point: PointOutput
}

export const PointDetails = (props: PointDetailsProps) => {

    if(props.point == null)
        return <></>
    return (
        <View>
            <MapView
                rotateEnabled={false} 
                provider={null} 
                showsUserLocation={true}
                style={{width: Dimensions.get('window').width * 50/100, height: Dimensions.get('window').width * 50/100}}  
                loadingEnabled={true} 
                initialRegion={{latitude: props.point.localisation.coordinates[1], longitude: props.point.localisation.coordinates[0], latitudeDelta: 50, longitudeDelta: 50}}
            >
                <Marker key={props.point.id} 
                coordinate={{longitude: props.point.localisation.coordinates[0], latitude: props.point.localisation.coordinates[1]} as LatLng}
                pinColor="purple" 
                />        
            </MapView>
            <Text>Nom du point: {props.point.title}</Text>
            <Text>Description: {props.point.description}</Text>
        </View>
    )
}