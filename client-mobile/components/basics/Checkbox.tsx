import React from "react";
import { TouchableOpacity } from "react-native";

import { EnOn, EnOff } from "../../assets/images";

interface CheckboxProps {
  disabled: boolean;
  value: boolean;
  onValueChange: React.Dispatch<boolean>;
}

export default function Checkbox({
  disabled,
  value,
  onValueChange,
}: CheckboxProps) {
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
