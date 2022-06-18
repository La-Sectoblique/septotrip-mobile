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
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { login } from "@la-sectoblique/septoblique-service";
import { LoginCredentials } from "@la-sectoblique/septoblique-service/dist/types/utils/Credentials";
import { Error } from "../component/utils/Error";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";
import {Loader} from '../component/utils/Loader';

import Logo from "../../assets/splash.png";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "space-around"
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

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

export const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [missingEmail, setMissingEmail] = useState<boolean>(false);
  const [missingPassword, setMissingPassword] = useState<boolean>(false);

  const handleRegisterButton = () => {
    props.navigation.navigate("Register");
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
    setTimeout(() => {
      login(data)
        .then(() => {
          setEmail("");
          setPassword("");
          setLoading(false)
          props.navigation.navigate('TripList');
          
        })
        .catch((err: ApiError) => {
          if (err.code === 404) setError("Utilisateur inexistant");
          // else if (err.code === 400) setError("Mot de passe faux");
          else setError("Une erreur s'est produite: " + JSON.stringify(err));

          setLoading(false)
        })
    }, 1000);
  };

  if (loading)
    return <Loader/>


  return (
    <SafeAreaView style={styles.page}>
      <Image source={Logo} style={{resizeMode: 'contain', aspectRatio: 4}}/>

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

        

        <Text>{message}</Text>
        <Error error={error} />
      </View>

      <View style={{flexDirection: "row", justifyContent: "center"}}>
          <Text>Si vous ne possédez pas de compte: </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleRegisterButton}
            style={{}}
          >
            <Text style={{color: "blue", textDecorationLine: "underline"}}>Inscrivez vous</Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};