import { randCode, errorMessage } from "./helpers";
import {
  AnonEventHandler,
  EventHandler,
  JoinServerResponse,
  QuitGameResponse,
  QuitHandler,
  QuitLobbyResponse,
  SettingHandler,
  SocketEvent,
  StartGameResponse,
} from "../../types";
import Room from "./Room";

const rooms: { [T: string]: Room } = {};
const roomExists = (code: string) => rooms[code] != null;
const removeRoom = (code: string) => {
  delete rooms[code];
};

function createRoom(name: string) {
  let code = randCode();
  while (roomExists(code)) code = randCode();

  rooms[code] = new Room(name);
  return code;
}

export const createEvent: SocketEvent<AnonEventHandler> = (socket) => (
  name,
  fn
) => {
  const code = createRoom(name);
  socket.join(code);
  fn(code);
};

export const joinEvent: SocketEvent<EventHandler> = (socket) => (
  name,
  code,
  fn
) => {
  if (!roomExists(code)) return fn(errorMessage("Room does not exist"));

  const room = rooms[code];

  if (room.userExists(name)) return fn(errorMessage("Name is already taken"));

  room.addUser(name);
  socket.join(code);
  const res: JoinServerResponse = {
    ok: true,
    message: `joined room ${code}`,
    users: rooms[code].users,
    currentPlayer: room.getCurrentPlayer(),
    currentCard: room.getCurrentCard(),
    gameStarted: rooms[code].gameStarted,
    settings: rooms[code].settings,
  };
  fn(res);
  socket.to(code).emit("player-joined", name);
};
export const quitGameEvent: SocketEvent<QuitHandler> = (socket) => (
  code,
  name,
  isHost
) => {
  socket.leave(code);
  if (!roomExists(code)) return;

  const room = rooms[code];

  room.removeUser(name);
  if (room.isEmpty()) return removeRoom(code);

  const broadcast: QuitGameResponse = {
    playerQuit: name,
    currentPlayer: room.getCurrentPlayer(),
    currentCard: room.getCurrentCard(),
    newHost: room.getNewHost(isHost),
    users: rooms[code].users,
  };
  socket.to(code).emit("quit-game", broadcast);
};

export const quitLobbyEvent: SocketEvent<QuitHandler> = (socket) => (
  code,
  name,
  isHost
) => {
  socket.leave(code);

  if (!roomExists(code)) return;
  const room = rooms[code];
  room.removeUser(name);
  if (room.isEmpty()) return removeRoom(code);

  const broadcast: QuitLobbyResponse = {
    newHost: room.getNewHost(isHost),
    users: rooms[code].users,
  };

  socket.to(code).emit("quit-lobby", broadcast);
};

export const customCardEvent: EventHandler = (code, question, fn) => {
  if (!roomExists(code)) return;

  const room = rooms[code];
  if (!room.customCardsEnabled())
    return fn(errorMessage("Custom cards are not allowed in this room"));

  room.addCustomCard(question);
  fn({ ok: true, message: "Added anonymous custom card" });
};

export const nextCardEvent: SocketEvent<AnonEventHandler> = (socket) => (
  code,
  fn
) => {
  if (!roomExists(code)) return;

  const room = rooms[code];
  room.nextTurn();
  room.drawCard();
  const res = {
    currentPlayer: room.getCurrentPlayer(),
    currentCard: room.getCurrentCard(),
  };
  fn(res);
  socket.to(code).emit("next-card", res);
};

export const settingEvent: SocketEvent<SettingHandler> = (socket) => (
  code,
  settings
) => {
  if (!roomExists(code)) return;

  rooms[code].setSettings(settings);
  socket.to(code).emit("setting", settings);
};

export const startGameEvent: SocketEvent<AnonEventHandler> = (socket) => (
  code,
  fn
) => {
  if (!roomExists(code)) return;

  const room = rooms[code];
  room.startGame();
  room.createCardDeck();
  room.drawCard();

  const res: StartGameResponse = {
    currentCard: room.getCurrentCard(),
    currentPlayer: room.getCurrentPlayer(),
    users: room.getUsers(),
  };

  fn(res);
  socket.to(code).emit("start-game", res);
};
