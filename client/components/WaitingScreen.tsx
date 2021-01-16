import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import * as React from "react";
import { View, Text, Button, FlatList } from "react-native";

interface WaitingScreenProps {
  navigation: StackNavigationHelpers;
}

const users = [
    {
      id: '1',
      title: 'User 1',
    },
    {
      id: '2',
      title: 'User 2',
    },
    {
      id: '3',
      title: 'User 3',
    },
  ];

  const Item = ({title} : {title:any}) => (
    <View>
      <Text>{title}</Text>
    </View>
  );
  

export default function WaitingScreen({ navigation }: WaitingScreenProps) {
    const renderItem = ({item} : {item:any}) => (
        <Item title={item.title} />
      );

  return (
    <View>
      <Text>Room Code (roomCode)</Text>
      <Text>Who's in the room?</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Settings" onPress={() => navigation.navigate("Waiting")} />
      <Button title="START" onPress={() => navigation.navigate("Waiting")} />

    </View>
  );
}
