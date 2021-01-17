import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Alert,
  Image,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const button = isTurn(name, currentPlayer) ? (
    <TouchableOpacity onPress={nextCardHandler}>
      <Image source={require("../assets/images/next_button.png")} />
    </TouchableOpacity>
  ) : null;

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.bigText}>Who's in the room?</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.smallText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image source={require("../assets/images/users_button.png")} />
        </TouchableOpacity>
        {button}
        <TouchableOpacity>
          <Image source={require("../assets/images/quit_button.png")} />
        </TouchableOpacity>
      </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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
  navBar: {
    flexDirection: "row",
    alignItems: "baseline",
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
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    // justifyContent: "center",
    height: 300,
    width: 300,
    opacity: 0.9,
  },
});
