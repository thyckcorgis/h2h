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
      <View style={disabled ? styles.disabled : styles.enabled}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: {},
  enabled: {},
  on: {},
  off: {},
});
