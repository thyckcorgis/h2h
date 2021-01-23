import { Settings } from "../../types";
export interface GameParams {
  code: string;
  name: string;
  currentPlayer: string;
  currentCard: string;
  users: string[];
  isHost: boolean;
}

export interface WaitingParams {
  name: string;
  code: string;
  users: string[];
  isHost: boolean;
  settings: Settings;
}
