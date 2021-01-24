import Settings from "./settings";
import User from "./user";

export interface ServerMessageResponse {
  ok: boolean;
  message: string;
}

export interface NextCardResponse {
  currentCard: string;
  currentPlayer: User;
}
export interface JoinServerResponse
  extends ServerMessageResponse,
    NextCardResponse {
  users: User[];
  gameStarted: boolean;
  settings: Settings;
}

export interface StartGameResponse extends NextCardResponse {
  users: User[];
}

export interface QuitLobbyResponse {
  newHost: User | undefined;
  users: User[];
}
export interface QuitGameResponse extends NextCardResponse {
  newHost: User | undefined;
  playerQuit: string; // socket id
}
