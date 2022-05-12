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
            <Text>Nom du point: {props.point.title}</Text>
            <Text>Description: {props.point.description}</Text>
        </View>
    )
}