import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import socket from "../socket";
import { StartButton, SubmitCardButton } from "../assets/images";

interface CustomCardScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function CustomCardScreen({
  navigation,
  route,
}: CustomCardScreenProps) {
  const { code, name, isHost } = route.params;
  const [question, setQuestion] = useState("");

  const submitCardHandler = () => {
    if (question === "") return;
    socket.emit("custom", code, question, (data: any) => {
      setQuestion("");
    });
  };

  const startGameHandler = () => {
    socket.emit("start-game", code, (data) => {
      navigation.navigate("Game", {
        code,
        name,
        isHost,
        ...data,
      });
    });
  };

  const start = isHost ? (
    <TouchableOpacity onPress={startGameHandler}>
      <StartButton width={250} />
    </TouchableOpacity>
  ) : null;

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <Text style={styles.bigText}>
        Add custom card(s) to be read anonymously
      </Text>
      <TextInput
        multiline={true}
        style={styles.inputField}
        placeholder="Input question"
        placeholderTextColor="grey"
        onChangeText={(text) => setQuestion(text)}
        value={question}
      />
      <TouchableOpacity
        style={{ margin: 10, marginTop: 20 }}
        onPress={submitCardHandler}
      >
        <SubmitCardButton width={250} />
      </TouchableOpacity>
      {start}
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
  bigText: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
});
