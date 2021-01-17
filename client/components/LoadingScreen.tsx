import React from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface LoadingScreenProps {
  navigation: StackNavigationHelpers;
}

export default function LoadingScreen({ navigation }: LoadingScreenProps) {
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
    // fontFamily:
    // "C:\\Users\\annet\\Downloads\\Other\\Projects\\HackED 2021\\h2h\\client\\assets\\fonts\\Comfortaa.ttf",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: 30,
  },
});
