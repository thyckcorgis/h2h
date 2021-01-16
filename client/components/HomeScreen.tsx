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

  const hostGameHandler = () => {
    const socket = io("http://thyck.top", {
      path: "/h2h",
    });
    socket.emit("create-game", name, (code: number) => {
      navigation.navigate("Waiting", { code });
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
      <Button title="Join" onPress={() => navigation.navigate("Waiting")} />
    </View>
  );
}
