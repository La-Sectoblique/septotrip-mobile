import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FileMetadataOutput } from '@la-sectoblique/septoblique-service/dist/types/models/File';
import WebView from 'react-native-webview';
import { getFileLink } from '@la-sectoblique/septoblique-service';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface FileListProps {
    files: FileMetadataOutput[],
    showWebView?: boolean
}

export const FileList = ({files, showWebView}: FileListProps) => {
    const [fileURL, setFileURL] = useState<string>("");

    const downloadFile = async (fileMetaData: FileMetadataOutput) => {
        if(showWebView == false) return 
        const url = await getFileLink(fileMetaData.tripId, fileMetaData.id)
        setFileURL(url) 
    }

    if(fileURL !== "" && showWebView != false)
        return (
            <View style={{flex: 1}}>
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
        <ScrollView style={{borderWidth: 1}}>
            {
                files.map((file, i) => {
                    return (
                    
                    <TouchableOpacity
                        key={file.id}
                        activeOpacity={0.5}
                        style={{padding: 5, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start', backgroundColor: i%2 === 0 ? 'rgba(8, 182, 238, .2)': 'none'}}
                        onPress={() => downloadFile(file)}
                    >  
                        <View style={{width: 40}}>
                            { file.extension === "pdf" && <FontAwesome5 name="file-pdf" size={32} color="black" /> }
                            { (file.extension === "jpg" || file.extension === "jpeg") && <MaterialCommunityIcons name="file-jpg-box" size={32} color="black" /> }
                            { file.extension === "txt" && <AntDesign name="filetext1" size={32} color="black" /> }
                            { file.extension === "png" && <MaterialCommunityIcons name="file-png-box" size={32} color="black" />} 
                            { file.extension === "mp4" && <Entypo name="video" size={32} color="black" /> }
                        </View>
                        <Text key={file.id} style={{marginLeft: 5, fontSize: 20, textAlign:'center'}}>{ file.name }</Text>
                    </TouchableOpacity>
                    )
                    })
            }
        </ScrollView>
    )
}


