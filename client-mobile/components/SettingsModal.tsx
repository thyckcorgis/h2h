import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

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
      <ScrollView>
        <View style={styles.filterContainer}>
          <CheckBox
            disabled={!isHost}
            value={happy}
            onValueChange={toggle(setHappy)}
          />
          <Text style={styles.smallText}>Happy</Text>
        </View>
        <View style={styles.filterContainer}>
          <CheckBox
            disabled={!isHost}
            value={selfReflection}
            onValueChange={toggle(setSelfReflection)}
          />
          <Text style={styles.smallText}>Self-reflection</Text>
        </View>
        <View style={styles.filterContainer}>
          <CheckBox
            disabled={!isHost}
            value={heavy}
            onValueChange={toggle(setHeavy)}
          />
          <Text style={styles.smallText}>Heavy</Text>
        </View>
        <View style={styles.filterContainer}>
          <CheckBox
            disabled={!isHost}
            value={toTheSpeaker}
            onValueChange={toggle(setToTheSpeaker)}
          />
          <Text style={styles.smallText}>To the Speaker</Text>
        </View>

        <View style={styles.filterContainer}>
          <CheckBox
            disabled={!isHost}
            value={customCards}
            onValueChange={toggle(setCustomCards)}
          />
          <Text style={styles.smallText}>Custom Cards</Text>
        </View>
      </ScrollView>
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
