import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import socket from "../socket";

import StartButton from "../assets/images/start_button.svg";
import QuitButton from "../assets/images/quit_button.svg";

interface WaitingScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

const Item = ({ title }: { title: any }) => (
  <View>
    <Text style={styles.bigText}>{title}</Text>
  </View>
);

export default function WaitingScreen({
  navigation,
  route,
}: WaitingScreenProps) {
  const { name, code, users: _users, isHost: _isHost } = route.params;
  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);

  const renderItem = ({ item }: { item: any }) => <Item title={item} />;
  useEffect(() => {
    socket.on("player-joined", ({ user }: { user: string }) => {
      setUsers((users: string[]) => [...users, user]);
    });
    socket.on("start-game", (data: any) => {
      const { ok, current, card, users } = data;
      if (ok)
        navigation.navigate("Game", {
          code,
          current,
          card,
          name,
          users,
          isHost,
        });
    });
    socket.on("quit-lobby", (data: any) => {
      const { newHost, users } = data;
      setUsers(users);
      setHost(newHost === "" ? isHost : name === newHost);
    });
  }, []);

  const startGameHandler = () => {
    socket.emit("start-game", code, (data: any) => {
      const { current, card, users } = data;

      navigation.navigate("Game", { code, current, card, name, users, isHost });
    });
  };

  const quitLobbyHandler = () => {
    socket.emit("quit-lobby", code, name, isHost);
    navigation.navigate("Home", { name });
  };

  const settingsHandler = () => {};

  const start = isHost ? (
    <TouchableOpacity style={styles.buttonContainer} onPress={startGameHandler}>
      <StartButton width={250} />
    </TouchableOpacity>
  ) : null;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 1 }}>
        <Text style={styles.codeText}>Room Code: {code}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.bigText}>Who's in the room?</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            extraData={users}
          />
        </View>
        {start}
      </View>
      <View style={styles.quit}>
        <TouchableOpacity onPress={quitLobbyHandler}>
          <QuitButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  codeText: {
    fontSize: 30,
    color: "#892cdc",
    paddingTop: 30,
  },
  bigText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    width: 250,
    height: 300,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  list: {
    color: "white",
  },
  buttonContainer: {
    margin: 5,
    alignItems: "center",
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  quit: {
    flexDirection: "row",
    alignSelf: "flex-start",
    margin: 40,
  },
});
