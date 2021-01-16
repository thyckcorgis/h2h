import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

import socket from "../socket";
interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  console.log(socket.connected);
  const [code, setCode] = useState("");
  const { name } = route.params;

  const hostGameHandler = () => {
    console.log(socket.connected);
    socket.emit("create", name, (code: number) => {
      navigation.navigate("Waiting", { code, users: [name] });
    });
  };

  const joinGameHandler = () => {
    socket.emit("join", name, code, (data: any) => {
      navigation.navigate("Waiting", { code, users: data.users });
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>Host Confessation</Text>
      <Button title="Host" onPress={hostGameHandler} />
      <Text style={styles.bigText}>Join Confessation</Text>
      <TextInput
        placeholder="Enter a room code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType="number-pad"
        style={styles.inputField}
      />
      <Button title="Join" onPress={joinGameHandler} />
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
