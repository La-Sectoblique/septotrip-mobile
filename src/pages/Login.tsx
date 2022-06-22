/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Image,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message"

import { getUserTrips, login } from "@la-sectoblique/septoblique-service";
import { LoginCredentials } from "@la-sectoblique/septoblique-service/dist/types/utils/Credentials";
import { Error } from "../component/utils/Error";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";
import { Loader } from "../component/utils/Loader";
import { useTranslation, Trans } from "react-i18next";

import { me } from "@la-sectoblique/septoblique-service/dist/data/user/Login";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  input: {
    padding: 10,
    margin: 10,
    width: (Dimensions.get("window").width * 95) / 100,
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 10,
  },
});

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login: React.FC<LoginProps> = ({route, navigation}) => {
  const { t, i18n } = useTranslation("locale");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [missingEmail, setMissingEmail] = useState<boolean>(false);
  const [missingPassword, setMissingPassword] = useState<boolean>(false);


  const handleRegisterButton = () => {
    navigation.replace("Register");
  };

  const handleSubmitButton = () => {
    setLoading(true);
    setMissingEmail(false);
    setMissingPassword(false);

    if(password.length === 0)
      setMissingPassword(true)

    if(email.length === 0)
      setMissingEmail(true)

    if(email.length === 0 || password.length === 0){
      setLoading(false)
      return
    }

    const data: LoginCredentials = {
      email: email,
      password: password
    }


    //Execute register function after one second to see loading page
    login(data)
      .then(async (res) => {
        const user_trips = await getUserTrips()
        
        setEmail("");
        setPassword("");
        setLoading(false)
        if (user_trips.filter(trip => trip.startDate != undefined).length > 0){
          navigation.replace("Planification", {trip: user_trips[0], isReadOnly: false})
        }
          
        else
          navigation.replace('TripList');
      })
      .catch((err: ApiError) => {
        console.error(err)

        Toast.show({
          type: 'error',
          text1: err.name,
          text2: err.code + " " + err.message,
        })

        setLoading(false)
      })

  };

  if (loading) return <Loader />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >      
        <Image source={require("../../assets/splash.png")} style={{resizeMode: 'contain', aspectRatio: 4}}/>

      <View style={{alignItems: "center"}}>
        <View>
        <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Adresse Mail: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email..."
          keyboardType="email-address"
          blurOnSubmit={false}
        />
        {missingEmail && <Error error="Email invalide ou manquant..." />}
        </View>

        <View>
          <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Mot de passe: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            placeholder="Mot de passe..."
            autoCapitalize='none'
            blurOnSubmit={false}
            secureTextEntry={true}
          />
          {missingPassword && <Error error="Mot de passe manquant ou erroné..." /> }
        </View>
        
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSubmitButton}
          style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
        >
          <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Se connecter</Text>
        </TouchableOpacity>

      </View>

      <View style={{flexDirection: "row", justifyContent: "center"}}>
          <Text>Si vous ne possédez pas de compte, </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleRegisterButton}
            style={{}}
          >
            <Text style={{color: "blue", textDecorationLine: "underline"}}>Inscrivez vous</Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};
