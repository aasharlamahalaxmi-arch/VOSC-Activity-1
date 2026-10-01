const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameOver = false;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        checkGame();
    });
});


function checkGame() {

    let winnerPattern = null;

    for (let pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winnerPattern = pattern;
            break;
        }
    }

    // WINNER

    if (winnerPattern) {

        gameOver = true;

        winnerPattern.forEach(index => {
            cells[index].classList.add("winner");
        });

        if (currentPlayer === "X") {
            xWins++;
            scoreX.textContent = xWins;
        } else {
            oWins++;
            scoreO.textContent = oWins;
        }

        statusText.textContent =
            `🎉 Player ${currentPlayer} wins!`;

        return;
    }

    // DRAW

    if (!board.includes("")) {

        gameOver = true;

        draws++;
        scoreDraw.textContent = draws;

        statusText.textContent = "🤝 It's a draw!";

        return;
    }

    // CHANGE PLAYER

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s turn`;
}


// NEW GAME

restartBtn.addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's turn";
});


// RESET SCORE

resetBtn.addEventListener("click", () => {

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";
    scoreDraw.textContent = "0";

    board = ["", "", "", "", "", "", "", "",];

    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's turn";
});