import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {useState} from 'react';


interface HomeScreenProps {
  navigation: StackNavigationHelpers;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [code, setCode] = useState("");


  return (
    <View>
      <Text>Host Confessation</Text>
      <Button title="Host" onPress={() => navigation.navigate("Waiting")} />
      <Text>Join Confessation</Text>
      <TextInput 
        placeholder="Enter a room code"
        onChangeText={(text) => setCode(text)}
        value={code}
        keyboardType='number-pad'
      />
      <Button title="Join" onPress={() => navigation.navigate("Waiting")} />
    </View>
  );
}
