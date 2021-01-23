import { Settings } from "../../types";

export interface CustomCardParams {
  code: string;
  name: string;
  isHost: boolean;
}

export interface GameParams extends CustomCardParams {
  currentPlayer: string;
  currentCard: string;
  users: string[];
}

export interface LobbyParams extends CustomCardParams {
  users: string[];
  settings: Settings;
}
