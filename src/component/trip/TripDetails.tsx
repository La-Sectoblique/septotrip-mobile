import React from 'react'
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../../models/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface TripDetailsProps {
    trip: TripOutput,
    navigation: NativeStackNavigationProp<RootStackParamList, "TripList", undefined>
}

export const TripDetails = (props: TripDetailsProps) => {

    const handlePressEvent = () => {
        props.navigation.navigate("Planification", {
            trip: props.trip
        })
    }
    return (
        <View>
            <TouchableOpacity onPress={handlePressEvent}>
                <Text>{props.trip.name}</Text>
            </TouchableOpacity>
        </View>
    )
}
