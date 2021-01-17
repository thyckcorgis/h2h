import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";

import {
  LoadingScreen,
  StartScreen,
  RegisterScreen,
  HomeScreen,
  WaitingScreen,
  GameScreen,
} from "./components";

const Stack = createStackNavigator();

const forFade = ({ current }: { current: any }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  const hideHeader = { headerShown: false };
  const disableSwipeBack = { gestureEnabled: false };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ ...hideHeader, cardStyleInterpolator: forFade }}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={hideHeader}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={hideHeader}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={hideHeader} />
        <Stack.Screen
          name="Waiting"
          component={WaitingScreen}
          options={{ ...hideHeader, ...disableSwipeBack }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ ...hideHeader, ...disableSwipeBack }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
