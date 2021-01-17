import React from "react";
import { TouchableOpacity } from "react-native";

import EnOn from "../assets/images/en_on.svg";
import EnOff from "../assets/images/en_off.svg";
import DisOn from "../assets/images/dis_on.svg";
import DisOff from "../assets/images/dis_off.svg";

export default function Checkbox({ disabled, value, onValueChange }) {
  const touchHandler = () => {
    if (disabled) {
      return;
    }
    onValueChange(!value);
  };

  const showSVG = () => {
    if (disabled) {
      if (value) return <DisOn width={20} />;
      return <DisOff width={20} />;
    } else {
      if (value) return <EnOn width={20} />;
      return <EnOff width={20} />;
    }
  };
  return disabled ? (
    showSVG()
  ) : (
    <TouchableOpacity onPress={touchHandler}>{showSVG()}</TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
//   checkbox: {
//     borderWidth: 1,
//     width: 10,
//     height: 10,
//     margin: 10,
//   },
//   disabled: {
//     borderColor: "grey",
//   },
//   enabled: {
//     borderColor: "white",
//   },
//   on: {
//     borderColor: "white",
//     backgroundColor: "white",
//   },
//   off: {
//     borderColor: "white",
//   },
// });
