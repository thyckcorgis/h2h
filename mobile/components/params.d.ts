import { User, Settings } from "../../types";

export interface CustomCardParams {
  code: string;
  name: string;
  isHost: boolean;
}

export interface GameParams extends CustomCardParams {
  currentPlayer: User;
  currentCard: string;
  users: User[];
}

export interface LobbyParams extends CustomCardParams {
  users: User[];
  settings: Settings;
}
