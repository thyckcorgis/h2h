export default class Room {
  users: string[];
  currentPlayerIdx: number;
  cards: string[];
  customCards: string[];
  gameStarted: boolean;
  currentCard: string;
  settings: {
    happy: boolean;
    heavy: boolean;
    toTheSpeaker: boolean;
    selfReflection: boolean;
    customCards: boolean;
  };

  constructor(hostName: string) {
    this.users = [hostName];
    this.currentPlayerIdx = 0;
  }
}
