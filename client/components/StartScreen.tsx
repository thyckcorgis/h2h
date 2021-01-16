import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: StartScreenProps) {
  return (
    <View style={styles.screen}>
      <Image source={require("../assets/images/h2h_logo.png")} />
      <Text>This is the start screen....</Text>
      <Button title="next" onPress={() => navigation.navigate("Register")} />
      <Image source={require("../assets/images/corgi_logo.png")} />
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
    fontFamily: "Georgia",
    fontSize: 30,
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
