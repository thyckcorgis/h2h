import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import socket from "../socket";

import { SettingsButton, StartButton, QuitButton } from "../assets/images/";
import ScreenProps from "./ScreenProps";
import { Route } from "@react-navigation/native";

import { QuitLobbyResponse, Settings, StartGameResponse } from "../../types";
import SettingsModal from "./SettingsModal";
import { GameParams, WaitingParams } from "./params";

interface WaitingScreenProps extends ScreenProps {
  route: Route<"Waiting", WaitingParams>;
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
    settings: _settings,
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const [settings, setSettings] = useState(_settings);

  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);

  const startGameEvent = (res: StartGameResponse) => {
    const params: GameParams = {
      code,
      name,
      isHost,
      ...res,
    };
    navigation.navigate("Game", params);
  };

  const renderItem = ({ item }: { item: string }) => <Item title={item} />;
  useEffect(() => {
    socket.on("start-game", startGameEvent);
    socket.on("add-custom", () => {
      navigation.navigate("Custom", {
        code,
        name,
        isHost,
      });
    });
    socket.on("quit-lobby", ({ newHost, users }: QuitLobbyResponse) => {
      setUsers(users);
      setHost(newHost === "" ? isHost : name === newHost);
    });

    socket.on("setting", (settings: Settings) => setSettings(settings));

    socket.on("player-joined", (name: string) => {
      setUsers((users: string[]) => [...users, name]);
    });
  }, [isHost]);

  useEffect(() => {
    if (isHost) socket.emit("setting", code, settings);
  }, [settings]);

  const startGameHandler = () => {
    if (!settings.customCards) {
      socket.emit("start-game", code, startGameEvent);
    } else {
      socket.emit("add-custom", code);
      navigation.navigate("Custom", {
        code,
        name,
        isHost,
      });
    }
  };

  const quitLobbyHandler = () => {
    socket.emit("quit-lobby", code, name, isHost);
    navigation.navigate("Home", { name });
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
              <Text style={styles.bigText}>Game Settings</Text>
              <SettingsModal
                isHost={isHost}
                settings={settings}
                onChangeSettings={setSettings}
              />

              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.smallText}>Close</Text>
                </TouchableOpacity>
              </View>
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
    padding: 20,
    // justifyContent: "center",
    height: 350,
    width: 300,
    opacity: 0.9,
    alignItems: "center",
  },
});
