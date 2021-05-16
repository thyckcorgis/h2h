import React, { FC } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Styles from "../styles";

interface ModalContentWrapperProps {
  label: string;
  text: string;
}

const ModalContentWrapper: FC<ModalContentWrapperProps> = ({ label, text }) => (
  <View style={{ flex: 1 }}>
    <Text style={styles.bigText}>{label}</Text>
    <ScrollView>
      <Text style={styles.smallText}>{text}</Text>
    </ScrollView>
  </View>
);

export default ModalContentWrapper;

const styles = StyleSheet.create({
  bigText: { ...Styles.bigText, textAlign: "center" },
  smallText: { ...Styles.smallText, fontSize: 14, padding: "3%" },
});
