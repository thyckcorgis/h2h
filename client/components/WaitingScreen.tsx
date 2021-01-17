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
  const { name, code, users } = route.params;
  const [roomUsers, setRoomUsers] = useState(users);
  const renderItem = ({ item }: { item: any }) => <Item title={item} />;
  useEffect(() => {
    socket.on("player-joined", ({ user }: { user: string }) => {
      setRoomUsers((roomUsers: string[]) => [...roomUsers, user]);
    });
    socket.on("start-game", (data: any) => {
      if (data.ok)
        navigation.navigate("Game", { card: data.card, name, users });
    });
  }, []);

  const startGameHandler = () => {
    socket.emit("start-game", code, (card: string) => {
      navigation.navigate("Game", { card, name, users });
    });
  };

  const settingsHandler = () => {};

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 1 }}>
        <Text style={styles.codeText}>Room Code: {code}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.bigText}>Who's in the room?</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={roomUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            extraData={roomUsers}
          />
        </View>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={settingsHandler}
        >
          <Image source={require("../assets/images/settings_button.png")} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={startGameHandler}
        >
          <Image source={require("../assets/images/start_button.png")} />
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
  },
  inputField: {
    padding: 5,
    margin: 10,
    width: 250,
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
