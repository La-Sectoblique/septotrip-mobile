import { getTripLogbookEntries } from '@la-sectoblique/septoblique-service';
import { me } from '@la-sectoblique/septoblique-service/dist/data/user/Login';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { LogbookEntryOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Logbook';
import { UserOutput } from '@la-sectoblique/septoblique-service/dist/types/models/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context'
import { Entry } from '../component/logbookEntry/Entry';
import { Loader } from '../component/utils/Loader';
import { ModalAddLobBookentry } from '../component/utils/ModalAddLogBookEntry';
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

    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    //I have to put any sorry i don"t find the correct type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scrollview: any = useRef()

    const _refresh = () => {

        getTripLogbookEntries(trip.id)
        .then((res: LogbookEntryOutput[]) => setEntries(res))
        .catch((err: ApiError) => console.log(err))
        .finally(() => setLoading(false))

    }

    
    useEffect(() => {

        me()
        .then((res: UserOutput) => setUser(res))
        .catch((err: ApiError) => console.log(err))

        _refresh()
    }, [])


    useEffect(() => {
        _refresh()
    },[modalVisible])

    if(loading)
        return <Loader />
        
    return (
          <SafeAreaView style={styles.page}>
              <ModalAddLobBookentry modalVisible={modalVisible} setModalVisible={setModalVisible} trip={trip} user={user}/>
            <ScrollView 
                style={styles.logbook}
                ref={scrollview}
                onContentSizeChange={() => scrollview.scrollToEnd()}>
             {entries.map((entry) => <Entry key={entry.id} entry={entry} user={user}/>)}
            </ScrollView>
            <Button title='Ajouter' onPress={() => setModalVisible(true)}></Button>
          </SafeAreaView>
    )
}
