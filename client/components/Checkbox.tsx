import React from "react";
import { TouchableOpacity } from "react-native";

import { EnOn, EnOff } from "../assets/images/";

export default function Checkbox({ disabled, value, onValueChange }) {
  const touchHandler = () => {
    if (disabled) {
      return;
    }
    onValueChange(!value);
  };

  const showSVG = () => {
    if (value) return <EnOn width={40} />;
    return <EnOff width={40} />;
  };
  return disabled ? (
    showSVG()
  ) : (
    <TouchableOpacity onPress={touchHandler}>{showSVG()}</TouchableOpacity>
  );
}
