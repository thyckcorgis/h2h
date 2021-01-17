import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Features() {
  return (
    <View>
      <Text style={styles.bigText}>Features:</Text>
      <Text style={styles.smallText}>
        Heart 2 Heart Confessations offers multiple different 
        styles of questions to encourage diverse conversation for any mood.
      </Text>
      <Text style={styles.smallText}>
        1. Happy: Positive questions to help boost your mood.
      </Text>
      <Text style={styles.smallText}>
        2. Heavy: Deeper questions to give you an outlet to vent.
      </Text>
      <Text style={styles.smallText}>
        3. Self-reflection: Talking to other people can teach you about yourself.
      </Text>
      <Text style={styles.smallText}>
        4. To the speaker: Unlike the first three styles of questions, 
        the answers to these cards are meant to be addressed to the reader.
      </Text>
      <Text style={styles.smallText}>
        5. Custom cards: Write your own cards to be shuffled into the deck anonymously. 
        This can offer a way for you to ask questions you would be too scared to say outloud.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 30,
    color: "white",
    paddingBottom: 10,
    fontFamily: "Avenir-Light",
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
