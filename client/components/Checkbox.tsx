import React from "react";
import { TouchableOpacity } from "react-native";

import EnOn from "../assets/images/en_on.svg";
import EnOff from "../assets/images/en_off.svg";
// import DisOn from "../assets/images/dis_on.svg";
// import DisOff from "../assets/images/dis_off.svg";

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
