import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Styles from "../styles";
import SafeView from "../basics/SafeView";
import ScreenProps from "../ScreenProps";

export default function LoadingScreen({ navigation }: ScreenProps) {
  return (
    <SafeView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Start")}
        style={Styles.screen}
      >
        <Text style={Styles.bigText}>confessation</Text>
        <View style={styles.rowAlign}>
          <Text style={styles.italicsText}>[ˌkɑn.fɛsˈseɪ.ʃən]</Text>
          <Text style={styles.boldText}> ⋅ noun</Text>
        </View>
        <Text style={Styles.smallText}>
          a difficult but meaningful conversation.
        </Text>
        <Text style={styles.continueText}>Tap to continue.</Text>
      </TouchableOpacity>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  continueText: { ...Styles.continueText, paddingVertical: "10%" },
  boldText: { ...Styles.smallText, fontWeight: "bold" },
  italicsText: { ...Styles.smallText, fontStyle: "italic" },
  rowAlign: { flexDirection: "row", paddingVertical: "10%" },
});
