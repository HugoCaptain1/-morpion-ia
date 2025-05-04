let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Toi
let gameOver = false;

const status = document.getElementById("status");
const boardDiv = document.getElementById("board");

function drawBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell;
    div.addEventListener("click", () => playerMove(index));
    boardDiv.appendChild(div);
  });
}

function playerMove(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = "X";
  drawBoard();
  if (checkWin("X")) {
    status.textContent = "Tu as gagné ! 🎉";
    gameOver = true;
    return;
  }
  if (board.every(cell => cell !== "")) {
    status.textContent = "Match nul.";
    gameOver = true;
    return;
  }

  setTimeout(aiMove, 300);
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = "O";
  drawBoard();

  if (checkWin("O")) {
    status.textContent = "L'IA a gagné ! 🤖";
    gameOver = true;
    return;
  }
  if (board.every(cell => cell !== "")) {
    status.textContent = "Match nul.";
    gameOver = true;
  }
}

function minimax(board, depth, isMaximizing) {
  if (checkWin("O")) return 10 - depth;
  if (checkWin("X")) return depth - 10;
  if (board.every(cell => cell !== "")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWin(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => board[i] === player));
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  status.textContent = "";
  drawBoard();
}

drawBoard();
