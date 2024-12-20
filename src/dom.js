import Player from "./player";
import Ship from "./ship";

function initGame(size) {
  const player = new Player(size, "Human", ".board-1");
  const computer = new Player(size, "Computer", ".board-2");

  const ship1 = new Ship(4);
  const ship2 = new Ship(4);
  player.gameboard.addShip(2, 3, ship1);
  computer.gameboard.addShip(2, 3, ship2);

  displayBoard(player, computer);
  displayBoard(computer);
}

function displayBoard(player, computer) {
  const container = document.querySelector(player.container);
  container.innerHTML = "";

  player.gameboard.board.forEach((row, i) => {
    row.forEach((col, j) => {
      const cellDiv = setupCell(player, i, j);

      if (player.type === "Human") {
        cellClickListener(cellDiv, player, computer);
      }
      container.appendChild(cellDiv);
    });
  });

  if (player.type === "Human") {
    computerMove(computer);
  }
}

function setupCell(player, i, j) {
  const cellDiv = document.createElement("div");

  cellDiv.id = "1" + i + j;
  cellDiv.classList = "cell";

  if (player.gameboard.board[i][j].clicked === true) {
    cellDiv.classList = "cell clicked";
    if (player.gameboard.board[i][j].isShip === true) {
      cellDiv.classList = "cell clicked found";
    }
  }
  return cellDiv;
}

function cellClickListener(cell, player, computer) {
  cell.addEventListener("click", () => {
    player.gameboard.receiveAttack(cell.id[1], cell.id[2]);
    checkWin(player);
    displayBoard(player, computer);
  });
}

function checkWin(player) {
  if (player.gameboard.allSunk()) {
    alert(player.type + " Won!");
  }
}

function computerMove(player) {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);

  player.gameboard.receiveAttack(row, col);
  displayBoard(player, player.container);
  checkWin(player);
}

export { initGame };
