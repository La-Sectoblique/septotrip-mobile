import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { FlatList, ListRenderItem, RefreshControl, TouchableOpacity} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../models/NavigationParamList';
import { getTripFiles, uploadFile } from '@la-sectoblique/septoblique-service';
import { MobileFileFormat } from '@la-sectoblique/septoblique-service/dist/utils/FormData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../component/utils/Loader';
import { FileMetadataOutput, FileType } from '@la-sectoblique/septoblique-service/dist/types/models/File';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCustom } from '../component/gallery/ImageCustom';
import { FontAwesome } from '@expo/vector-icons';

type GalleryProps = NativeStackScreenProps<RootTabParamList, 'Gallery'>

  
export const Gallery: React.FC<GalleryProps> = ({route}) => {
  const { trip } = route.params;

  const [images, setImages] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[]);
  const [loading, setLoading] = useState<boolean>(true)
  
  const renderItem: ListRenderItem<FileMetadataOutput> = ({ item }) => (
    <ImageCustom key={item.id} image={item}/>  
  )

  const _refresh = () => {
    getTripFiles(trip.id, {type: FileType.PHOTO})
    .then((res: FileMetadataOutput[]) => {
      setImages(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    _refresh()
  },[])


  const onPressPickAFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
        multiple: false,
        type: "image/*"
    });

    console.log(res)

    if(res.type === "cancel" || !res.mimeType) return;

    uploadFile({
      name: res.name,
      extension: res.name.split(".")[res.name.split(".").length - 1],
      mimeType: res.mimeType,
      tripId: trip.id,
      visibility: "private",
      fileType: FileType.PHOTO
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
    <SafeAreaView style={{flex: 1}}>
      <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item: FileMetadataOutput) => item.id.toString()}
            style={{
              borderWidth: 1, margin: 5, 
              flex: 1,
            }}
            numColumns={4}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={_refresh} />
            }
      />
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressPickAFile}
          style={{ position: 'absolute', bottom:10, right: 10, borderWidth: 1, borderRadius: 40, padding: 10, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
      >
          <FontAwesome name="photo" size={32} color="white" />
        </TouchableOpacity>
  </SafeAreaView>
  )
}