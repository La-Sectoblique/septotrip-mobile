/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useState  } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import RadioForm from 'react-native-simple-radio-button';
import { useTranslation } from "react-i18next";



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
    const { t, i18n } = useTranslation("locale");
    const [lang, setLang] = useState<string>("fr")
    const { trip } = route.params;
    type Items = {
        label: string,
        value: string
    }

    const items: Items[] = [
        { label: "Anglais", value: "en" },
        { label: "Français", value: "fr" },
    ];

    const update = (value: string) => {
        i18n.changeLanguage(value);
    }

    const disconnect = async () => {
        await SecureStore.deleteItemAsync('token');
        navigation.replace('Login')

    }

    const goBack = () => {
        navigation.replace('Planification', {trip: trip, isReadOnly: trip.startDate === undefined})
      }
    
    
    useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <AntDesign onPress={() => { goBack()}} name="back" size={24} color="black" />,
    });
    }, [navigation]);

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
            <RadioForm
                    radio_props={items}
                    initial={lang === "fr" ? 0 : 1}
                    formHorizontal={true}
                    buttonColor={'#365359'}
                    labelColor={'#365359'}            
                    onPress={(value: string) => {update(value)}}
                />

            <View style={{width: "100%"}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        navigation.replace("TripList")
                    }}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>{t("backToTripList")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => disconnect()}
                    style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>{t("signout")}</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};