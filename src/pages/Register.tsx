import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { register } from "@la-sectoblique/septoblique-service";
import { RegisterCredentials } from "@la-sectoblique/septoblique-service/dist/types/utils/Credentials";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { Error } from "../component/utils/Error";
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

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>


export const Register: React.FC<RegisterProps> = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingFirstName, setMissingFirstName] = useState(false);
  const [missingLastName, setMissingLastName] = useState(false);

  useEffect(() => {
    setMissingEmail(false);
    setMissingFirstName(false);
    setMissingLastName(false);
    setMissingPassword(false);
    setMessage("");
    setError("");
  }, []);
  const handleSubmitButton = () => {
    setLoading(true);
    setMissingEmail(false);
    setMissingPassword(false);
    setMissingFirstName(false);
    setMissingLastName(false);

    if (password.length === 0) setMissingPassword(true);

    if (email.length === 0) setMissingEmail(true);

    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      return;
    }

    const data: RegisterCredentials = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    //Execute register function after one second to see loading page
    setTimeout(() => {
      register(data)
        .then(() =>
          setMessage("Utilisateur créer ! Connectez-vous !")
        )
        .catch((err: ApiError) => {
          console.log(JSON.stringify(err));
          if (err.code === 409) setError("L'utilisateur saisie existe déjà");
          else
            setError(
              "Une erreur est survenue...Veuillez réessayer ultérieurement"
            );
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");

          setLoading(false);
          navigation.navigate('Login')
        });
    }, 1000);
  };

  if (loading)
    return <Loader/>


  return (
    <SafeAreaView style={styles.page}>
      <TextInput
        style={styles.input}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholder="Prénom..."
        keyboardType="default"
        blurOnSubmit={false}
      />
      {missingFirstName ? (
        <Error error="Prénom invalide ou manquant..." />
      ) : (
        <></>
      )}

      <TextInput
        style={styles.input}
        onChangeText={(lastName) => setLastName(lastName)}
        placeholder="Nom..."
        keyboardType="default"
        blurOnSubmit={false}
      />
      {missingLastName ? <Error error="Nom invalide ou manquant..." /> : <></>}

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
        blurOnSubmit={false}
        secureTextEntry={true}
      />
      {missingPassword ? (
        <Error error="Mot de passe invalide ou manquant..." />
      ) : (
        <></>
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSubmitButton}
        style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 1 }}
      >
        <Text>{"S'inscrire"}</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
      <Error error={error} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};