import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import React from "react"
import { View, Text } from "react-native"
import { DebugScript } from "../utils/DebugScript"
import { TripDetails } from "./TripDetails"

interface TripListProps {
    trips: TripOutput[],
    setActiveTrip: (arg0: TripOutput) => void
}

export const TripList = (props: TripListProps) => {
    if(props.trips.length == 0)
        return (
            <View>
                <DebugScript />

                <Text>Aucun voyage existe pour ce compte</Text>
                <Text>Utilisez l'application Web pour créer un voyage</Text>
            </View>
        )
    return (
        <View>
            <DebugScript />

            <Text>Liste des voyages</Text>

            {
                props.trips.map((trip) => {
                    return <TripDetails key={trip.id} trip={trip} setActiveTrip={props.setActiveTrip} />
                })
            }
        </View>
    )
}