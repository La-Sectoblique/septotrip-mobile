import {
  PathOutput,
} from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import {
  isPointOutput,
  PointOutput,
} from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import {
  isStepOutput,
  StepOutput,
} from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { PathDetails } from "../path/PathDetails";
import { PointDetails } from "../point/PointDetails";
import { StepDetails } from "../step/StepDetails";

interface StepDetailsProps {
  activeElement:
    | StepOutput
    | { path: PathOutput; origin: StepOutput }
    | PointOutput
    | undefined;
  setModalVisible: (arg0: boolean) => void;
  modalVisible: boolean;
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export const ModalDetails = ({activeElement, setModalVisible, modalVisible}: StepDetailsProps) => {
  if (activeElement == null) return <></>;
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
          {isStepOutput(activeElement) ? (
            <StepDetails step={activeElement} />
          ) : isPointOutput(activeElement) ? (
            <PointDetails point={activeElement} />
          ) : (
            <PathDetails
              path={activeElement.path}
              origin={activeElement.origin}
            />
          )}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Fermer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
