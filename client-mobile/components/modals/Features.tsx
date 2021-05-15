import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Styles from "../styles";

export default function Features() {
  return (
    <View>
      <Text style={styles.bigText}>Features:</Text>
      <ScrollView>
        <Text style={styles.smallText}>
          {`
Heart 2 Heart Confessations offers multiple different styles of questions to encourage diverse conversation for any situation.
          
1. Happy: Starts happy conversations to share users positive qualities that they may or may not already see.

2. Heavy: Deeper questions to give you an outlet to vent or share something you've been meaning to get off your chest.

3. Self-reflection: What better way to learn about yourself than by speaking it aloud to others.

4. To the speaker: Unlike the first three styles of questions, the answers to these cards are meant to be addressed to the reader.

5. Custom cards: Write your own cards to be shuffled into the deck anonymously. This can offer a way for you to ask questions you want to discuss but don't know how to bring up yourself.
          `}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    ...Styles.bigText,
    fontFamily: "Avenir-Light",
    textAlign: "center",
  },
  smallText: {
    ...Styles.smallText,
    fontFamily: "Avenir-Light",
    fontSize: 14,
    padding: "3%",
  },
});
