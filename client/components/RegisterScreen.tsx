import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>Ready to Talk?</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button
        title="I'm ready"
        onPress={() => navigation.navigate("Home", { name })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  bigText: {
    fontSize: 30,
    color: "white",
  },
  inputField: {
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
  },
  smallText: {
    fontFamily: "Georgia",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  continueText: {
    fontFamily: "Comfortaa",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: 30,
  },
});
