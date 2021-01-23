import Settings from "./settings";
import { Socket } from "../server/node_modules/socket.io/dist";
import {
  JoinServerResponse,
  ServerMessageResponse,
  NextCardResponse,
  StartGameResponse,
} from "./responses";

type AckFn = (
  res:
    | JoinServerResponse
    | ServerMessageResponse
    | NextCardResponse
    | StartGameResponse
    | string
) => void;

export type AnonEventHandler = (code: string, fn: AckFn) => void;

export type EventHandler = (name: string, code: string, fn: AckFn) => void;

export type QuitHandler = (code: string, name: string, isHost: boolean) => void;

export type SettingHandler = (code: string, settings: Settings) => void;

export type SocketEvent<T> = (socket: Socket) => T;
