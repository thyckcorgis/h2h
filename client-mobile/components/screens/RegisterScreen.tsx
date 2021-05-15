import React from "react";
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

import Styles from "../styles";
import SafeView from "../basics/SafeView";

import ScreenProps from "../ScreenProps";
import Mission from "../basics/Mission";
import Features from "../basics/Features";

import { RegisterButton, HelpButton, MissionButton } from "../../assets/images";

export default function RegisterScreen({ navigation }: ScreenProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);

  const registerHandler = () => {
    if (name === "") {
      setErrorMessage("Please enter a name.");
      return;
    } else {
      setErrorMessage(null);
    }
    navigation.navigate("Home", { name });
  };

  return (
    <SafeView>
      <KeyboardAvoidingView style={Styles.screen} behavior="padding">
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => setFeaturesVisible(!featuresVisible)}
          >
            <HelpButton />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMissionVisible(!missionVisible);
            }}
          >
            <MissionButton />
          </TouchableOpacity>

          {/* FEATURES MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={featuresVisible}
            onRequestClose={() => {
              setFeaturesVisible(!featuresVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View style={{ flex: 1 }}>
                  <Features />
                </View>
                <View style={styles.closeContainer}>
                  <TouchableOpacity
                    onPress={() => setFeaturesVisible(!featuresVisible)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* MISSION MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={missionVisible}
            onRequestClose={() => {
              setMissionVisible(!missionVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View style={{ flex: 1 }}>
                  <Mission />
                </View>
                <View style={styles.closeContainer}>
                  <TouchableOpacity
                    onPress={() => setMissionVisible(!missionVisible)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {/* This is where the register name part starts */}
        <View style={styles.container}>
          <Text style={Styles.bigText}>Ready to Talk?</Text>
          <TextInput
            style={Styles.inputField}
            placeholder="Your name"
            placeholderTextColor="grey"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Text style={Styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity onPress={registerHandler}>
            <RegisterButton />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: "5%",
    height: "70%",
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
  closeText: {
    ...Styles.smallText,
    padding: "5%",
  },
});
