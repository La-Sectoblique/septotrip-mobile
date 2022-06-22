import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message"

import { StatusBar } from "expo-status-bar";

import { register } from "@la-sectoblique/septoblique-service";
import { RegisterCredentials } from "@la-sectoblique/septoblique-service/dist/types/utils/Credentials";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { Error } from "../component/utils/Error";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../models/NavigationParamList";
import {Loader} from '../component/utils/Loader';
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";



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

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>


export const Register: React.FC<RegisterProps> = ({navigation}) => {
  const { t, i18n } = useTranslation("locale");
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


  const goBack = () => {
    navigation.replace('Login')
  }


  useLayoutEffect(() => {
  navigation.setOptions({
      headerRight: () => <AntDesign onPress={() => { goBack()}} name="back" size={24} color="black" />,
  });
  }, [navigation]);

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


    if (firstName.length === 0) setMissingFirstName(true);

    if (lastName.length === 0) setMissingLastName(true);

    if (password.length === 0) setMissingPassword(true);

    if (email.length === 0) setMissingEmail(true);
    

    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      return;
    }

      // eslint-disable-next-line no-control-regex
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
      if( !expression.test(String(email).toLowerCase())){
        let errorMessage:string=t("error.emailFormat");
        setError(errorMessage)
        setLoading(false)
        return
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
        .then(() => {
          setMessage(t("createUser"))
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          navigation.replace('Login')
        })
        .catch((err: ApiError) => {
          console.error(err)

          Toast.show({
            type: 'error',
            text1: err.name,
            text2: err.code + " " + err.message
          })
            setLoading(false);

        })
    }, 1000);
  };

  if (loading)
    return <Loader/>


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}
    >

      <Image source={require("../../assets/splash.png")} style={{resizeMode: 'contain', aspectRatio: 4}}/>
      <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 32}}>Inscription</Text>

      <View style={{}}>
        <View>
          <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Prénom: {missingFirstName && <Error error={t("error.firstname")} /> }</Text>
          <TextInput
            style={styles.input}
            onChangeText={(firstName) => setFirstName(firstName)}
            placeholder={t("firstname")}
            keyboardType="default"
            blurOnSubmit={false}
          />
        </View>

        <View>
          <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Nom: {missingLastName && <Error error={t("error.name")} />}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(lastName) => setLastName(lastName)}
            placeholder={t("name")}
            keyboardType="default"
            blurOnSubmit={false}
          />
          
        </View>

        <View>
          <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Email: {missingEmail && <Error error={t("error.email")} />}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            placeholder={t("email")}
            keyboardType="email-address"
            blurOnSubmit={false}
          />
          
        </View>

        <View>
          <Text style={{marginStart: 10, fontWeight: "bold", fontSize: 20}}>Mot de passe: {missingPassword && <Error error={t("error.password")} />}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            placeholder={t("password")}
            blurOnSubmit={false}
            secureTextEntry={true}
          />
        
        </View>
      </View>
      <Error error={error} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSubmitButton}
        style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10 ,width: "95%", backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
        >
        <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}} >{t("signup")}</Text>
      </TouchableOpacity>

      <Text>{message}</Text>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};