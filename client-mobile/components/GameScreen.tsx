import { Route } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  UserButton,
  NextButton,
  QuitButton,
  CardBack,
} from "../assets/images/";

import socket from "../socket";
import ScreenProps from "./ScreenProps";

import { NextCardResponse } from "../../types";
import { GameParams } from "./params";

interface GameScreenProps extends ScreenProps {
  route: Route<"Game", GameParams>;
}

const isTurn = (name: string, current: string) => name === current;

const Item = ({ title }: { title: any }) => (
  <View>
    <Text style={styles.smallText}>{title}</Text>
  </View>
);

export default function GameScreen({ route, navigation }: GameScreenProps) {
  const {
    code,
    name,
    currentPlayer: _current,
    currentCard: _card,
    users: _users,
    isHost: _isHost,
  } = route.params;
  const [currentCard, setCurrentCard] = useState(_card);
  const [currentPlayer, setCurrentPlayer] = useState(_current);
  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);
  const [message, setMessage] = useState("");

  const renderItem = ({ item }: { item: any }) => <Item title={item} />;

  const updateCurrent = ({ currentPlayer, currentCard }: NextCardResponse) => {
    setCurrentCard(currentCard);
    setCurrentPlayer(currentPlayer);
  };

  useEffect(() => {
    socket.on("player-joined", (name: string) => {
      setMessage(`${name} has joined the game.`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setUsers((users) => [...users, name]);
    });

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
  }, []);

  const nextCardHandler = () => {
    socket.emit("next-card", code, updateCurrent);
  };

  const quitGameHandler = () => {
    socket.emit("quit-game", code, name, isHost);
    navigation.navigate("Home", { name });
  };

  const [usersVisible, setUsersVisible] = useState(false);

  const nextButton =
    isTurn(name, currentPlayer) && currentCard != null ? (
      <TouchableOpacity onPress={nextCardHandler}>
        <NextButton height={85} />
      </TouchableOpacity>
    ) : (
      <NextButton opacity={0.5} height={85} />
    );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Text style={{ ...styles.smallText, color: "red" }}>{message}</Text>
        <Text style={styles.codeText}>Room code: {code}</Text>
        <Text style={styles.bigText}>{name}</Text>
        <Text style={styles.smallText}>
          {currentCard != null
            ? isTurn(name, currentPlayer)
              ? "It is your turn. Ask the group the question below."
              : `It is ${currentPlayer}'s turn.`
            : "You ran out of cards. Try different categories to access new cards."}
        </Text>
        <View
          style={
            isTurn(name, currentPlayer)
              ? styles.cardContainer
              : styles.transparentCardContainer
          }
        >
          {isTurn(name, currentPlayer) ? (
            <Text style={styles.bigText}>{currentCard}</Text>
          ) : (
            <CardBack height={"100%"} width={"100%"} />
          )}
        </View>

        <Modal animationType="slide" transparent={true} visible={usersVisible}>
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
                  setUsersVisible(!usersVisible);
                }}
              >
                <View style={styles.closeContainer}>
                  <Text style={{ ...styles.smallText, padding: "5%" }}>
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => {
              setUsersVisible(true);
            }}
          >
            <UserButton height={95} />
          </TouchableOpacity>
          {nextButton}
          <TouchableOpacity onPress={quitGameHandler}>
            <QuitButton height={95} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: "5%",
    height: "40%",
    width: "80%",
    opacity: 0.9,
    alignItems: "center",
  },
  closeContainer: {
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  cardContainer: {
    width: "70%",
    height: "50%",
    backgroundColor: "#892cdc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
  },
  transparentCardContainer: {
    width: "70%",
    height: "50%",
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  codeText: {
    fontSize: 30,
    color: "#892cdc",
    paddingTop: "5%",
    fontFamily: "Avenir-Light",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    padding: "5%",
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  smallText: {
    fontSize: 18,
    fontFamily: "Avenir-Light",
    color: "white",
    textAlign: "center",
  },
});
