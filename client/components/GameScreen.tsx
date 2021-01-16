import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";

interface GameScreenProps {
  navigation: StackNavigationHelpers;
}

export default function GameScren({ navigation }: GameScreenProps) {
  return (
    <View>
      <Text>This is the game screen....</Text>
      <Button title="next" onPress={() => navigation.navigate("Game")} />
    </View>
  );
}
