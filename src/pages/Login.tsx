/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  input: {
    padding: 5,
    margin: 5,
    width: (Dimensions.get("window").width * 95) / 100,
    fontSize: 25,
    borderWidth: 1,
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
        })
    }, 1000);
  };

  if (loading)
    return <Loader/>


  return (
    <SafeAreaView style={styles.page}>
      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email..."
        keyboardType="email-address"
        blurOnSubmit={false}
      />
      {missingEmail ? <Error error="Email invalide ou manquant..." /> : <></>}

      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder="Mot de passe..."
        autoCapitalize='none'
        blurOnSubmit={false}
        secureTextEntry={true}
      />
      {missingPassword ? (
        <Error error="Mot de passe manquant ou erroné..." />
      ) : (
        <></>
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSubmitButton}
        style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 1 }}
      >
        <Text>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleRegisterButton}
        style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 1 }}
      >
        <Text>Inscris toi</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
      <Error error={error} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};