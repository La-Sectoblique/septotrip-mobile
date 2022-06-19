import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTripFiles, uploadFile } from "@la-sectoblique/septoblique-service";
import { FileMetadataOutput, FileType } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import { Loader } from "../component/utils/Loader";
import { MobileFileFormat } from "@la-sectoblique/septoblique-service/dist/utils/FormData";
import { FileList } from "../component/trip/FileList";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    
  });

type TripViewerFilesProps = NativeStackScreenProps<RootTabParamList, 'Fichier'>

export const TripViewerFiles: React.FC<TripViewerFilesProps> = ({route}) => {
  const { trip } = route.params;
  
  const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[]);

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
                <FileList files={files} />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onPress}
                  style={{ 
                    position: 'absolute', 
                    bottom: 10, 
                    right: 10,
                    borderWidth: 1, 
                    borderRadius: 40, 
                    padding: 10, 
                    margin: 10, 
                    backgroundColor: "#1B91BF", 
                    borderColor: "#1B91BF" }}
                >
                  <Feather name="file-plus" size={32} color="white" />
                </TouchableOpacity>
            </View>
            
        }
      </SafeAreaView>
  );
};
