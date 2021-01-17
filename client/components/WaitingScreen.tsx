import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CheckBox from "./Checkbox";

import socket from "../socket";

import SettingsButton from "../assets/images/settings_button.svg";
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
  const {
    name,
    code,
    users: _users,
    isHost: _isHost,
    happy: _happy,
    heavy: _heavy,
    toTheSpeaker: _toTheSpeaker,
    selfReflection: _selfReflection,
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [happy, setHappy] = useState(_happy);
  const [heavy, setHeavy] = useState(_heavy);
  const [toTheSpeaker, setToTheSpeaker] = useState(_toTheSpeaker);
  const [selfReflection, setSelfReflection] = useState(_selfReflection);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);

  const renderItem = ({ item }: { item: any }) => <Item title={item} />;
  useEffect(() => {
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
    if (!isHost) {
      socket.on("setting", (settings) => {
        const { happy, heavy, selfReflection, toTheSpeaker } = settings;
        setHappy(happy);
        setHeavy(heavy);
        setSelfReflection(selfReflection);
        setToTheSpeaker(toTheSpeaker);
      });
    }
    socket.on("player-joined", ({ user }: { user: string }) => {
      setUsers((users: string[]) => [...users, user]);
    });
  }, [isHost]);

  useEffect(() => {
    if (isHost) {
      socket.emit("setting", code, {
        happy,
        heavy,
        selfReflection,
        toTheSpeaker,
      });
    }
  }, [happy, heavy, selfReflection, toTheSpeaker, isHost]);

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

  const toggle = (fn) => {
    console.log("oopo");
    return (newVal) => fn(newVal);
  };

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
      <View style={{ flex: 4, alignItems: "center" }}>
        <Text style={styles.bigText}>Who's in the room?</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            extraData={users}
          />
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
              <Text style={styles.bigText}>Game Mode</Text>

              <View style={styles.filterContainer}>
                <Text style={styles.smallText}>Happy</Text>
                <CheckBox
                  disabled={!isHost}
                  value={happy}
                  onValueChange={toggle(setHappy)}
                />
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.smallText}>Self-reflection</Text>
                <CheckBox
                  disabled={!isHost}
                  value={selfReflection}
                  onValueChange={toggle(setSelfReflection)}
                />
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.smallText}>Heavy</Text>
                <CheckBox
                  disabled={!isHost}
                  value={heavy}
                  onValueChange={toggle(setHeavy)}
                />
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.smallText}>To the Speaker</Text>
                <CheckBox
                  disabled={!isHost}
                  value={toTheSpeaker}
                  onValueChange={toggle(setToTheSpeaker)}
                />
              </View>

              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.smallText}>Close</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ ...styles.smallText, color: "white" }}>
                {message}
              </Text>
            </View>
          </View>
        </Modal>
        {/* <View style={styles.navBar}> */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <SettingsButton width={250} />
        </TouchableOpacity>
        {start}
        {/* </View> */}
        <View style={styles.quit}>
          <TouchableOpacity onPress={quitLobbyHandler}>
            <QuitButton />
          </TouchableOpacity>
        </View>
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
    fontFamily: "Avenir-Light",
  },
  bigText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir-Light",
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
  filterContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  closeContainer: {
    marginTop: 50,
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  quit: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  navBar: {
    // flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
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
    alignItems: "center",
  },
});
