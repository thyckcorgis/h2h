import React from "react";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useState } from "react";
import Mission from "./Mission";
import Features from "./Features";

import { RegisterButton, HelpButton, MissionButton } from "../assets/images/";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);

  const registerHandler = () => {
    if (name === "") {
      setErrorMessage("Please enter a name.");
      return;
    }
    navigation.navigate("Home", { name });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      {/* This is the view containing the modals */}
      <View style={styles.topContainer}>
        {/* Makes features visible */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={featuresVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{ flex: 9 }}>
                <Features />
              </View>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => setFeaturesVisible(!featuresVisible)}
                >
                  <Text style={styles.smallText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setFeaturesVisible(!featuresVisible)}>
          <HelpButton />
        </TouchableOpacity>
        {/* Makes mission visible */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={missionVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{ flex: 9 }}>
                <Mission />
              </View>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => setMissionVisible(!missionVisible)}
                >
                  <Text style={styles.smallText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            setMissionVisible(!missionVisible);
          }}
        >
          <MissionButton />
        </TouchableOpacity>
      </View>

      {/* This is where the register name part starts */}
      <View style={styles.container}>
        <Text style={styles.bigText}>Ready to Talk?</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Your name"
          placeholderTextColor="white"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text
          style={{
            ...styles.smallText,
            color: "red",
            padding: 10,
            marginBottom: 30,
          }}
        >
          {errorMessage}
        </Text>
        <TouchableOpacity onPress={registerHandler}>
          <RegisterButton />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  container: {
    flex: 3,
    alignItems: "center",
  },
  bigText: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
  },
  inputField: {
    padding: 5,
    marginTop: 10,
    // marginBottom: 20,
    width: 250,
    textAlign: "left",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 18,
    color: "white",
    fontFamily: "Avenir-Light",
  },
  smallText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    // justifyContent: "center",
    height: 600,
    width: 350,
    opacity: 0.9,
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
  topContainer: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "flex-end",
    marginTop: 30,
  },
});
