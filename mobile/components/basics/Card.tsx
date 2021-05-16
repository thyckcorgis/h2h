import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CardBack } from "../../assets/images";

import Styles from "../styles";

interface CardProps {
  isTurn: boolean;
  currentCard: string;
}

const Card: FC<CardProps> = ({ isTurn, currentCard }) => (
  <View style={styles.cardScreen}>
    <View
      style={isTurn && currentCard != "" ? styles.cardContainer : styles.transparentCardContainer}
    >
      {isTurn && currentCard != "" ? (
        <Text style={styles.bigText}>{currentCard}</Text>
      ) : (
        <CardBack width={"100%"} height={"100%"} />
      )}
    </View>
  </View>
);

export default Card;

const styles = StyleSheet.create({
  cardScreen: { width: "60%", height: "45%" },
  cardContainer: { ...Styles.center, ...Styles.full, backgroundColor: "#892cdc", borderRadius: 20 },
  transparentCardContainer: {
    ...Styles.full,
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: { ...Styles.bigText, padding: "5%", textAlign: "center" },
});
