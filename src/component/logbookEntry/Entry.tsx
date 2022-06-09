import React, { useEffect, useState } from 'react'
import { Text, View } from "react-native";
import { LogbookEntryOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Logbook';
import { Loader } from '../utils/Loader';
import { UserOutput } from '@la-sectoblique/septoblique-service/dist/types/models/User';

interface EntryProps {
    entry: LogbookEntryOutput,
    user: UserOutput,
}

export const Entry = (props: EntryProps) => {

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        //
    }, [])

    if(loading)
        return <Loader />

    return (
        <View style={{width: "95%", padding: 5, margin: 5, borderWidth: 1}}>
            <Text>{props.entry.title} - 
            {props.entry.text}</Text>
        </View>
    )
}


