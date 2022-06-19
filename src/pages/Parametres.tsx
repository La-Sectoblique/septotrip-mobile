/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Image,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { getTravelers, login } from "@la-sectoblique/septoblique-service";
import { LoginCredentials } from "@la-sectoblique/septoblique-service/dist/types/utils/Credentials";
import { Error } from "../component/utils/Error";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";
import {Loader} from '../component/utils/Loader';
import { UserOutput } from "@la-sectoblique/septoblique-service/dist/types/models/User";
import { TripNavigation } from "../navigation/TripNavigation";
import { Travelers } from "../component/trip/Travelers";
import { ScrollView } from "react-native-gesture-handler";


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "space-evenly",

  },
});

type ParametresProps = NativeStackScreenProps<RootStackParamList, 'Parametres'>

export const Parametres: React.FC<ParametresProps> = ({route, navigation}) => {
    const { trip } = route.params;

    const minHeight = useWindowDimensions().height;
    //TODO: Button navigation doesnt work
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.page}
        >
            <View>
                <Image source={require("../../assets/splash.png")} style={{resizeMode: 'contain', aspectRatio: 4}}/>
                <Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center"}}>{ trip.name }</Text>
            </View>

            <Travelers trip={trip}/>

            <View style={{width: "100%"}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('TripList')}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Retour à la liste de voyage</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};