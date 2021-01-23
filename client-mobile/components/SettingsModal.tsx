import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Settings } from "../../types";
import CheckBox from "./Checkbox";

function toggle<T>(fn: React.Dispatch<T>) {
  return (newVal: T) => fn(newVal);
}

interface SettingsModalProps {
  isHost: boolean;
  settings: Settings;
  onChangeSettings: (settings: Settings) => void;
}

export default function SettingsModal({
  isHost,
  settings,
  onChangeSettings,
}: SettingsModalProps) {
  const [happy, setHappy] = useState(settings.happy);
  const [heavy, setHeavy] = useState(settings.heavy);
  const [toTheSpeaker, setToTheSpeaker] = useState(settings.toTheSpeaker);
  const [selfReflection, setSelfReflection] = useState(settings.selfReflection);
  const [customCards, setCustomCards] = useState(settings.customCards);

  useEffect(() => {
    onChangeSettings({
      happy,
      heavy,
      toTheSpeaker,
      selfReflection,
      customCards,
    });
  }, [happy, heavy, toTheSpeaker, selfReflection, customCards]);

  return (
    <>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Happy</Text>
        <CheckBox
          disabled={!isHost}
          value={happy}
          onValueChange={toggle(setHappy)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Self-reflection</Text>
        <CheckBox
          disabled={!isHost}
          value={selfReflection}
          onValueChange={toggle(setSelfReflection)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Heavy</Text>
        <CheckBox
          disabled={!isHost}
          value={heavy}
          onValueChange={toggle(setHeavy)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>To the Speaker</Text>
        <CheckBox
          disabled={!isHost}
          value={toTheSpeaker}
          onValueChange={toggle(setToTheSpeaker)}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Custom Cards</Text>
        <CheckBox
          disabled={!isHost}
          value={customCards}
          onValueChange={toggle(setCustomCards)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
});
