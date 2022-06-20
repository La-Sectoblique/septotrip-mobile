import { AntDesign } from "@expo/vector-icons";
import { deleteFile, getFileLink } from "@la-sectoblique/septoblique-service";
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { Loader } from "../utils/Loader";

interface PathDetailsProps {
  image: FileMetadataOutput;
}

export const ImageCustom = ({image}: PathDetailsProps) => {

    const [url, setUrl] = useState<string>();
    const [modalUrl, setModalUrl] = useState<string>();

    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const pressImage = (image: FileMetadataOutput) => {
        getFileLink(image.tripId, image.id)
        .then((res: string) => {
            setModalUrl(res)
            setModalVisible(true)
        })
    }

    const deleteImage = (image: FileMetadataOutput) => {
        deleteFile(image.tripId, image.id)
        .then(() => setModalVisible(false))
    }

    useEffect(() => {
        getFileLink(image.tripId, image.id)
        .then((res: string) => {
            setUrl(res)
            setLoading(false)
        })
    }, []);

    if (loading) return <Loader />;

    return (
        <>  
            <Modal
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                style={{
                    flex: 1,
                }}
            >
                <Image source={{uri: modalUrl}} style={{flex: 1}}/>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => deleteImage(image)}
                    style={{ position: 'absolute', bottom:10, right: 10, borderWidth: 1, borderRadius: 40, padding: 10, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                    <AntDesign name="delete" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setModalVisible(false)}
                    style={{ position: 'absolute', top:10, left: 10, borderWidth: 1, borderRadius: 40, padding: 10, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                    <AntDesign name="back" size={32} color="white" />
                </TouchableOpacity>
            </Modal>
            <View 
            key={image.id} 
            style={{
                width: Dimensions.get("window").width * 25 / 100, 
                height: Dimensions.get("window").width * 25 / 100,
                padding: 1
            }}
            >   
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    onPress={() => pressImage(image)}
                >
                    <Image source={{uri: url}} style={{flex: 1}}/>
                </TouchableOpacity>
            </View>
        </>
    );
};
