// To Control Doom
const DisplayController = (function () {
  // Cache Dom
  const gameBtns = document.querySelectorAll(".game-btn");
  const playerSelectBtns = document.querySelectorAll(".player-select-btn"),
    startGameBtn = document.querySelector(".start-btn"),
    landingPage = document.querySelector(".landing-page"),
    gameBoardWrapper = document.querySelector(".game-board-wrapper"),
    dialog = document.querySelector(".dialog"),
    dialogContent = document.querySelector(".dialog .dialog-content"),
    quitBtn = document.querySelector(".quit-btn"),
    nextRoundBtn = document.querySelector(".next-round-btn"),
    restartBtn = document.querySelector(".restart-btn");

  // Catch Events
  events.on("xWon", handleOver("xWon"));
  events.on("oWon", handleOver("oWon"));
  events.on("draw", handleOver("draw"));
  //function to handle game completion
  function handleOver(outcome) {
    return () => {
      console.log("working");
      dialogContent.innerHTML = /*html*/ `
        <span class="${
          outcome == "draw" ? "hidden" : ""
        }"><img width="25px" src="${
        outcome == "xWon" ? "./assets/icon-x.svg" : "./assets/icon-o.svg"
      }" alt="${outcome}"></span>
        <span>${outcome == `draw` ? `Its a Draw` : `Won the Round`}</span>
      `;
      dialog.classList.remove("hidden");
      clearBoard();
    };
  }
  // function to make dom empty
  const clearBoard = () => {
    gameBtns.forEach((btn) => {
      btn.classList.remove("x-moved");
      btn.classList.remove("o-moved");
    });
  };
  // on click quit btn
  quitBtn.addEventListener("click", () => {
    location.reload();
  });
  // on click next round btn
  nextRoundBtn.addEventListener("click", () => {
    dialog.classList.add("hidden");
  });
  // restart btn on click
  restartBtn.addEventListener("click", () => {
    events.emit("resetClicked");
    clearBoard();
  });
  // Start Game on btn click
  document.addEventListener("DOMContentLoaded", () => {
    landingPage.style.height = landingPage.clientHeight + "px";
    startGameBtn.addEventListener("click", () => {
      landingPage.classList.add("hidden");
      gameBoardWrapper.classList.remove("hidden");
      //   gameBoardWrapper.style.height = gameBoardWrapper.scrollHeight + "px";
    });
  });
  playerSelectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentActive = document.querySelector(".player-selected");
      currentActive?.classList.remove("player-selected");
      btn.classList.add("player-selected");
      events.emit("playerChanged", btn.value);
    });
  });
  // Event Listner to Game Btns
  gameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      events.emit("gameBtnClicked", [btn.dataset.position, btn]);
    });
  });
})();
