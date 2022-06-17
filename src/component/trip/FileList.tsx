import React from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { FileMetadataOutput } from '@la-sectoblique/septoblique-service/dist/types/models/File';

interface FileListProps {
    files: FileMetadataOutput[],
    downloadFile: (arg0: FileMetadataOutput) => void
}

export const FileList = (props: FileListProps) => {
    return (
        <View>
            {
                props.files.map((file) => {
                
                    return <TouchableOpacity
                    key={file.id}
                    activeOpacity={0.5}
                    onPress={() => props.downloadFile(file)}
                  >
                    <Text key={file.id}>{ file.name }</Text>
                  </TouchableOpacity>
                    })
            }
        </View>
    )
}


