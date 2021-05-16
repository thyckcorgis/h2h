import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  Dimensions,
} from "react-native";
import { useState } from "react";

import Styles from "../styles";

import ScreenProps from "../ScreenProps";
import ModalView from "../basics/ModalView";
import Mission from "../modals/Mission";
import Features from "../modals/Features";

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
    }
    setErrorMessage(null);
    navigation.navigate("Home", { name });
  };

  return (
    <SafeAreaView style={Styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => setFeaturesVisible(true)}>
              <HelpButton />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMissionVisible(true)}>
              <MissionButton />
            </TouchableOpacity>

            <ModalView visible={featuresVisible} setVisible={setFeaturesVisible}>
              <Features />
            </ModalView>
            <ModalView visible={missionVisible} setVisible={setMissionVisible}>
              <Mission />
            </ModalView>
          </View>

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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    padding: "5%",
  },
  container: {
    flex: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
