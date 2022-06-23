import React, {  } from 'react'
import { Text, View } from "react-native";
import { LogbookEntryOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Logbook';
import { UserOutput } from '@la-sectoblique/septoblique-service/dist/types/models/User';

interface EntryProps {
    entry: LogbookEntryOutput,
    user: UserOutput,
}

export const Entry = (props: EntryProps) => {

    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1, borderRadius: 10 ,backgroundColor: "rgba(27,145,191, 0.5)", borderColor: "rgba(27,145,191, 0.5)"}}>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>{props.entry.title}</Text>
            <Text>{props.entry.text}</Text>
            <Text style={{textAlign: 'right'}}>{props.user.firstName} {props.user.lastName}</Text>
        </View>
    )
}


