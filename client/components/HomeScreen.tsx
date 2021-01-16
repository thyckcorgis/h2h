import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";

interface HomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text>Host Confessation</Text>
      <Button title="Host" onPress={() => navigation.navigate("Waiting")} />
    </View>
  );
}
