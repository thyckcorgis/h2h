import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Mission() {
  return (
    <View>
      <Text style={styles.bigText}>Our Mission:</Text>
      <Text style={styles.smallText}>
        Heart 2 Heart Confessations was built with the intention of fostering
        meaningful connections with your peers. It allows users to deepen
        existing relationships as well as form new ones.
      </Text>
      <Text style={styles.smallText}>
        Here’s our suggestion on how to use this app:
      </Text>
      <Text style={styles.smallText}>
        1. Find people you’d like to know better; whether it be your friends,
        family, or significant other.
      </Text>
      <Text style={styles.smallText}>
        2. Arrange a group call on another device.
      </Text>
      <Text style={styles.smallText}>
        3. Host a confessation room and send the code to your peers.
      </Text>
      <Text style={styles.smallText}>
        4. The person who’s turn it is can pose the question on the screen to
        the rest of the group.
      </Text>
      <Text style={styles.smallText}>
        5. Answer honestly and let everyone have a chance to speak and listen. 
        Remember: The goal is to spark discussion.
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
