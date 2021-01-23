import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { H2HLogo, CorgiLogo } from "../assets/images/";
import ScreenProps from "./ScreenProps";

const screenWidth = Dimensions.get("window").width;

export default function LoadingScreen({ navigation }: ScreenProps) {
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
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
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
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: "#892cdc",
  },
  corgiBox: {
    alignItems: "center",
    marginBottom: "15%",
  },
});
