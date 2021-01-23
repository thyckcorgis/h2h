import { Socket } from "./server/node_modules/socket.io";

export interface Settings {
  happy: boolean;
  heavy: boolean;
  toTheSpeaker: boolean;
  selfReflection: boolean;
  customCards: boolean;
}

export interface ServerMessageResponse {
  ok: boolean;
  message: string;
}

export interface NextCardResponse {
  currentCard: string;
  currentPlayer: string;
}

type CreateRoomAckFn = (code: string) => void;
export type CreateRoomHandler = (name: string, fn: CreateRoomAckFn) => void;

export type QuitHandler = (code: string, name: string, isHost: boolean) => void;

export type SettingHandler = (code: string, settings: Settings) => void;

type ResponseAckFn = (
  data: JoinServerResponse | ServerMessageResponse | NextCardResponse
) => void;

export type AnonEventHandlerWithResponse = (
  code: string,
  fn: ResponseAckFn
) => void;
export type EventHandlerWithResponse = (
  name: string,
  code: string,
  fn: ResponseAckFn
) => void;

type StartGameAckFn = (res: StartGameResponse) => void;

export type StartGameHandler = (code: string, fn: StartGameAckFn) => void;
export type SocketEvent<T> = (socket: Socket) => T;

export interface JoinServerResponse extends ServerMessageResponse {
  currentPlayer: string;
  currentCard: string;
  users: string[];
  gameStarted: boolean;
  settings: Settings;
}

export interface StartGameResponse extends NextCardResponse {
  users: string[];
}
