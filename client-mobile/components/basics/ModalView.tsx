import React, { FC } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Styles from "../styles";

interface ModalViewProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalView: FC<ModalViewProps> = ({ children, visible, setVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => {
      setVisible(!visible);
    }}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <View style={{ flex: 1 }}>{children}</View>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ModalView;

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: "5%",
    height: "70%",
    width: "80%",
    opacity: 0.9,
    alignItems: "center",
  },
  closeContainer: {
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  closeText: { ...Styles.smallText, padding: "5%" },
});
