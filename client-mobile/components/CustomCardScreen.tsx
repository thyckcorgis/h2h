import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import socket from "../socket";
import { StartButton, SubmitCardButton } from "../assets/images";
import ScreenProps from "./ScreenProps";
import { Route } from "@react-navigation/native";

import { CustomCardParams } from "./params";
import startGameEventCallback from "./startGame";

interface CustomCardScreenProps extends ScreenProps {
  route: Route<"Custom", CustomCardParams>;
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

  const getParams = () => ({ code, name, isHost });
  const startGameEvent = () => startGameEventCallback(navigation, getParams());

  const startGameHandler = () => {
    socket.emit("start-game", code, startGameEvent());
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
      <TouchableOpacity style={{ margin: "5%" }} onPress={submitCardHandler}>
        <SubmitCardButton width={250} />
      </TouchableOpacity>
      {start}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  inputField: {
    padding: "2%",
    paddingTop: "5%",
    width: "70%",
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
