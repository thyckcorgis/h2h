import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Styles from "../styles";
import ScreenProps from "../ScreenProps";

export default function LoadingScreen({ navigation }: ScreenProps) {
  return (
    <View style={Styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Start")}
        style={Styles.screen}
      >
        <Text style={Styles.bigText}>confessation</Text>
        <View style={{ flexDirection: "row", paddingVertical: 30 }}>
          <Text style={{ ...Styles.smallText, fontStyle: "italic" }}>
            [ˌkɑn.fɛsˈseɪ.ʃən]
          </Text>
          <Text style={{ ...Styles.smallText, fontWeight: "bold" }}>
            {" "}
            ⋅ noun
          </Text>
        </View>
        <Text style={Styles.smallText}>
          a difficult but meaningful conversation.
        </Text>
        <Text style={styles.continueText}>Tap to continue.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  continueText: {
    fontFamily: "Avenir-Light",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: "10%",
  },
});
