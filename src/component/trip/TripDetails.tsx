import React from 'react'
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../../models/NavigationParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateTrip } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';

interface TripDetailsProps {
    trip: TripOutput,
    navigation: NativeStackNavigationProp<RootStackParamList, "TripList", undefined>,
    started?: boolean
    have_started_trip: boolean
}

export const TripDetails = (props: TripDetailsProps) => {
    const handlePressEvent = (isReadOnly: boolean) => {
        if(!props.started && !isReadOnly){
            updateTrip(props.trip.id, {startDate: new Date(Date.now())})
            .then((res: TripOutput) => props.navigation.navigate("Planification", {
                trip: res,
                isReadOnly: false
            }))
            .catch((err: ApiError) => console.error(JSON.stringify(err)))
        }
        props.navigation.navigate("Planification", {
            trip: props.trip,
            isReadOnly: isReadOnly
        })
    }
    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1}}>
            
            <Text style={{textAlign: 'center'}}>{props.trip.name}</Text>
            

            {
                props.started
                ?
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity onPress={() => handlePressEvent(false)} style={{backgroundColor: 'green'}}>
                        <Text style={{margin: 5}}>Continuer</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity onPress={() => handlePressEvent(true)} style={{backgroundColor: 'red'}}>
                        <Text style={{margin: 5}}>Visualiser</Text>
                    </TouchableOpacity>
                    {
                        !props.have_started_trip
                        ?
                        <TouchableOpacity onPress={() => handlePressEvent(false)} style={{backgroundColor: 'green'}}>
                            <Text style={{margin: 5}}>Commencer</Text>
                        </TouchableOpacity>
                        :
                        <></>
                    }
                   
                </View>
            }
           
        </View>
    )
}


