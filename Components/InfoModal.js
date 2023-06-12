import { useState, useImperativeHandle, forwardRef } from "react";

import styled from "styled-components/native";
import { Modal, Text, StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

import CustomButton from "./CustomButton";

const InfoModal = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerModal() {
      console.log("Jerry");
      setModalVisible(true);
    },
  }));

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <Octicons name="question" size={22} color="#5e5b5b" />
            <View style={styles.textModalContainer}>
              <ModalText>{props.children}</ModalText>
            </View>
            <CustomButton style={{ marginTop: 10 }} onClick={closeModal}>
              <ModalText>Close</ModalText>
            </CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default InfoModal;

const ModalText = styled.Text`
  color: white;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    margin: 10,
    backgroundColor: "#0d0d0e",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
  textModalContainer: {
    marginBottom: 20,
    paddingTop: 20,
  },
});
