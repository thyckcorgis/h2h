import { randCode, errorMessage } from "./helpers";
import {
  AnonEventHandlerWithResponse,
  CreateRoomHandler,
  EventHandlerWithResponse,
  QuitHandler,
  SettingHandler,
  SocketEvent,
  StartGameHandler,
} from "../../types";
import Room from "./Room";

const rooms: { [T: string]: Room } = {};
const roomExists = (code: string) => rooms[code] != null;
const removeRoom = (code: string) => delete rooms[code];

function createRoom(name: string) {
  let code = randCode();
  while (roomExists(code)) code = randCode();

  rooms[code] = new Room(name);
  return code;
}

export const createEvent: SocketEvent<CreateRoomHandler> = (socket) => (
  name,
  fn
) => {
  const code = createRoom(name);
  socket.join(code);
  fn(code);
};

export const joinEvent: SocketEvent<EventHandlerWithResponse> = (socket) => (
  name,
  code,
  fn
) => {
  if (!roomExists(code)) return fn(errorMessage("Room does not exist"));

  const room = rooms[code];

  if (room.userExists(name)) return fn(errorMessage("Name is already taken"));

  room.addUser(name);
  socket.join(code);
  fn({
    ok: true,
    message: `joined room ${code}`,
    users: rooms[code].users,
    currentPlayer: room.getCurrentPlayer(),
    currentCard: room.getCurrentCard(),
    gameStarted: rooms[code].gameStarted,
    settings: rooms[code].settings,
  });
  socket.to(code).emit("player-joined", name);
};
export const quitGameEvent: SocketEvent<QuitHandler> = (socket) => (
  code,
  name,
  isHost
) => {
  const room = rooms[code];
  socket.leave(code);
  room.removeUser(name);
  if (room.isEmpty()) {
    removeRoom(code);
    return;
  }
  socket.to(code).emit("quit-game", {
    playerQuit: name,
    current: room.getCurrentPlayer(),
    card: room.getCurrentCard(),
    newHost: room.getNewHost(isHost),
    users: rooms[code].users,
  });
};

export const quitLobbyEvent: SocketEvent<QuitHandler> = (socket) => (
  code,
  name,
  isHost
) => {
  const room = rooms[code];
  room.removeUser(name);
  if (room.isEmpty()) {
    removeRoom(code);
    return;
  }
  socket.leave(code);
  socket.to(code).emit("quit-lobby", {
    newHost: room.getNewHost(isHost),
    users: rooms[code].users,
  });
};

export const customCardEvent: EventHandlerWithResponse = (
  code,
  question,
  fn
) => {
  const room = rooms[code];
  if (!room.customCardsEnabled()) {
    return fn(errorMessage("Custom cards are not allowed in this room"));
  }
  room.addCustomCard(question);
  fn({ ok: true, message: "Added anonymous custom card" });
};

export const nextCardEvent: SocketEvent<AnonEventHandlerWithResponse> = (
  socket
) => (code, fn) => {
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
  rooms[code].setSettings(settings);
  socket.to(code).emit("setting", settings);
};

export const startGameEvent: SocketEvent<StartGameHandler> = (socket) => (
  code,
  fn
) => {
  const room = rooms[code];
  room.startGame();
  room.createCardDeck();
  room.drawCard();

  const res = {
    currentCard: room.getCurrentCard(),
    currentPlayer: room.getCurrentPlayer(),
    users: room.getUsers(),
  };

  fn(res);
  socket.to(code).emit("start-game", res);
};
