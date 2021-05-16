import React, { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { Settings } from "../../../types";
import CheckBox from "../basics/Checkbox";

import Styles from "../styles";

function toggle<T>(fn: React.Dispatch<T>) {
  return (newVal: T) => fn(newVal);
}

interface SettingsModalProps {
  isHost: boolean;
  settings: Settings;
  onChangeSettings: (settings: Settings) => void;
}

interface FilterCheckBoxProps {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsModal({ isHost, settings, onChangeSettings }: SettingsModalProps) {
  const [happy, setHappy] = useState(settings.happy);
  const [heavy, setHeavy] = useState(settings.heavy);
  const [toTheSpeaker, setToTheSpeaker] = useState(settings.toTheSpeaker);
  const [selfReflection, setSelfReflection] = useState(settings.selfReflection);
  const [customCards, setCustomCards] = useState(settings.customCards);

  useEffect(
    () => onChangeSettings({ happy, heavy, toTheSpeaker, selfReflection, customCards }),
    [happy, heavy, toTheSpeaker, selfReflection, customCards]
  );

  const FilterCheckBox: FC<FilterCheckBoxProps> = ({ label, value, setValue }) => (
    <View style={styles.filterContainer}>
      <CheckBox disabled={!isHost} value={value} onValueChange={toggle(setValue)} />
      <Text style={styles.smallText}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FilterCheckBox value={happy} setValue={setHappy} label="Happy" />
      <FilterCheckBox value={selfReflection} setValue={setSelfReflection} label="Self-reflection" />
      <FilterCheckBox value={heavy} setValue={setHeavy} label="Heavy" />
      <FilterCheckBox value={toTheSpeaker} setValue={setToTheSpeaker} label="To the Speaker" />
      <FilterCheckBox value={customCards} setValue={setCustomCards} label="Custom Cards" />

      {/* Added random placeholders yeet lmao */}
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.smallText}>Random stuff</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { width: "70%", height: "90%", margin: "5%" },
  filterContainer: { flexDirection: "row", marginVertical: "3%", alignItems: "center" },
  smallText: { ...Styles.smallText, textAlignVertical: "center", flexShrink: 1 },
});
