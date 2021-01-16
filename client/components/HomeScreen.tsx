import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { useState } from "react";
import { io } from "socket.io-client";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [code, setCode] = useState("");
  const { name } = route.params;
  const socket = io("https://thyck.top/", {
    path: "/h2h",
  });

  const hostGameHandler = () => {
    console.log(socket.connected);
    socket.emit("create", name, (code: number) => {
      navigation.navigate("Waiting", { socket, code, users: [name] });
    });
  };

  const joinGameHandler = () => {
    socket.emit("join", name, code, (data: any) => {
      navigation.navigate("Waiting", { socket, code, users: data.users });
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.bigText}>Host Confessation</Text>
        <TouchableOpacity onPress={hostGameHandler}>
          <Image source={require("../assets/images/host_button.png")} />
        </TouchableOpacity>
      </View>
      <View styles={styles.container}>
        <Text style={styles.bigText}>Join Confessation</Text>
        <TextInput
          placeholder="Enter a room code"
          onChangeText={(text) => setCode(text)}
          value={code}
          keyboardType="number-pad"
          style={styles.inputField}
        />
        <TouchableOpacity onPress={joinGameHandler}>
          <Image source={require("../assets/images/join_button.png")} />
        </TouchableOpacity>
      </View>
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
  container: {
    padding: 10,
    marginVertical: 20,
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
