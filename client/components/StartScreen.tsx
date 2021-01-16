import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: StartScreenProps) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Image source={require("../assets/images/h2h_logo.png")} />
        <Text>This is the start screen....</Text>
        <View style={styles.corgiBox}>
          <Image source={require("../assets/images/corgi_logo.png")} />
        </View>
      </TouchableOpacity>
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
  corgiBox: {
    alignItems: "center",
  },
});
