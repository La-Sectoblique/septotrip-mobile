import React, { useEffect, useState, } from 'react'
import { Button, StyleSheet, View, Image, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '@la-sectoblique/septoblique-service';
import { MobileFileFormat } from '@la-sectoblique/septoblique-service/dist/utils/FormData';
import { FileMetadataAttributes } from '@la-sectoblique/septoblique-service/dist/types/models/File';


const styles = StyleSheet.create({
  carousel:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  carousel_item:{
    width: 100,
    height:100,
    margin: 5,
  }
});

type ImageCarouselProps = {
  imageList: string[];
};

const ImageCarousel = ({imageList}: ImageCarouselProps) => {
  return(<View style={styles.carousel}>
    {imageList.map((imageUrl, i)=>{return <Image key={i} source={{uri: imageUrl}} style={styles.carousel_item}/>})}</View>)

}
  
export const Gallery = () => {
    const [image, setImage] = useState<string>();

    const imageList = ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"];

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log('result : ', result);
  
      if (!result.cancelled) {        
        setImage(result.uri);
        uploadFile({extension: "png", mimeType: "image/png", id: "42", name: "couscous", tripId: 1, visibility: 'public'} as FileMetadataAttributes,{name: "test", uri: result.uri, type: "image/png"} as MobileFileFormat)
        .then((res) => console.log(res))
        .catch((err) => console.log(JSON.stringify(err)))
      }

    };
  
    return (
      <ScrollView>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <ImageCarousel imageList={imageList}/>
        
      </ScrollView>
    );
}