import Gameboard from "../gameboard";
import Ship from "../ship";

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(10);
});

test("intiliizing board", () => {
  gameboard.initBoard(10);

  for (let i = 0; i < gameboard.size; i++) {
    for (let j = 0; j < gameboard.size; j++) {
      expect(gameboard.board[i][j]).toEqual({
        isShip: false,
        clicked: false,
        ship: null,
      });
    }
  }
});

test("adding a ship", () => {
  gameboard.initBoard(10);
  const ship = new Ship(3);
  gameboard.addShip(6, 3, ship);
  for (let i = 0; i < 1; i++) {
    expect(gameboard.board[6 + i][3].isShip).toBe(true);
  }
});

test("reaceiving attack", () => {
  gameboard.initBoard(10);
  const ship = new Ship(2);
  gameboard.addShip(6, 3, ship);
  gameboard.receiveAttack(6, 3);
  expect(gameboard.board[6][3]).toEqual({
    isShip: true,
    clicked: true,
    ship: ship,
  });
  expect(ship.hits).toBe(1);
  expect(gameboard.ships[0].ship.hits).toBe(1);
});
