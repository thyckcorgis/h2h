import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Modal, Alert, TouchableHighlight } from "react-native";

interface GameScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function GameScren({ route, navigation }: GameScreenProps) {
  const { card, name, users } = route.params;

  useEffect(() => {});

  const nextCardHandler = () => {};

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>{name}</Text>
      <Text style={styles.smallText}>
        It is your turn. Ask the group the question below.
      </Text>
      <View style={styles.cardContainer}>
        <Text style={styles.bigText}>{card}</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View>
            <Text style={styles.smallText}>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.smallText}>Close</Text>
            </TouchableHighlight>
        </View>
      </Modal>
      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.smallText}>Participants</Text>
      </TouchableHighlight>      
      <Button title="next" onPress={nextCardHandler} />
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
    textAlign: "center",
  },
  cardContainer: {
    width: 250,
    height: 400,
    backgroundColor: "#892cdc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  bigText: {
    fontSize: 30,
    color: "white",
    paddingVertical: 20,
    padding: 10,
    textAlign: "center",
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
},
});
