import Ship from "./ship";

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.ships = [];
    this.initBoard();
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

  addShip(row, col, ship) {
    this.ships.push({ ship, row, col });

    if ((ship.direction == "Vertical")) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col].isShip = true;
        this.board[row + i][col].ship = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i].isShip = true;
        this.board[row][col + i].ship = ship;
      }
    }
  }

  receiveAttack(row, col) {
    this.board[row][col].clicked = true;

    if (this.board[row][col].isShip === true) {
      this.board[row][col].ship.hit();
    }
  }

  allSunk() {
    let sunk = true;
    this.ships.forEach((e) => {
      if (!e.ship.isSunk()) {
        sunk = false;
      }
    });
    return sunk;
  }
}

export default Gameboard;
