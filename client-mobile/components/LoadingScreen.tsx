import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ScreenProps from "./ScreenProps";

export default function LoadingScreen({ navigation }: ScreenProps) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Start")}
        style={styles.screen}
      >
        <Text style={styles.bigText}>confessation</Text>
        <View style={{ flexDirection: "row", paddingVertical: 30 }}>
          <Text style={{ ...styles.smallText, fontStyle: "italic" }}>
            [ˌkɑn.fɛsˈseɪ.ʃən]
          </Text>
          <Text style={{ ...styles.smallText, fontWeight: "bold" }}>
            {" "}
            ⋅ noun
          </Text>
        </View>
        <Text style={styles.smallText}>
          a difficult but meaningful conversation.
        </Text>
        <Text style={styles.continueText}>Tap to continue.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
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
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: 30,
  },
});
