export interface User {
  name: string;
  socketID: string;
}

export {
  AnonEventHandler,
  EventHandler,
  QuitHandler,
  SettingHandler,
  SocketEvent,
} from "./handlers";

export {
  ServerMessageResponse,
  NextCardResponse,
  JoinServerResponse,
  StartGameResponse,
  QuitLobbyResponse,
  QuitGameResponse,
} from "./responses";

export { default as Settings } from "./settings";
