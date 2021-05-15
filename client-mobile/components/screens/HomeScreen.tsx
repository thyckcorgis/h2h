import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import socket from "../../socket";
import ScreenProps from "../ScreenProps";
import { Route } from "@react-navigation/native";
import { JoinServerResponse, Settings } from "../../../types";
import { GameParams, LobbyParams } from "../params";

import Styles from "../styles";
import { HostButton, JoinButton } from "../../assets/images";

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
      setHostErrorMessage("Server is currently down.");
      return socket.connect();
    }

    setHostErrorMessage("");
    socket.emit("create", name, (code: string) => {
      const params: LobbyParams = {
        name,
        code,
        users: [{ name, socketID: socket.id }],
        isHost: true,
        settings,
      };
      navigation.navigate("Lobby", params);
    });
  };

  const joinGameHandler = () => {
    setHostErrorMessage("");
    if (!socket.connected) {
      setJoinErrorMessage("Server is currently down.");
      return socket.connect();
    }

    if (code.length !== 5)
      return setJoinErrorMessage("Please enter a valid 5-digit code.");

    setJoinErrorMessage("");

    socket.emit("join", name, code, (res: JoinServerResponse) => {
      const {
        ok,
        users,
        message,
        settings,
        gameStarted,
        currentCard,
        currentPlayer,
      } = res;
      if (ok) {
        if (gameStarted) {
          const params: GameParams = {
            name,
            code,
            users,
            isHost: false,
            currentPlayer,
            currentCard,
          };
          navigation.navigate("Game", params);
        } else {
          const params: LobbyParams = {
            name,
            code,
            users,
            isHost: false,
            settings,
          };
          navigation.navigate("Lobby", params);
        }
      } else {
        setJoinErrorMessage(message);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={Styles.screen} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.bigText}>Host Confessation</Text>
        <TouchableOpacity onPress={hostGameHandler}>
          <HostButton />
        </TouchableOpacity>
        <Text style={Styles.errorText}>{hostErrorMessage}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.bigText}>Join Confessation</Text>
        <TextInput
          placeholder="Enter a room code"
          placeholderTextColor="grey"
          onChangeText={(text) => setCode(text)}
          value={code}
          keyboardType="number-pad"
          style={Styles.inputField}
        />
        <Text style={Styles.errorText}>{joinErrorMessage}</Text>
        <TouchableOpacity onPress={joinGameHandler}>
          <JoinButton />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    alignItems: "center",
  },
  bigText: {
    ...Styles.bigText,
    paddingBottom: "5%",
    fontFamily: "Avenir-Light",
  },
});
