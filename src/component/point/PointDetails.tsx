import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import React from "react"
import { View, Text } from "react-native"

interface PointDetailsProps {
    point: PointOutput
}

export const PointDetails = ({point}: PointDetailsProps) => {

    if(point == null)
        return <></>
    return (
        <View>
            <Text>Nom du point: {point.title}</Text>
            <Text>Description: {point.description}</Text>
        </View>
    )
}