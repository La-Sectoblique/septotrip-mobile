import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTripFiles, uploadFile } from "@la-sectoblique/septoblique-service";
import { FileMetadataOutput, FileType } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import { Loader } from "../component/utils/Loader";
import { MobileFileFormat } from "@la-sectoblique/septoblique-service/dist/utils/FormData";
import { FileList } from "../component/trip/FileList";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    
  });

type TripViewerFilesProps = NativeStackScreenProps<RootTabParamList, 'Fichier'>

export const TripViewerFiles: React.FC<TripViewerFilesProps> = (props) => {
  const { trip } = props.route.params;
  
  const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[]);
  const [fileURL, setFileURL] = useState<string>("")


  const [loading, setLoading] = useState<boolean>(true);

  const _refresh = () => {
    getTripFiles(trip.id, {type: FileType.DOCUMENT})
    .then((res: FileMetadataOutput[]) => {
      setFiles(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    _refresh();
  }, [])

  const onPress = async () => {
    const res = await DocumentPicker.getDocumentAsync({
        multiple: false,
        type: "*/*"
    });

    console.log(res)

    if(res.type === "cancel" || !res.mimeType) return;

    uploadFile({
      name: res.name,
      extension: res.name.split(".")[res.name.split(".").length - 1],
      mimeType: res.mimeType,
      tripId: trip.id,
      stepId: 3,
      visibility: "private",
      fileType: FileType.DOCUMENT
    }, {
        name: res.name,
        type: res.mimeType,
        uri: res.uri
    } as MobileFileFormat)
    .then(() => { _refresh() })
  }


  if(loading)
    return <Loader />

  return (
      <SafeAreaView style={styles.page}>
        
        {
            <View style={{flex: 1}}>
                <Button 
                    title="Choisir un fichier"
                    onPress={onPress}
                />
                <FileList files={files} /> 
            </View>
            
        }
      </SafeAreaView>
  );
};
