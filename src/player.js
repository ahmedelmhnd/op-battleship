import Gameboard from "./gameboard.js";
class Player {
  constructor(size, type, container) {
    this.gameboard = new Gameboard(size);
    this.type = type;
    this.container = container;
  }
}

export default Player;