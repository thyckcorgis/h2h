import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: StartScreenProps) {
  return (
    <View>
      <Text>This is the start screen....</Text>
      <Button title="next" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}
