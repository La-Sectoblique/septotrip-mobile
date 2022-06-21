import React, {  } from 'react'
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FileMetadataOutput } from '@la-sectoblique/septoblique-service/dist/types/models/File';
import { deleteFile, getFileLink } from '@la-sectoblique/septoblique-service';
import Toast from "react-native-toast-message"
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface FileListProps {
    files: FileMetadataOutput[],
    showWebView?: boolean
    refresh: () => void
}

export const FileList = ({files, showWebView, refresh}: FileListProps) => {

    const downloadFile = async (fileMetaData: FileMetadataOutput) => {
        if(showWebView == false) return 
        const url = await getFileLink(fileMetaData.tripId, fileMetaData.id)
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Toast.show({
                type: 'error',
                text1: "Don't know how to open this URL:",
                text2: url
              })
        }
    }

    const onPress = ((file: FileMetadataOutput) => {
        deleteFile(file.tripId, file.id)
        .then(() => {
            refresh()
        })
    })

    return (
        <ScrollView style={{borderWidth: 1, margin: 5}}>
            {
                files.map((file, i) => {
                    return (
                    
                    <TouchableOpacity
                        key={file.id}
                        activeOpacity={0.5}
                        style={{padding: 5, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', backgroundColor: i%2 === 0 ? 'rgba(8, 182, 238, .2)': 'none'}}
                        onPress={() => downloadFile(file)}
                    >  
                        <View style={{width: 40}}>
                            { file.extension === "pdf" && <FontAwesome5 name="file-pdf" size={32} color="black" /> }
                            { (file.extension === "jpg" || file.extension === "jpeg") && <MaterialCommunityIcons name="file-jpg-box" size={32} color="black" /> }
                            { file.extension === "txt" && <AntDesign name="filetext1" size={32} color="black" /> }
                            { file.extension === "png" && <MaterialCommunityIcons name="file-png-box" size={32} color="black" />} 
                            { file.extension === "mp4" && <Entypo name="video" size={32} color="black" /> }
                        </View>
                        <Text key={file.id} numberOfLines={1} style={{marginHorizontal: 5, fontSize: 20, textAlign:'center', maxWidth: "40%" }}>{file.name}</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#1B91BF",
                                marginLeft: 5,
                                padding: 5,
                                borderRadius: 10
                            }}
                            onPress={() => onPress(file)}
                        >
                            <AntDesign name="delete" size={32} color="white" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    )
                    })
            }
        </ScrollView>
    )
}


