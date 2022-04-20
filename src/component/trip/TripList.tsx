import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import React from "react"
import { View, Text, FlatList, ListRenderItem } from "react-native"
import { DebugScript } from "../utils/DebugScript"
import { TripDetails } from "./TripDetails"

interface TripListProps {
    trips: TripOutput[],
    setActiveTrip: (arg0: TripOutput) => void
}

export const TripList = (props: TripListProps) => {

    const renderItem: ListRenderItem<TripOutput> = ({item}) => (
        <TripDetails key={item.id} trip={item} setActiveTrip={props.setActiveTrip} />
    )

    if(props.trips.length == 0)
        return (
            <View>
                <DebugScript />

                <Text>Aucun voyage existe pour ce compte</Text>
                <Text>Utilisez l'application Web pour créer un voyage</Text>
            </View>
        )
    return (
        <>
        <Text style={{textAlign: "center", marginVertical: 10, fontWeight: "bold"}}>Liste des voyages</Text>
        <FlatList 
            data={props.trips}
            renderItem={renderItem}
            keyExtractor={(item: TripOutput, index: number) => "" + item.id}
        />
            {/* <DebugScript /> */}

        </>
    )
}