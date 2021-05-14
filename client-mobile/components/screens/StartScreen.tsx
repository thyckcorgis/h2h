import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { H2HLogo, CorgiLogo } from "../../assets/images";
import ScreenProps from "../ScreenProps";
import Styles from "../styles";
import SafeView from "../basics/SafeView";

const screenWidth = Dimensions.get("window").width;

export default function LoadingScreen({ navigation }: ScreenProps) {
  return (
    <SafeView>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <View style={Styles.screen}>
          <H2HLogo width={screenWidth} />
          <Text style={Styles.continueText}>Tap to start.</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.corgiBox}>
        <CorgiLogo width={screenWidth} />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  corgiBox: {
    alignItems: "center",
    marginBottom: "15%",
  },
});
