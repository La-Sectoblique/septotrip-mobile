import { getTripFiles } from "@la-sectoblique/septoblique-service"
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File"
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import React, { useEffect, useState } from "react"
import { View, Text, Dimensions } from "react-native"
import { FileList } from "../trip/FileList"

interface PointDetailsProps {
    point: PointOutput
}

export const PointDetails = (props: PointDetailsProps) => {
    if(props.point == null) return <></>
    
    const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[])

    useEffect(() => {
        getTripFiles(props.point.tripId, {point: props.point.id})
        .then((res: FileMetadataOutput[]) => setFiles(res))
    }, [])

    return (
        <View style={{width: Dimensions.get('window').width * 75 / 100}}>
        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>{`${props.point.title}`}</Text>
        <Text>{props.point.description}</Text>
        {
            files.length > 0 
            ? <FileList files={files} showWebView={false}/>
            // eslint-disable-next-line react/no-unescaped-entities
            : <Text style={{textAlign: "center", margin: 5}}>Aucun fichier n'est lié à ce point</Text>
        }
        </View>
    );
}