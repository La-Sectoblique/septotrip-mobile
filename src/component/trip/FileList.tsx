import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FileMetadataOutput } from '@la-sectoblique/septoblique-service/dist/types/models/File';
import WebView from 'react-native-webview';
import { deleteFile, getFileLink } from '@la-sectoblique/septoblique-service';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface FileListProps {
    files: FileMetadataOutput[],
    showWebView?: boolean
    refresh: () => void
}

export const FileList = ({files, showWebView, refresh}: FileListProps) => {
    const [fileURL, setFileURL] = useState<string>("");

    const downloadFile = async (fileMetaData: FileMetadataOutput) => {
        if(showWebView == false) return 
        const url = await getFileLink(fileMetaData.tripId, fileMetaData.id)
        setFileURL(url) 
    }

    const onPress = ((file: FileMetadataOutput) => {
        deleteFile(file.tripId, file.id)
        .then(() => {
            refresh()
        })
    })

    if(fileURL !== "" && showWebView != false)
        return (
            <View style={{flex: 1, margin: 5}}>
                <WebView
                    source={{ uri: fileURL}}
                    style={{ flex: 1 }}
                    allowFileAccess={true}
                    allowUniversalAccessFromFileURLs={true}
                    originWhitelist={["*"]}
                />
                <Button 
                title="Fermer"
                onPress={() => setFileURL("")}
                />
            </View>
        )

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


