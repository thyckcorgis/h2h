import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  ListRenderItem,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import socket from "../../socket";

import { SettingsButton, StartButton, QuitButton } from "../../assets/images";
import ScreenProps from "../ScreenProps";
import { Route } from "@react-navigation/native";

import { User, QuitLobbyResponse, Settings } from "../../../types";
import SettingsModal from "../modals/SettingsModal";
import { LobbyParams } from "../params";
import startGameEventCallback from "../startGame";

interface LobbyScreenProps extends ScreenProps {
  route: Route<"Lobby", LobbyParams>;
}

const Item = ({ user }) => (
  <View>
    <Text style={{ ...styles.smallText, paddingVertical: "2%" }}>{user.name}</Text>
  </View>
);

const renderItem: ListRenderItem<User> = ({ item }) => <Item user={item} />;

function randCode() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}

export default function LobbyScreen({ navigation, route }: LobbyScreenProps) {
  const { name, code, users: _users, isHost: _isHost, settings: _settings } = route.params;
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [settings, setSettings] = useState(_settings);

  const [users, setUsers] = useState(_users);
  const [isHost, setHost] = useState(_isHost);

  const getParams = () => ({ code, name, isHost });

  const startGameEvent = () => startGameEventCallback(navigation, getParams());

  useEffect(() => {
    socket.on("start-game", startGameEvent());
    socket.on("add-custom", () => navigation.navigate("Custom", getParams()));
    socket.on("quit-lobby", ({ newHost, users }: QuitLobbyResponse) => {
      setUsers(users);
      setHost(newHost ? newHost.name === name : isHost);
    });
    socket.on("setting", (settings: Settings) => setSettings(settings));
    socket.on("player-joined", (user: User) => setUsers((users) => [...users, user]));

    return () => {
      socket.off("start-game");
      socket.off("add-custom");
      socket.off("quit-lobby");
      socket.off("setting");
      socket.off("player-joined");
    };
  }, [isHost]);

  useEffect(() => {
    if (isHost) socket.emit("setting", code, settings);
  }, [settings]);

  const startGameHandler = () => {
    if (!settings.customCards) {
      socket.emit("start-game", code, startGameEvent());
    } else {
      socket.emit("add-custom", code);
      navigation.navigate("Custom", getParams());
    }
  };

  const quitLobbyHandler = () => {
    socket.emit("quit-lobby", code, isHost);
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
      <View style={{ ...styles.screen, flex: 4 }}>
        <Text style={styles.bigText}>Who's in the room?</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(_) => randCode()}
            extraData={users}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={settingsVisible}
          onRequestClose={() => {
            setSettingsVisible(!settingsVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.bigText}>Game Settings</Text>
              <SettingsModal isHost={isHost} settings={settings} onChangeSettings={setSettings} />
              <TouchableOpacity
                onPress={() => {
                  setSettingsVisible(!settingsVisible);
                }}
              >
                <View style={styles.closeContainer}>
                  <Text style={{ ...styles.smallText, padding: "5%" }}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <View style={styles.navBar}> */}
        <TouchableOpacity
          onPress={() => {
            setSettingsVisible(true);
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
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  codeText: { fontSize: 30, color: "#892cdc", paddingTop: "10%", fontFamily: "Avenir-Light" },
  bigText: { fontSize: 30, color: "white", textAlign: "center", fontFamily: "Avenir-Light" },
  listContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    width: "70%",
    height: "50%",
    margin: "5%",
    padding: "4%",
    alignItems: "center",
  },
  list: { color: "white" },
  buttonContainer: { margin: "3%", alignItems: "center" },
  filterContainer: { flexDirection: "row", marginVertical: "5%" },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir-Light",
  },
  quit: { flexDirection: "row", alignSelf: "flex-start" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  navBar: { alignItems: "baseline", justifyContent: "center" },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    paddingTop: "5%",
    height: "60%",
    width: "80%",
    opacity: 0.9,
    alignItems: "center",
  },
  closeContainer: {
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
});
