import React, { useEffect, useState } from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
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
interface GameScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
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
    socket.on("player-joined", (name) => {
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
    isTurn(name, current) && card != null ? (
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
          {card != null
            ? isTurn(name, current)
              ? "It is your turn. Ask the group the question below."
              : `It is ${current}'s turn.`
            : "You ran out of cards. Try different categories to access new cards."}
        </Text>
        <View style={styles.cardContainer}>
          {isTurn(name, current) ? (
            <Text style={styles.bigText}>{card}</Text>
          ) : (
            <CardBack height={"95%"} width={"100%"} />
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
