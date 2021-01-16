import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

interface WaitingScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

const users = [
  {
    id: "1",
    title: "User 1",
  },
  {
    id: "2",
    title: "User 2",
  },
  {
    id: "3",
    title: "User 3",
  },
];

const Item = ({ title }: { title: any }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function WaitingScreen({
  navigation,
  route,
}: WaitingScreenProps) {
  const { socket, code, users } = route.params;
  const renderItem = ({ item }: { item: any }) => <Item title={item.title} />;
  socket.on("player-joined", (user: string) => {
    users.push(user);
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>Room Code: {code}</Text>
      <Text style={styles.bigText}>Who's in the room?</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Settings" onPress={() => navigation.navigate("Waiting")} />
      <Button title="START" onPress={() => navigation.navigate("Game")} />
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
  continueText: {
    fontFamily: "Comfortaa",
    fontSize: 14,
    color: "#892cdc",
    paddingVertical: 30,
  },
});
