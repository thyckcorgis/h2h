import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
} from "react-native";

import socket from "../socket";
interface GameScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

const isTurn = (name: string, current: string) => name === current;

export default function GameScren({ route, navigation }: GameScreenProps) {
  const { code, current, card, name, users } = route.params;
  const [currentCard, setCurrentCard] = useState(card);
  const [currentPlayer, setCurrentPlayer] = useState(current);

  const updateCurrent = (data: any) => {
    const { current, card } = data;
    setCurrentCard(card);
    setCurrentPlayer(current);
  };

  useEffect(() => {
    socket.on("next-card", updateCurrent);
  });

  const nextCardHandler = () => {
    socket.emit("next-card", code, updateCurrent);
  };

  const [modalVisible, setModalVisible] = useState(false);

  let button = isTurn(name, currentPlayer) ? <Button title="next" onPress={nextCardHandler} /> : '';


  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>{name}</Text>
      <Text style={styles.smallText}>
        {isTurn(name, currentPlayer)
          ? `It is your turn. Ask the group the question below.`
          : `It is ${currentPlayer}'s turn.`}
      </Text>
      <View style={styles.cardContainer}>
        <Text style={styles.bigText}>
          {isTurn(name, currentPlayer) ? currentCard : ""}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.smallText}>Participants</Text>
      </TouchableHighlight>
      <View>{button}</View>
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
    padding: 10,
    textAlign: "center",
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    color: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
