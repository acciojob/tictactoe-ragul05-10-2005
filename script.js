//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let boardState = Array(9).fill(null);

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  playerForm.style.display = "none";
  gameBoard.style.display = "block";
  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.id) - 1;

    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      return;
    }

    // Switch player
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}
