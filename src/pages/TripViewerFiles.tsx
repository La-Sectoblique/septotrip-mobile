import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Gallery } from "./Gallery";
import { Document } from "./Document";

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    
  });

type TripViewerFilesProps = NativeStackScreenProps<RootTabParamList, 'Fichier'>

export const TripViewerFiles: React.FC<TripViewerFilesProps> = ({route}) => {
  const { trip } = route.params;
  
  const [isGallery, setIsGallery] = useState<boolean>(true);

  return (
      <View style={styles.page}>
        <View style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 5, marginTop: 15}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsGallery(true)}
            style={{ borderWidth: 1, borderRadius: 20, width: "45%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
          >
            <Text style={{fontSize: 24, color: "white", textAlign: "center"}}>Album</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsGallery(false)}
            style={{ borderWidth: 1, borderRadius: 20, width: "45%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
          >
            <Text style={{fontSize: 24, color: "white", textAlign: "center"}}>Document</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {isGallery && <Gallery trip={trip}/>}
          {(isGallery === false) && <Document trip={trip}/>}
        </View>
      </View>
  );
};
