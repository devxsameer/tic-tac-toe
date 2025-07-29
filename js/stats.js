// To Control Stats
const Stats = (function () {
  let xWins = 0,
    oWins = 0,
    draws = 0;
  // Cache Dom
  const scoreX = document.querySelector(".score-x span"),
    scoreO = document.querySelector(".score-o span"),
    scoreDraws = document.querySelector(".draws span"),
    gameBoardWrapper = document.querySelector(".game-board-wrapper");

  render();
  // to render in doom
  function render() {
    scoreX.innerText = xWins;
    scoreO.innerText = oWins;
    scoreDraws.innerText = draws;
  }
  // running functions on events
  events.on("xWon", updateXScore);
  events.on("oWon", updateOScore);
  events.on("draw", updateDraws);
  events.on("playerChanged", updateCurrentPlayer);
  // functions to update scores
  function updateXScore() {
    xWins++;
    render();
  }
  function updateOScore() {
    oWins++;
    render();
  }
  function updateDraws() {
    draws++;
    render();
  }
  function updateCurrentPlayer(currentPlayer) {
    if (currentPlayer == "O") {
      gameBoardWrapper.classList.add("o-playing");
    } else {
      gameBoardWrapper.classList.remove("o-playing");
    }
  }
})();
