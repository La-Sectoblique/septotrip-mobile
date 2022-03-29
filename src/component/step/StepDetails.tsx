import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { View, Text, TouchableOpacity } from "react-native"

interface StepDetailsProps {
    step: StepOutput | undefined,
}

export const StepDetails = (props: StepDetailsProps) => {

    if(props.step == null)
        return <></>
    return (
        <View>
            <Text>{props.step.name}</Text>
        </View>
    )
}