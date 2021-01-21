import categories from "./categories.json";
import { shuffleArray } from "./helpers";
import { Settings } from "../../types";

export default class Room {
  users: string[];
  currentPlayerIdx: number;
  cards: string[];
  customCards: string[];
  gameStarted: boolean;
  currentCard: string;
  settings: Settings;
  constructor(hostName: string) {
    this.users = [hostName];
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

  endTurn() {
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

  addUser(userName: string) {
    this.users.push(userName);
  }

  removeUser(name: string) {
    this.users = this.users.filter((user) => user !== name);
    this.currentPlayerIdx = this.currentPlayerIdx % this.users.length;
  }

  userExists(name: string) {
    return this.users.includes(name);
  }

  getNewHost(isHost: boolean) {
    return isHost ? this.users[0] : "";
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
