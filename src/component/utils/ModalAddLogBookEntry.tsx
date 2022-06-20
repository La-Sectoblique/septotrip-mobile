  import { createLogbookEntry } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { LogbookEntryInput } from "@la-sectoblique/septoblique-service/dist/types/models/Logbook";
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip";
import { UserOutput } from "@la-sectoblique/septoblique-service/dist/types/models/User";
import React, { useState } from "react";
  import { View, Modal, StyleSheet, Pressable, Text, TextInput, Dimensions } from "react-native";
  
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
        padding: 5,
        margin: 5,
        width: (Dimensions.get("window").width * 50) / 100,
        fontSize: 25,
        borderWidth: 1,
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
            setMessage("")
            setTitle("");
        })
        .catch((err: ApiError) => console.log(err))
        .finally(() => setModalVisible(false))
    }
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
            />
             
            <View style={{flexDirection: "row"}}>
                <Pressable
                    style={[styles.button, styles.buttonOpen, {margin: 5}]}
                    onPress={handleSendButton}
                >
                    <Text style={styles.textStyle}>Envoyer</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.buttonClose, {margin: 5}]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  