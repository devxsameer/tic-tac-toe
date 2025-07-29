// Main Game Object
const GameBoard = (function () {
  // true for player X and false for player O
  let currentPlayer = "X";
  // main gameBoard Array
  let gameBoard = [];
  const resetGameBoard = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };
  resetGameBoard();
  // cache dom
  // Catching Events
  events.on("gameBtnClicked", makeChoice);
  events.on("playerChanged", setCurrentPlayer);
  events.on("xWon", resetGameBoard);
  events.on("oWon", resetGameBoard);
  events.on("draw", resetGameBoard);
  events.on("resetClicked", resetGameBoard);

  // function to render the gameBoard
  const render = (btn) => {
    btn.classList.add(`${currentPlayer.toLowerCase()}-moved`);
  };
  const checkIfDraw = () => {
    for (let row of gameBoard) {
      for (let element of row) {
        if (element === null) {
          return false;
        }
      }
    }
    return true;
  };
  function setCurrentPlayer(player) {
    currentPlayer = player;
  }
  //   Function to check winning condition
  const checkIfWon = () => {
    for (let i = 0; i < 3; i++) {
      // checking column wise
      if (
        gameBoard[0][i] !== null &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        return true;
      }
      // checking row wise
      if (
        gameBoard[i][0] !== null &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        return true;
      }
    }
    // checking diagonally
    if (
      gameBoard[0][0] !== null &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      return true;
    }
    if (
      gameBoard[0][2] !== null &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
    ) {
      return true;
    }
    return false;
  };
  // To check whether choice is valid
  const isValidChoice = (row, column) => gameBoard[row][column] === null;

  // To make a choice by player
  function makeChoice(choice) {
    [row, column] = choice[0].split("");
    if (isValidChoice(row, column)) {
      gameBoard[row][column] = currentPlayer;
      render(choice[1]);
      if (checkIfWon()) {
        events.emit(currentPlayer == "X" ? "xWon" : "oWon");
      } else if (checkIfDraw()) {
        events.emit("draw");
      } else {
        setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
        events.emit("playerChanged", currentPlayer);
      }
    } else {
      return;
    }
  }
})();
