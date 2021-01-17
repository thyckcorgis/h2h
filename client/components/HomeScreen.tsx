import React from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import socket from "../socket";

import HostButton from "../assets/images/host_button.svg";
import JoinButton from "../assets/images/join_button.svg";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name } = route.params;

  const hostGameHandler = () => {
    socket.emit("create", name, (code: number) => {
      navigation.navigate("Waiting", {
        name,
        code,
        users: [name],
        isHost: true,
        happy: true,
        heavy: true,
        toTheSpeaker: true,
        selfReflection: true,
      });
    });
  };

  const joinGameHandler = () => {
    if (code.length !== 5) {
      setErrorMessage("Please enter a valid room code (5 digits)");
      return;
    }

    socket.emit("join", name, code, (data: any) => {
      const { ok, users, gameStarted, message, settings } = data;
      if (ok) {
        if (gameStarted) {
          navigation.navigate("Game", {
            name,
            code,
            users,
            isHost: false,
            ...settings,
          });
        } else {
          navigation.navigate("Waiting", {
            name,
            code,
            users,
            isHost: false,
            ...settings,
          });
        }
      } else {
        setErrorMessage(message);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      {/* <View style={{ flex: 1 }} /> */}
      <View style={styles.container}>
        <Text style={styles.bigText}>Host Confessation</Text>
        <TouchableOpacity onPress={hostGameHandler}>
          <HostButton width={250} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.bigText}>Join Confessation</Text>
        <TextInput
          placeholder="Enter a room code"
          placeholderTextColor="white"
          onChangeText={(text) => setCode(text)}
          value={code}
          keyboardType="number-pad"
          style={styles.inputField}
        />
        <Text style={{ ...styles.smallText, color: "red" }}>
          {errorMessage}
        </Text>
        <TouchableOpacity onPress={joinGameHandler}>
          <JoinButton width={250} />
        </TouchableOpacity>
      </View>
      {/* <View style={{ flex: 2 }} /> */}
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
  container: {
    padding: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    paddingBottom: 10,
    fontFamily: "Avenir-Light",
  },
  inputField: {
    padding: 5,
    margin: 10,
    marginBottom: 20,
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
    fontSize: 18,
    color: "white",
    textAlign: "center",
    padding: 5,
  },
  continueText: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: 30,
  },
});
