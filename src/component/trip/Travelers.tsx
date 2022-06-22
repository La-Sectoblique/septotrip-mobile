import React, { useEffect, useState } from 'react'
import Toast from "react-native-toast-message"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserOutput } from '@la-sectoblique/septoblique-service/dist/types/models/User';
import { addTravelerToTrip, getTravelers } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { Loader } from '../utils/Loader';
import { ApiResponse } from '@la-sectoblique/septoblique-service/dist/types/utils/Api';

import { Error } from "../utils/Error"
import { useTranslation } from "react-i18next";

interface TravelersProps {
    trip: TripOutput,
}

export const Travelers = ({trip}: TravelersProps) => {
    const { t, i18n } = useTranslation("locale");
    const [travelers, setTravelers] = useState<UserOutput[]>([] as UserOutput[]);
    const [emailNewTraveler, setEmailNewTraveler] = useState<string>();
    const [error, setError] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);

    const handleSubmitButton = () => {
        setError("");
        setResponse("");
        if(!emailNewTraveler || emailNewTraveler.length == 0){
            setError({t("error.emailFormat")})
            return
        }

        // eslint-disable-next-line no-control-regex
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        if( !expression.test(String(emailNewTraveler).toLowerCase())){
            setError({t("error.emailFormat")})
            return
        }

        
            

        addTravelerToTrip(trip.id, emailNewTraveler)
        .then((res: ApiResponse) => {
            setResponse(res.message)
            setEmailNewTraveler("")
            fetchData()
        })
        .catch((err: ApiError) => {
            console.error(err)

            Toast.show({
                type: 'error',
                text1: err.name,
                text2: err.code + " " + err.message
              })
            setEmailNewTraveler("")
        })
    }

    const fetchData = () => {
        getTravelers(trip.id)
        .then((res: UserOutput[]) => {
            setTravelers(res)
            setLoading(false)
            setEmailNewTraveler("")
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
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading)
        return <Loader/>

    return (
        <View style={{flex: 1}}>
            <View style={{height: "40%", margin: 10, flexWrap: "wrap", borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: "rgba(27,145,191, 0.5)", borderColor: "rgba(27,145,191, 0.5)" }}>
                    <Text style={{fontSize: 20, width: "100%"}}>{t("trip.travelersList")}</Text>
                    {
                        travelers.map((traveler) => <Text key={traveler.id} style={{marginStart: 10}}>{traveler.firstName} {traveler.lastName}</Text>)
                    }
            </View>

            <View style={{ alignItems: "flex-start", width: "100%", flexDirection: "row"}}>
                <TextInput
                style={{
                    padding: 10,
                    margin: 10,
                    fontSize: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                }}
                onChangeText={(email) => setEmailNewTraveler(email)}
                value={emailNewTraveler}
                placeholder={t("trip.addTravelerEmail")}
                keyboardType="email-address"
                blurOnSubmit={false}
                />
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSubmitButton}
                style={{ flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 1, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>+</Text>
                </TouchableOpacity>

            </View>

            { error !== "" && <Error error={error} />}
            { response !== "" && <Text style={{textAlign: 'center'}}>{response}</Text>}
            <StatusBar style="auto" />
        </View>
    )
}


