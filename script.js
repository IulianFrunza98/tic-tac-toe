// DOM ELEMENTS AND CONDITIONS

const cells = document.querySelectorAll(".cell");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const statusText = document.querySelector("#status-text");

const winConditions = [
  ["0", "1", "2"],
  ["0", "3", "6"],
  ["0", "4", "8"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["2", "4", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// FUNCTIONS

function startGame() {
  running = true;
  cells.forEach((cell) => cell.addEventListener("click", handleCellsClick));
  statusText.textContent = `${currentPlayer}'s turn`;
}

function handleCellsClick() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCells(this, cellIndex);
  checkWinner();
}

function updateCells(cell, index) {
  options[index] = currentPlayer;

  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "0" : "X";

  statusText.textContent = `${currentPlayer}'s turn.`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer}'s wins`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = false;

  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `${currentPlayer}'s turn`;
}

// EVENT LISTENERS

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
