import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { useState } from 'react'
import { TextInput } from "react-native-gesture-handler";

interface RegisterScreenProps {
  navigation: StackNavigationHelpers;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [name, setName] = useState("");

  return (
    <View>
      <Text>Ready to Talk?</Text>
      <TextInput 
        placeholder="Your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button title="I'm ready" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
