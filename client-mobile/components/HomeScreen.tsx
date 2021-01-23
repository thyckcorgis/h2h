import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import socket from "../socket";

import { HostButton, JoinButton } from "../assets/images/";
import ScreenProps from "./ScreenProps";
import { Route } from "@react-navigation/native";
import { Settings } from "../../types";

interface HomeParams {
  name: string;
}

interface HomeScreenProps extends ScreenProps {
  route: Route<"Home", HomeParams>;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [code, setCode] = useState("");
  const [joinErrorMessage, setJoinErrorMessage] = useState("");
  const [hostErrorMessage, setHostErrorMessage] = useState("");
  const { name } = route.params;

  const settings: Settings = {
    happy: true,
    heavy: true,
    toTheSpeaker: true,
    selfReflection: true,
    customCards: false,
  };

  const hostGameHandler = () => {
    setJoinErrorMessage("");
    if (!socket.connected) {
      setHostErrorMessage(
        "Oh noes!! The sewvew is down :( We are so sooo sowwy. Pwetty pwease cum back watew"
      );
      return socket.connect();
    }

    setHostErrorMessage("");
    socket.emit("create", name, (code: number) => {
      navigation.navigate("Waiting", {
        name,
        code,
        users: [name],
        isHost: true,
        settings,
      });
    });
  };

  const joinGameHandler = () => {
    setHostErrorMessage("");
    if (!socket.connected) {
      setJoinErrorMessage(
        "Oh noes!! The sewvew is down :( We are so sooo sowwy. Pwetty pwease cum back later"
      );
      return socket.connect();
    }

    if (code.length !== 5)
      return setJoinErrorMessage("Please enter a valid 5-digit code.");

    setJoinErrorMessage("");

    socket.emit("join", name, code, (data: any) => {
      const { ok, users, gameStarted, message, settings } = data;
      if (ok) {
        if (gameStarted) {
          navigation.navigate("Game", {
            name,
            code,
            users,
            isHost: false,
            settings,
          });
        } else {
          navigation.navigate("Waiting", {
            name,
            code,
            users,
            isHost: false,
            settings,
          });
        }
      } else {
        setJoinErrorMessage(message);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.bigText}>Host Confessation</Text>
        <TouchableOpacity onPress={hostGameHandler}>
          <HostButton width={250} />
        </TouchableOpacity>
        <Text style={{ ...styles.smallText, color: "red" }}>
          {hostErrorMessage}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.bigText}>Join Confessation</Text>
        <TextInput
          placeholder="Enter a room code"
          placeholderTextColor="grey"
          onChangeText={(text) => setCode(text)}
          value={code}
          keyboardType="number-pad"
          style={styles.inputField}
        />
        <Text style={{ ...styles.smallText, color: "red" }}>
          {joinErrorMessage}
        </Text>
        <TouchableOpacity style={{ marginTop: "5%" }} onPress={joinGameHandler}>
          <JoinButton width={250} />
        </TouchableOpacity>
      </View>
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
  container: {
    // padding: "3%",
    marginVertical: "5%",
    alignItems: "center",
    width: "100%",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    paddingBottom: "5%",
    fontFamily: "Avenir-Light",
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
  smallText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginVertical: "3%",
  },
});
