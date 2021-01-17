import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export default function Checkbox({ disabled, value, onValueChange }) {
  const touchHandler = () => {
    if (disabled) {
      return;
    }
    onValueChange(!value);
  };
  return (
    <TouchableOpacity onPress={touchHandler}>
      <View
        style={
          disabled
            ? { ...styles.checkbox, ...styles.disabled }
            : { ...styles.checkbox, ...styles.enabled }
        }
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    width: 10,
    height: 10,
    margin: 10,
  },
  disabled: {
    borderColor: "grey",
  },
  enabled: {
    borderColor: "white",
  },
  on: {
    borderColor: "white",
    backgroundColor: "white",
  },
  off: {
    borderColor: "white",
  },
});
