import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Styles from "../styles";

export default function Mission() {
  return (
    <View>
      <Text style={styles.bigText}>Our Mission:</Text>
      <ScrollView>
        <Text style={styles.smallText}>
          {`Heart 2 Heart Confessations was built with the intention of fostering meaningful connections with your peers. By giving oppurtunities to share intimate conversations, it allows users to deepen existing relationships as well as form new ones.

Here’s our suggestion on how to use this app:

1. Find people you’d like to know better; whether it be your friends, family, significant other, or anyone else you know.

2. Arrange a group call on another device.

3. Host a confessation room and send the room code to your peers.

4. The person who’s turn it is poses the question on the screen to the rest of the group.

5. Answer honestly and let everyone have a chance to speak and listen.

Remember: The goal is to spark conversation.`}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: { ...Styles.bigText, fontFamily: "Avenir-Light", textAlign: "center" },
  smallText: { ...Styles.smallText, fontFamily: "Avenir-Light", fontSize: 14, padding: "3%" },
});
