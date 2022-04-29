import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { View, Text, TouchableOpacity } from "react-native"

interface TripDetailsProps {
    trip: TripOutput,
    navigation: any
}

export const TripDetails = (props: TripDetailsProps) => {

    const handlePressEvent = () => {
        console.log(props.navigation.getState())
        props.navigation.navigate("Planification", {
            screen: "Voyage",
            params: {
                trip: props.trip
            }
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