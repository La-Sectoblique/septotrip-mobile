/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";
import { Travelers } from "../component/trip/Travelers";
import * as SecureStore from 'expo-secure-store';



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


    const disconnect = async () => {
        await SecureStore.deleteItemAsync('token');
        navigation.navigate('Login')

    }

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
                    onPress={() => {
                        navigation.navigate("TripList")
                    }}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Retour à la liste de voyage</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => disconnect()}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};