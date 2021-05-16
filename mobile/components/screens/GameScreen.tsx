import { Route } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";

import { UserButton, NextButton, QuitButton, CardBack } from "../../assets/images";

import socket from "../../socket";
import ScreenProps from "../ScreenProps";

import { User, NextCardResponse, QuitGameResponse } from "../../../types";
import { GameParams } from "../params";

import Card from "../basics/Card";

import Styles from "../styles";

interface GameScreenProps extends ScreenProps {
  route: Route<"Game", GameParams>;
}

const isTurn = (name: string, current: string) => name === current;

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
  const [ripe, setRipe] = useState(true);

  const updateCurrent = ({ currentPlayer, currentCard }: NextCardResponse) => {
    setCurrentCard(currentCard);
    setCurrentPlayer(currentPlayer);
  };

  const Item = ({ user }: { user: User }) => (
    <View>
      <Text
        style={{
          ...Styles.smallText,
          color: currentPlayer.name === user.name ? "#892cdc" : "white",
          fontSize: 20,
          paddingVertical: "1%",
        }}
      >
        {user.name}
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<User> = ({ item }) => <Item user={item} />;

  useEffect(() => {
    socket.on("player-joined", (user: User) => {
      setMessage(`${user.name} has joined the game.`);
      setRipe(false);
      setTimeout(() => setMessage(""), 3000);
      setUsers((users) => [...users, user]);
    });

    socket.on("next-card", updateCurrent);
    socket.on("quit-game", (res: QuitGameResponse) => {
      const { playerQuit, newHost, currentCard, currentPlayer } = res;
      const userQuit = users.find((user) => user.socketID === playerQuit);
      setUsers((currentUsers) => currentUsers.filter((user) => user.socketID !== playerQuit));
      setHost(newHost ? name === newHost.name : isHost);
      updateCurrent({ currentCard, currentPlayer });
      setMessage(`${userQuit.name} has quit the game.`);
      setRipe(true);
      setTimeout(() => setMessage(""), 3000);
    });

    return () => {
      socket.off("player-joined");
      socket.off("next-card");
      socket.off("quit-game");
    };
  }, []);

  const nextCardHandler = () => socket.emit("next-card", code, updateCurrent);

  const quitGameHandler = () => {
    socket.emit("quit-game", code, isHost);
    navigation.navigate("Home", { name });
  };

  const [usersVisible, setUsersVisible] = useState(false);

  const TurnButton = () =>
    isTurn(name, currentPlayer.name) && currentCard != "" ? (
      <TouchableOpacity onPress={nextCardHandler}>
        <NextButton height={85} />
      </TouchableOpacity>
    ) : (
      <NextButton opacity={0.5} height={85} />
    );

  const CurrentTurnMessage = () => (
    <View style={{ width: "100%", height: "10%", marginVertical: "1%" }}>
      <Text style={Styles.smallText}>
        {currentCard != ""
          ? isTurn(name, currentPlayer.name)
            ? "It is your turn. Ask the group the question below."
            : `It is ${currentPlayer.name}'s turn.`
          : "You ran out of cards. Try different categories to access new cards."}
      </Text>
    </View>
  );

  const PlayerList = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={usersVisible}
      onRequestClose={() => setUsersVisible(!usersVisible)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={{ ...styles.bigText, fontSize: 24 }}>Who's in the room?</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              extraData={users}
            />
          </View>
          <TouchableOpacity onPress={() => setUsersVisible(!usersVisible)}>
            <View style={styles.closeContainer}>
              <Text style={{ ...Styles.smallText, padding: "5%" }}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const NavBar = () => (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => setUsersVisible(true)}>
        <UserButton height={95} />
      </TouchableOpacity>
      <TurnButton />
      <TouchableOpacity onPress={quitGameHandler}>
        <QuitButton height={95} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Text style={{ ...Styles.smallText, color: ripe ? "red" : "green" }}>{message}</Text>
        <Text style={styles.codeText}>Room code: {code}</Text>
        <Text style={styles.bigText}>{name}</Text>
        <CurrentTurnMessage />
        <Card isTurn={isTurn(name, currentPlayer.name)} currentCard={currentCard} />
        <PlayerList />
        <NavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...Styles.center,
    ...Styles.full,
    padding: "5%",
    backgroundColor: "black",
    textAlign: "center",
  },
  modalContainer: { ...Styles.center, width: "100%" },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: "5%",
    height: "50%",
    width: "80%",
    opacity: 0.9,
    alignItems: "center",
  },
  closeContainer: { marginTop: "5%", borderWidth: 1, borderColor: "white", borderRadius: 20 },
  listContainer: { flex: 1, width: "80%", marginVertical: "1%" },
  navBar: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
  },
  codeText: { ...Styles.continueText, fontSize: 30, paddingTop: "5%" },
  bigText: { ...Styles.bigText, padding: "5%", textAlign: "center" },
});
