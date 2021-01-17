import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: StartScreenProps) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <View style={styles.screen}>
          <Image source={require("../assets/images/h2h_logo.png")} />
          <Text style={styles.continueText}>Tap to start.</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.corgiBox}>
        <Image source={require("../assets/images/corgi_logo.png")} />
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
    fontFamily: "Futura",
    fontSize: 14,
    color: "#892cdc",
  },
  corgiBox: {
    alignItems: "center",
  },
});
