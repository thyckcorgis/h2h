import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";

import {
  LoadingScreen,
  StartScreen,
  RegisterScreen,
  HomeScreen,
  LobbyScreen,
  GameScreen,
  CustomCardScreen,
} from "./components";

const Stack = createStackNavigator();

const forFade: StackCardStyleInterpolator = ({ current: progress }) => ({
  cardStyle: {
    opacity: progress,
  },
});

export default function App() {
  const hideHeader = { headerShown: false };
  const disableSwipeBack = { gestureEnabled: false };
  const hideAndDisable = { ...hideHeader, ...disableSwipeBack };

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
          name="Lobby"
          component={LobbyScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Custom"
          component={CustomCardScreen}
          options={hideAndDisable}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={hideAndDisable}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
