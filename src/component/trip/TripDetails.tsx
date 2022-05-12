import React from 'react'
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../../models/NavigationParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface TripDetailsProps {
    trip: TripOutput,
    navigation: NativeStackNavigationProp<RootStackParamList, "TripList", undefined>
}

export const TripDetails = (props: TripDetailsProps) => {

    const handlePressEvent = (isReadOnly: boolean) => {
        props.navigation.navigate("Planification", {
            trip: props.trip,
            isReadOnly: isReadOnly
        })
    }
    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1}}>
            
            <Text style={{textAlign: 'center'}}>{props.trip.name}</Text>
            
            <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                <TouchableOpacity onPress={() => handlePressEvent(true)} style={{backgroundColor: 'red'}}>
                    <Text style={{margin: 5}}>Visualiser</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePressEvent(false)} style={{backgroundColor: 'green'}}>
                    <Text style={{margin: 5}}>Commencer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
