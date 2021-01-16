import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";

interface LoadingScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: LoadingScreenProps) {
  return (
    <View>
      <Text>This is the loading screen....</Text>
      <Button title="next" onPress={() => navigation.navigate("Start")} />
    </View>
  );
}
