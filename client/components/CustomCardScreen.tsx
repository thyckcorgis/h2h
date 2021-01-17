import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";

interface CustomCardScreenProps {
  navigation: StackNavigationHelpers;
  route: any;
}

export default function CustomCardScreen({
  navigation,
  route,
}: CustomCardScreenProps) {
  const {
    code,
    name,
    current: current,
    card: card,
    users: users,
    isHost: isHost,
  } = route.params;
  const [question, setQuestion] = useState("");
  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <Text style={styles.bigText}>Add custom card</Text>
      <TextInput
        multiline={true}
        style={styles.inputField}
        placeholder="Input question"
        placeholderTextColor="black"
        onChangeText={(text) => setQuestion(text)}
        value={question}
      />
      <Button
        title="Submit"
        onPress={() =>
          navigation.navigate("Game", {
            code,
            current,
            card,
            name,
            users,
            isHost,
          })
        }
      />
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
  bigText: {
    fontFamily: "Avenir-Light",
    fontSize: 30,
    color: "white",
  },
});
