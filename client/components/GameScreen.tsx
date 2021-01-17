import React, { useEffect, useState } from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import UserButton from "../assets/images/users_button.svg";
import NextButton from "../assets/images/next_button.svg";
import QuitButton from "../assets/images/quit_button.svg";
import CardBack from "../assets/images/card_back.svg";

import socket from "../socket";
interface GameScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

const isTurn = (name: string, current: string) => name === current;

const Item = ({ title }: { title: any }) => (
  <View>
    <Text style={styles.bigText}>{title}</Text>
  </View>
);

export default function GameScreen({ route, navigation }: GameScreenProps) {
  const {
    code,
    name,
    current: _current,
    card: _card,
    users: _users,
    isHost: _isHost,
  } = route.params;
  const [card, setCard] = useState(_card);
  const [current, setCurrent] = useState(_current);
  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);
  const [message, setMessage] = useState("");

  const renderItem = ({ item }: { item: any }) => <Item title={item} />;

  const updateCurrent = (data: any) => {
    const { current, card } = data;
    setCard(card);
    setCurrent(current);
  };

  useEffect(() => {
    socket.on("next-card", updateCurrent);
    socket.on("quit-game", (data: any) => {
      const { newHost, users, playerQuit } = data;
      setUsers(users);
      setHost(newHost === "" ? isHost : name === newHost);
      updateCurrent(data);
      setMessage(`${playerQuit} has quit the game.`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  });

  const nextCardHandler = () => {
    socket.emit("next-card", code, updateCurrent);
  };

  const quitGameHandler = () => {
    socket.emit("quit-game", code, name, isHost);
    navigation.navigate("Home", { name });
  };

  const [modalVisible, setModalVisible] = useState(false);

  const nextButton = isTurn(name, current) ? (
    <TouchableOpacity onPress={nextCardHandler}>
      <NextButton />
    </TouchableOpacity>
  ) : (
    <NextButton opacity={0.5} />
  );

  return (
    <View style={styles.screen}>
      <Text style={{ ...styles.smallText, color: "red" }}>{message}</Text>
      <Text style={styles.bigText}>{name}</Text>
      <Text style={styles.smallText}>
        {isTurn(name, current)
          ? `It is your turn. Ask the group the question below.`
          : `It is ${current}'s turn.`}
      </Text>
      <View style={styles.cardContainer}>
        <Text style={styles.bigText}>{isTurn(name, current) ? card : ""}</Text>
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
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={(item) => item}
              extraData={users}
            />

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
          <UserButton />
        </TouchableOpacity>
        {nextButton}
        <TouchableOpacity onPress={quitGameHandler}>
          <QuitButton />
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
    alignContent: "center",
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
    alignItems: "center",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    paddingVertical: 20,
    padding: 10,
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  smallText: {
    fontSize: 18,
    fontFamily: "Avenir-Light",
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
