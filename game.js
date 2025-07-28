const GameBoard = (function () {
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
  // function to render the gameBoard
  const render = () => {
    for (let i of gameBoard) {
      console.log(i);
    }
  };
  // true for player X and false for player O
  let currentPlayer = true;
  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };
  //   Function to check winning condition
  const checkIfWon = () => {
    // checking row wise
    for (let row of gameBoard) {
      if (row[0] !== null && row[0] === row[1] && row[1] === row[2]) {
        return true;
      }
    }
    // checking column wise
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[0][i] !== null &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
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
  const makeChoice = (choice) => {
    [row, column] = choice.split("");
    if (isValidChoice(row, column)) {
      gameBoard[row][column] = currentPlayer ? "X" : "O";
      render();
      if (checkIfWon()) {
        console.log(`Player ${currentPlayer ? "X" : "O"} has won the game`);
        resetGameBoard();
      } else {
        setCurrentPlayer(!currentPlayer);
      }
    } else {
      console.log("invalid position");
    }
  };
  return { makeChoice };
})();
