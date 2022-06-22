import { getTripFiles } from "@la-sectoblique/septoblique-service"
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File"
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import React, { useEffect, useState } from "react"
import { View, Text, Dimensions } from "react-native"
import { FileList } from "../trip/FileList"
import { useTranslation } from "react-i18next";

interface PointDetailsProps {
    point: PointOutput
}

export const PointDetails = ({point}: PointDetailsProps) => {
    const { t, i18n } = useTranslation("locale");

    if(point == null) return <></>
    
    const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[])

    useEffect(() => {
        getTripFiles(point.tripId, {point: point.id})
        .then((res: FileMetadataOutput[]) => setFiles(res))
    }, [])

    return (
        <View style={{width: Dimensions.get('window').width * 75 / 100}}>
        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>{`${point.title}`}</Text>
        <Text style={{textAlign: "center", margin: 10}}>{point.description}</Text>
        {
            files.length > 0 
            ? <FileList files={files} showWebView={false}/>
            // eslint-disable-next-line react/no-unescaped-entities
            : <Text style={{textAlign: "center", margin: 5}}>{t("pointNoFile")}</Text>
        }
        </View>
    );
}