import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoadingScreen from "./components/LoadingScreen";
import StartScreen from "./components/StartScreen";

const Stack = createStackNavigator();

const forFade = ({ current }: { current: any }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  function hideHeader() {
    return { headerShown: false };
  }

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
