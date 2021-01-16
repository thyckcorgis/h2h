import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface GameScreenProps {
  navigation: StackNavigationHelpers;
}

export default function GameScren({ navigation }: GameScreenProps) {
  return (
    <View style={styles.screen}>
      <Text>This is the game screen....</Text>
      <Button title="next" onPress={() => navigation.navigate("Game")} />
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
    fontSize: 30,
    color: "white",
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    width: 250,
    height: 500,
  },
  list: {
    color: "white",
  },
  inputField: {
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
  },
  smallText: {
    fontFamily: "Georgia",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
