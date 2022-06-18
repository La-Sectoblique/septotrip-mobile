import React, { useEffect } from 'react'
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

export const TripDetails = ({trip, navigation, started, have_started_trip}: TripDetailsProps) => {
    const handlePressEvent = (isReadOnly: boolean) => {
        if(!started && !isReadOnly){
            updateTrip(trip.id, {startDate: new Date(Date.now())})
            .then((res: TripOutput) => navigation.navigate("Planification", {
                trip: res,
                isReadOnly: false
            }))
            .catch((err: ApiError) => console.error(JSON.stringify(err)))
            // Remonter l'info du started_trip
        }
        navigation.navigate("Planification", {
            trip: trip,
            isReadOnly: isReadOnly
        })
    }

    useEffect(() => {
       //TODO: Get author 
    }, [])
    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1, borderRadius: 10, backgroundColor: "rgba(27,145,191, 0.5)", borderColor: "rgba(27,145,191, 0.5)"}}>
            
            <Text style={{textAlign: 'left', marginStart: 10, fontWeight: "600", textDecorationLine: 'underline', }}>{trip.name}</Text>
            <Text></Text>
            

            {
                started
                ?
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity 
                        onPress={() => handlePressEvent(false)} 
                        style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                    >
                        <Text style={{padding: 5, color: "white", textAlign: "center"}}>Continuer</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <TouchableOpacity 
                        onPress={() => handlePressEvent(true)} 
                        style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                        >
                        <Text style={{padding: 5, color: "white", textAlign: "center"}}>Visualiser</Text>
                    </TouchableOpacity>
                    {
                        !have_started_trip &&
                        <TouchableOpacity 
                            onPress={() => handlePressEvent(false)} 
                            style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                            >
                            <Text style={{padding: 5, color: "white", textAlign: "center"}}>Commencer</Text>
                        </TouchableOpacity>
                    }
                   
                </View>
            }
           
        </View>
    )
}


