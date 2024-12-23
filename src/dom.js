import Player from "./player";
import Ship from "./ship";

function initGame(size) {
  const player = new Player(size, "Human", ".board-2");
  const computer = new Player(size, "Computer", ".board-1");
  pickShips(computer);

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
}

function setupCell(player, i, j) {
  const cellDiv = document.createElement("div");

  cellDiv.id = "1" + i + j;
  cellDiv.classList = "cell";

  if (player.gameboard.board[i][j].isShip === true) {
    cellDiv.classList = "cell ship";
  }

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
    computerMove(computer);
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

function pickShips(computer) {
  pickDialog(computer, 0);
}

function pickDialog(computer, shipIndex) {
  const dialog = document.querySelector("dialog");
  const board = document.querySelector(".board-0");
  board.innerHTML = "";
  pickMessage(shipIndex);
  confirmButton(shipIndex);

  computer.gameboard.board.forEach((row, i) => {
    row.forEach((col, j) => {
      const cellDiv = setupCell(computer, i, j);
      addShipsListener(computer, cellDiv, shipIndex);

      if (computer.gameboard.board[i][j].isShip) {
        cellDiv.classList = "cell ship";
      }

      board.appendChild(cellDiv);
    });
  });

  dialog.showModal();
}

function addShipsListener(computer, cellDiv, index) {
  cellDiv.addEventListener("click", () => {
    const ship = new Ship(shipLength(index));

    if (
      checkInBounds(
        Number(cellDiv.id[1]),
        Number(cellDiv.id[2]),
        ship.length,
        computer,
      )
    ) {
      if (
        checkNoShips(
          Number(cellDiv.id[1]),
          Number(cellDiv.id[2]),
          ship.length,
          computer,
        )
      ) {
        computer.gameboard.addShip(
          Number(cellDiv.id[1]),
          Number(cellDiv.id[2]),
          ship,
        );
        index++;
        pickDialog(computer, index);
      }
    }
  });
}

function pickMessage(index) {
  const message = document.querySelector(".pick-message");
  switch (index) {
    case 0:
      message.textContent = "Pick your Carrier (occupies 5 spaces)";
      break;
    case 1:
      message.textContent = "Pick your Battleship (4 spaces)";
      break;
    case 2:
      message.textContent = "Pick your Cruiser (3 spaces)";
      break;
    case 3:
      message.textContent = "Pick your Submarine (3 spaces)";
      break;
    case 4:
      message.textContent = "Pick your Carrier Destroyer (2 spaces)";
      break;

    default:
      break;
  }
}

function shipLength(index) {
  let length;
  switch (index) {
    case 0:
      length = 5;
      break;
    case 1:
      length = 4;
      break;
    case 2:
      length = 3;
      break;
    case 3:
      length = 3;
      break;
    case 4:
      length = 2;
      break;

    default:
      break;
  }
  return length;
}

function confirmButton(index) {
  const dialog = document.querySelector("dialog");
  const button = document.querySelector(".submit");

  if (index > 4) {
    button.removeEventListener("click", displayError);
    button.addEventListener("click", () => {
      dialog.close();
    });
  } else {
    button.removeEventListener("click", displayError);
    button.addEventListener("click", displayError);
  }
}

function displayError() {
  const errorMessage = document.querySelector(".dialog-error");
  errorMessage.textContent = "Please select your ship positions";
}

function checkNoShips(row, col, length, player) {
  for (let i = 0; i < length; i++) {
    if (player.gameboard.board[row][col + i].isShip) {
      return false;
    }
  }
  return true;
}

function checkInBounds(row, col, length, player) {
  if (col + length > player.gameboard.size) {
    return false;
  }
  return true;
}

export { initGame };
