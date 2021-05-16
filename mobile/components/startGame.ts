import { CustomCardParams, GameParams } from "./params";
import { StartGameResponse } from "../../types";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

export default function startGameEventCallback(
  navigation: StackNavigationHelpers,
  preParams: CustomCardParams
) {
  return (res: StartGameResponse) => {
    const params: GameParams = { ...preParams, ...res };
    navigation.navigate("Game", params);
  };
}
