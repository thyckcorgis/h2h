import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
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
  const { code, users } = route.params;
  const [roomUsers, setRoomUsers] = useState(users);
  const renderItem = ({ item }: { item: any }) => <Item title={item} />;
  useEffect(() => {
    socket.on("player-joined", ({ user }: { user: string }) => {
      setRoomUsers((roomUsers: string[]) => [...roomUsers, user]);
    });
    socket.on("start-game", (data: any) => {
      if (data.ok) navigation.navigate("Game", { users });
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>Room Code: {code}</Text>
      <Text style={styles.bigText}>Who's in the room?</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={roomUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          extraData={roomUsers}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Waiting")}>
        <Image source={require("../assets/images/settings_button.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Game")}>
        <Image source={require("../assets/images/start_button.png")} />
      </TouchableOpacity>
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
  },
  bigText: {
    fontSize: 30,
    color: "white",
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    width: 250,
    height: 450,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  list: {
    color: "white",
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
    fontFamily: "Georgia",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
