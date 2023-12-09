const boardDiv = document.getElementById("boards-div");
const solveAgainButton = document.getElementById("solve-again-button");
const mainDiv = document.getElementById("main");
const errorMessageText = document.getElementById("error-message-text");


function init() {
    const mineFieldGenerator = new MineFieldGenerator(10, 10, 0.15);

    const mineSweeperSolver = new MineSweeperSolver(mineFieldGenerator);

    mineSweeperSolver.startGame(4, 4);

    const stats = mineSweeperSolver.solve();

    if (!stats.isSolved) {
        errorMessageText.style.display = "inline";
    }

    const mineField = mineSweeperSolver.mineField;

    const state = mineSweeperSolver.state;

    boardDiv.appendChild(getFieldDiv(mineField));
    boardDiv.appendChild(getFieldDiv(state));
}

init();

solveAgainButton.addEventListener("click", () => {
    boardDiv.innerHTML = "";
    errorMessageText.style.display = "none";

    init();

});





