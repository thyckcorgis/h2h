import Settings from "./settings";

export interface ServerMessageResponse {
  ok: boolean;
  message: string;
}

export interface NextCardResponse {
  currentCard: string;
  currentPlayer: string;
}
export interface JoinServerResponse
  extends ServerMessageResponse,
    NextCardResponse {
  users: string[];
  gameStarted: boolean;
  settings: Settings;
}

export interface StartGameResponse extends NextCardResponse {
  users: string[];
}

export interface QuitLobbyResponse {
  newHost: string;
  users: string[];
}
export interface QuitGameResponse extends QuitLobbyResponse, NextCardResponse {
  playerQuit: string;
}
