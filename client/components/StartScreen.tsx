import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import H2HLogo from "../assets/images/h2h_logo.svg";
import CorgiLogo from "../assets/images/corgi_logo.svg";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface StartScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: StartScreenProps) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <View style={styles.screen}>
          <H2HLogo width={screenWidth} />
          <Text style={styles.continueText}>Tap to start.</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.corgiBox}>
        {/* <Image source={require("../assets/images/corgi_logo.png")} /> */}
        <CorgiLogo width={screenWidth} />
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
    fontFamily: "Arial Rounded MT Bold",
    fontSize: 14,
    color: "#892cdc",
  },
  corgiBox: {
    alignItems: "center",
  },
});
