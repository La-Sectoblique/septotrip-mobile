import { getFileLink } from "@la-sectoblique/septoblique-service";
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { Loader } from "../utils/Loader";

interface PathDetailsProps {
  image: FileMetadataOutput;
}

export const ImageCustom = ({image}: PathDetailsProps) => {

    const [url, setUrl] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getFileLink(image.tripId, image.id)
        .then((res: string) => {
            setUrl(res)
            setLoading(false)
        })
    }, []);

    if (loading) return <Loader />;

    return (
        <View 
        key={image.id} 
        style={{
            width: Dimensions.get("window").width * 25 / 100, 
            height: Dimensions.get("window").width * 25 / 100,
            padding: 1
        }}
        >
            <Image source={{uri: url}} style={{flex: 1}}/>
        </View>
    );
};
