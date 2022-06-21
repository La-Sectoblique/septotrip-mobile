import { createLogbookEntry } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { LogbookEntryInput } from "@la-sectoblique/septoblique-service/dist/types/models/Logbook";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { UserOutput } from "@la-sectoblique/septoblique-service/dist/types/models/User";
import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message"
  
  interface ModalAddLobBookentryProps {
    setModalVisible: (arg0: boolean) => void;
    modalVisible: boolean;
    user: UserOutput,
    trip: TripOutput,
  }
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        padding: 10,
        margin: 10,
        width: (Dimensions.get("window").width * 80) / 100,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 10,
      },
  });
  
  export const ModalAddLobBookentry = (props: ModalAddLobBookentryProps) => {
    const {setModalVisible, modalVisible, user, trip} = props;

    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSendButton = () => {

        const data: LogbookEntryInput = {
            authorId: user.id,
            tripId: trip.id,
            text: message,
            title: title,

        }
        createLogbookEntry(data)
        .then(() => { 
            setMessage("");
            setModalVisible(false)
            setTitle("");
        })
        .catch((err: ApiError) => {
          setModalVisible(false)
          console.error(err)
          Toast.show({
            type: 'error',
            text1: err.name,
            text2: err.code + " " + err.message
          })
        })
    }
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Titre..."
                keyboardType="default"
                blurOnSubmit={false}
            />

            <TextInput
                style={styles.input}
                onChangeText={setMessage}
                value={message}
                placeholder="Message..."
                keyboardType="default"
                blurOnSubmit={false}
                multiline={true}
                numberOfLines={4}
            />
             
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={handleSendButton}
                  style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                  <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Envoyer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 5, paddingVertical: 1, margin: 10, backgroundColor: "#1B91BF", borderColor: "#1B91BF" }}
                >
                  <Text style={{fontSize: 24, padding: 5, color: "white", textAlign: "center"}}>Fermer</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  