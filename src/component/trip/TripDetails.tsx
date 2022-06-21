import React, { useEffect, useState } from 'react'
import Toast from "react-native-toast-message"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from '../../models/NavigationParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuthor, updateTrip } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { Author } from '@la-sectoblique/septoblique-service/dist/types/models/User';
import { Loader } from '../utils/Loader';

interface TripDetailsProps {
    trip: TripOutput,
    navigation: NativeStackNavigationProp<RootStackParamList, "TripList", undefined>,
    started?: boolean
    have_started_trip: boolean,
    is_public?: boolean
}

export const TripDetails = ({trip, navigation, started, have_started_trip, is_public}: TripDetailsProps) => {

    const [author, setAuthor] = useState<Author>({} as Author);
    const [loading, setLoading] = useState<boolean>(true)
    console.log(is_public)
    const handlePressEvent = async (isReadOnly: boolean) => {
        if(!started && !isReadOnly){
            await updateTrip(trip.id, {startDate: new Date(Date.now())})
            .then((res: TripOutput) => {    
                navigation.navigate("Planification", {
                trip: res,
                isReadOnly: false
                })
            })
            .catch((err: ApiError) => {
                console.error(err)

                Toast.show({
                    type: 'error',
                    text1: err.name,
                    text2: err.code + " " + err.message
                  })
            })
        }
        navigation.navigate("Planification", {
            trip: trip,
            isReadOnly: true
        })
    }

    useEffect(() => {
        getAuthor(trip.id)
        .then((res: Author) => {
            setLoading(false)
            setAuthor(res)
        })
        .catch((err: ApiError) => {
            console.error(err)
            Toast.show({
                type: 'error',
                text1: err.name,
                text2: err.code + " " + err.message
            })
            setLoading(false)
        })
    }, [])

    if(loading)
        return <Loader />

    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1, borderRadius: 10, backgroundColor: "rgba(27,145,191, 0.5)", borderColor: "rgba(27,145,191, 0.5)"}}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'left', marginStart: 10, fontWeight: "600", textDecorationLine: 'underline', }}>{trip.name}</Text>
                <Text style={{textAlign: 'right'}}>{author.firstName} {author.lastName}</Text>
            </View>

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
                        (!have_started_trip && is_public === false) &&
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


