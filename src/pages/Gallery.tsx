import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { Button, Image, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../models/NavigationParamList';
import { getFileLink, getTripFiles, uploadFile } from '@la-sectoblique/septoblique-service';
import { MobileFileFormat } from '@la-sectoblique/septoblique-service/dist/utils/FormData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../component/utils/Loader';
import { FileMetadataOutput, FileType } from '@la-sectoblique/septoblique-service/dist/types/models/File';


// const styles = StyleSheet.create({
//   carousel:{
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     margin: 10,
//   },
//   carousel_item:{
//     width: 100,
//     height:100,
//     margin: 5,
//   }
// });
type GalleryProps = NativeStackScreenProps<RootTabParamList, 'Gallery'>

  
export const Gallery: React.FC<GalleryProps> = ({route}) => {
  const { trip } = route.params;

  const [images, setImages] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[]);
  const [imageURL, setImagesUrl] = useState<string[]>([] as string[]);

  const [loading, setLoading] = useState<boolean>(true)
  
  const _refresh = () => {
    getTripFiles(trip.id, {type: FileType.PHOTO})
    .then((res: FileMetadataOutput[]) => {
      setImages(res)
      res.map((image, i) => {
        getFileLink(trip.id, image.id)
        .then((url) => setImagesUrl((prev) => { prev[i] = url; return prev }))
      })
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
    <>
      <Button 
          title="Choisir un fichier"
          onPress={onPressPickAFile}
      />
      <ScrollView>
      {
        images.map((image, i) => {
          return <Image key={image.id} source={{uri: imageURL[i]}} style={{width: 100, height: 100}}/>
        })
      }
      </ScrollView>
  </>
  )
}