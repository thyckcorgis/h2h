import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";

interface WaitingScreenProps {
  navigation: StackNavigationHelpers;
}

export default function WaitingScreen({ navigation }: WaitingScreenProps) {
  return (
    <View>
      <Text>Room Code (roomCode)</Text>
      <Text>Who's in the room?</Text>

    </View>
  );
}
