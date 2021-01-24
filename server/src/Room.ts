import categories from "./categories.json";
import { shuffleArray } from "./helpers";
import { User, Settings } from "../../types";

export default class Room {
  users: User[];
  currentPlayerIdx: number;
  cards: string[];
  customCards: string[];
  gameStarted: boolean;
  currentCard: string;
  settings: Settings;
  constructor(name: string, socketID: string) {
    this.users = [{ name, socketID }];
    this.currentPlayerIdx = 0;
    this.cards = [];
    this.customCards = [];
    this.gameStarted = false;
    this.currentCard = "";
    this.settings = {
      happy: true,
      heavy: true,
      toTheSpeaker: true,
      selfReflection: true,
      customCards: false,
    };
  }

  nextTurn() {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.users.length;
  }

  setSettings(settings: Settings) {
    this.settings = settings;
  }

  getCurrentPlayer() {
    return this.users[this.currentPlayerIdx];
  }

  drawCard() {
    const card = this.cards.pop();
    this.currentCard = card || "";
    return card;
  }

  getCurrentCard() {
    return this.currentCard;
  }

  getUsers() {
    return [...this.users];
  }

  addUser(name: string, socketID: string) {
    this.users.push({ name, socketID });
  }

  removeUser(socketID: string) {
    this.users = this.users.filter((user) => user.socketID !== socketID);
    this.currentPlayerIdx = this.currentPlayerIdx % this.users.length;
  }

  isEmpty() {
    return this.users.length === 0;
  }

  userExists(name: string) {
    return this.users.some((user) => user.name === name);
  }

  getNewHost(isHost: boolean) {
    return isHost ? this.users[0] : undefined;
  }

  startGame() {
    this.gameStarted = true;
  }

  customCardsEnabled() {
    return this.settings.customCards;
  }

  addCustomCard(question: string) {
    this.customCards.push(question);
  }

  createCardDeck() {
    Object.entries(this.settings).forEach(([key, val]) => {
      if (val && key !== "customCards")
        this.cards = this.cards.concat(categories[key]);
    });

    if (this.settings.customCards) {
      this.cards = this.cards.concat(this.customCards);
      this.customCards = [];
    }

    this.cards = shuffleArray(this.cards);
  }
}
