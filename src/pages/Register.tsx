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
import { Loader } from "../component/utils/Loader";
import { useTranslation, Trans } from "react-i18next";

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

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

export const Register: React.FC<RegisterProps> = () => {
  const { t } = useTranslation("locale");

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
        .then(() => setMessage("Utilisateur créé ! Connectez-vous !")) // {t("createUser")}
        .catch((err: ApiError) => {
          console.log(JSON.stringify(err));
          if (err.code === 409)
            setError(
              "L'utilisateur saisie existe déjà"
            ); // {t("error.userexists")}
          else
            setError(
              "Une erreur est survenue...Veuillez réessayer ultérieurement" // {t("error.default")}
            );
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");

          setLoading(false);
        });
    }, 1000);
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.page}>
      <TextInput
        style={styles.input}
        onChangeText={(firstName) => setFirstName(firstName)}
        placeholder={t("firstname")}
        keyboardType="default"
        blurOnSubmit={false}
      />
      {missingFirstName ? <Error error={t("error.firstname")} /> : <></>}

      <TextInput
        style={styles.input}
        onChangeText={(lastName) => setLastName(lastName)}
        placeholder={t("name")}
        keyboardType="default"
        blurOnSubmit={false}
      />
      {missingLastName ? <Error error={t("error.name")} /> : <></>}

      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        placeholder={t("email")}
        keyboardType="email-address"
        blurOnSubmit={false}
      />
      {missingEmail ? <Error error={t("error.email")} /> : <></>}

      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder={t("password")}
        blurOnSubmit={false}
        secureTextEntry={true}
      />
      {missingPassword ? <Error error={t("error.password")} /> : <></>}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSubmitButton}
        style={{ borderWidth: 1, paddingHorizontal: 5, paddingVertical: 1 }}
      >
        <Text>{t("signup")}</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
      <Error error={error} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
