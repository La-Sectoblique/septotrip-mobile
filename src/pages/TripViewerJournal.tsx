import { Feather } from '@expo/vector-icons';
import { createLogbookEntry, getTripLogbookEntries } from '@la-sectoblique/septoblique-service';
import { me } from '@la-sectoblique/septoblique-service/dist/data/user/Login';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { LogbookEntryAttributes, LogbookEntryOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Logbook';
import { UserOutput } from '@la-sectoblique/septoblique-service/dist/types/models/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context'
import { Entry } from '../component/logbookEntry/Entry';
import { Loader } from '../component/utils/Loader';
import { RootTabParamList } from '../models/NavigationParamList';

type TripViewerJournalProps = NativeStackScreenProps<RootTabParamList, 'Journal'>

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },

    logbook: {
        flex: 1,
        margin: 5,
        height: Dimensions.get("window").height,
        borderWidth: 1,
    },

    input: {
        padding: 5,
        margin: 5,
        fontSize: 25,
        borderWidth: 1,
        flex: 1
    },
})


export const TripViewerJournal: React.FC<TripViewerJournalProps> = ({ route }) => {
    const { trip } = route.params

    const [user, setUser] = useState<UserOutput>({} as UserOutput);
    const [entries, setEntries] = useState<LogbookEntryOutput[]>([] as LogbookEntryOutput[])
    const [message, setMessage] = useState<string>();

    const [loading, setLoading] = useState<boolean>(true);

    
    const _refresh = () => {

        getTripLogbookEntries(trip.id)
        .then((res: LogbookEntryOutput[]) => setEntries(res))
        .catch((err: ApiError) => console.log(err))
        .finally(() => setLoading(false))

    }

    const handleSendButton = () => {

        const data: LogbookEntryAttributes = {
            authorId: user.id,
            tripId: trip.id,
            text: message,
            title: "Casse pas les couilles"

        }
        createLogbookEntry(data)
        .then(() => { 
            setMessage("")
            _refresh();
        })
        .catch((err: ApiError) => console.log(err))
    }

  
    
    useEffect(() => {

        me()
        .then((res: UserOutput) => setUser(res))
        .catch((err: ApiError) => console.log(err))

        _refresh()
    }, [])

    if(loading)
        return <Loader />
        
    return (
          <SafeAreaView style={styles.page}>
            <ScrollView style={styles.logbook}>
             {entries.map((entry) => <Entry key={entry.id} entry={entry} user={user}/>)}
            </ScrollView>
            <View style={{ flexDirection: 'row'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setMessage}
                    value={message}
                    placeholder="Message..."
                    keyboardType="default"
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { handleSendButton()}}
                    style={{ }}
                >
                    <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
          </SafeAreaView>
    )
}
