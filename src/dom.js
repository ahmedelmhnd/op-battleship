import Player from "./player";
import Ship from "./ship";

function initGame(size) {
  const player = new Player(size, "Human", ".board-2");
  const computer = new Player(size, "Computer", ".board-1");
  pickShips(computer);
  randomShips(player);



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
  directionButton();
}

function pickDialog(computer, shipIndex) {
  const dialog = document.querySelector("dialog");
  const board = document.querySelector(".board-0");
  board.innerHTML = "";
  pickMessage(shipIndex);
  confirmButton(shipIndex, computer);

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
    const direction = document.querySelector(".ship-direction").textContent;
    const ship = new Ship(shipLength(index), direction);

    if (
      checkInBounds(
        Number(cellDiv.id[1]),
        Number(cellDiv.id[2]),
        ship.length,
        computer,
        ship.direction,
      )
    ) {
      if (
        checkNoShips(
          Number(cellDiv.id[1]),
          Number(cellDiv.id[2]),
          ship.length,
          computer,
          ship.direction,
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

    case 5:
      message.textContent = "You can Submit now! :)";
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

function confirmButton(index, computer) {
  const dialog = document.querySelector("dialog");
  const button = document.querySelector(".submit");

  if (index > 4) {
    button.removeEventListener("click", displayError);
    button.addEventListener("click", () => {
      dialog.close();
      displayBoard(computer);
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

function checkNoShips(row, col, length, player, direction) {
  if (direction == "Vertical") {
    for (let i = 0; i < length; i++) {
      if (player.gameboard.board[row + i][col].isShip) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      if (player.gameboard.board[row][col + i].isShip) {
        return false;
      }
    }
  }

  return true;
}

function checkInBounds(row, col, length, player, direction) {
  if (direction == "Vertical") {
    if (row + length > player.gameboard.size) {
      return false;
    }
  } else {
    if (col + length > player.gameboard.size) {
      return false;
    }
  }

  return true;
}

function directionButton() {
  const button = document.querySelector(".ship-direction");

  button.addEventListener("click", () => {
    if (button.textContent == "Horizontal") {
      button.textContent = "Vertical";
    } else {
      button.textContent = "Horizontal";
    }
  });
}

function randomShips(player) {
  let index = 0;
  while (index < 5) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let dir = Math.floor(Math.random() * 2);
    let direction;
    if (dir === 0) {
      direction = "Horizontal";
    } else {
      direction = "Vertical";
    }

    const ship = new Ship(shipLength(index), direction);

    if (checkInBounds(row, col, ship.length, player, direction)) {
      if (checkNoShips(row, col, ship.length, player, direction)) {
        player.gameboard.addShip(row, col, ship);
        index++;
      }
    }
  }
}

export { initGame };
