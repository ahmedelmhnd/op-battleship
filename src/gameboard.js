import Ship from "./ship";

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.ships = [];
  }

  set size(value) {
    this._size = value;
  }

  get size() {
    return this._size;
  }

  initBoard() {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = { isShip: false, clicked: false, ship: null };
      }
    }
  }

  addShip(xCoord, yCoord, ship) {
    this.ships.push({ ship, xCoord, yCoord });

    for (let i = 0; i < ship.length; i++) {
      this.board[xCoord + i][yCoord].isShip = true;
      this.board[xCoord + i][yCoord].ship = ship;
    }
  }

  receiveAttack(xCoord, yCoord) {
    this.board[xCoord][yCoord].clicked = true;

    if (this.board[xCoord][yCoord].isShip === true) {
      this.board[xCoord][yCoord].ship.hit();
    }
  }
}

export default Gameboard;
