import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface GameScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function GameScren({ route, navigation }: GameScreenProps) {
  const { name, users } = route.params;
  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>{name}</Text>
      <Text style={styles.smallText}>
        It is your turn. Ask the group the question below.
      </Text>
      <View style={styles.cardContainer}>
        <Text style={styles.bigText}>Who are you?</Text>
      </View>
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
    textAlign: "center",
  },
  cardContainer: {
    width: 250,
    height: 400,
    backgroundColor: "#892cdc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  bigText: {
    fontSize: 30,
    color: "white",
    paddingVertical: 20,
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
