import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { io } from "socket.io-client";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [code, setCode] = useState("");
  const { name } = route.params;
  const socket = io("http://thyck.top", {
    path: "/h2h",
  });

  const hostGameHandler = () => {
    socket.emit("create", name, (code: number) => {
      navigation.navigate("Waiting", { socket, code });
    });
  };

  const joinGameHandler = () => {
    socket.emit("join", name, code, (data: any) => {
      console.log(data);
      navigation.navigate("Waiting", { socket, code });
    });
  };

  return (
    <View>
      <Text>Host Confessation</Text>
      <Button title="Host" onPress={hostGameHandler} />
      <Text>Join Confessation</Text>
      <TextInput
        placeholder="Enter a room code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType="number-pad"
      />
      <Button title="Join" onPress={joinGameHandler} />
    </View>
  );
}
