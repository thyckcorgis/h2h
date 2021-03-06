import React, { FC } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Styles from "../styles";

interface ModalViewProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  component: FC;
}

const ModalView: FC<ModalViewProps> = ({ component: Component, visible, setVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setVisible(false)}
  >
    {/* <TouchableWithoutFeedback onPress={() => setVisible(false)}> */}
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Component />
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    {/* </TouchableWithoutFeedback> */}
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
