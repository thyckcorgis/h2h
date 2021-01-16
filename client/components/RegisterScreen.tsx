import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");

  return (
    <View style={styles.screen}>
      <Text style={styles.bigText}>Ready to Talk?</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Home", { name })}>
        <Image source={require("../assets/images/register_button.png")} />
      </TouchableOpacity>
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
    marginVertical: 20,
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
});
