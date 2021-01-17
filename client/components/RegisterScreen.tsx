import React from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

import RegisterButton from "../assets/images/register_button.svg";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerHandler = () => {
    if (name === "") {
      setErrorMessage("Please enter a name.");
      return;
    }
    navigation.navigate("Home", { name });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <Text style={styles.bigText}>Ready to Talk?</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Your name"
        placeholderTextColor="white"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Text style={{ ...styles.smallText, color: "red", padding: 10 }}>
        {errorMessage}
      </Text>
      <TouchableOpacity onPress={registerHandler}>
        <RegisterButton />
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
  },
  inputField: {
    padding: 5,
    marginTop: 10,
    // marginBottom: 20,
    width: 250,
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir-Light",
  },
  smallText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    padding: 5,
    marginBottom: 30,
  },
});
