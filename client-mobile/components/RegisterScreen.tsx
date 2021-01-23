import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
} from "react-native";
import { useState } from "react";

import ScreenProps from "./ScreenProps";
import Mission from "./Mission";
import Features from "./Features";

import { RegisterButton, HelpButton, MissionButton } from "../assets/images/";

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
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        {/* This is the view containing the modals */}
        <View style={styles.topContainer}>
          {/* Makes features visible */}
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
          <TouchableOpacity
            onPress={() => setFeaturesVisible(!featuresVisible)}
          >
            <HelpButton />
          </TouchableOpacity>
          {/* Makes mission visible */}
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
            placeholderTextColor="grey"
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
  container: {
    flex: 3,
    alignItems: "center",
    width: "100%",
  },
  bigText: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
  },
  inputField: {
    padding: "2%",
    paddingTop: "5%",
    width: "70%",
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
    padding: "5%",
    fontFamily: "Avenir-Light",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // margin: "10%",
    // padding: "10%",
  },
  modalView: {
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: "5%",
    // justifyContent: "center",
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
  topContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: "5%",
    width: "100%",
  },
});
