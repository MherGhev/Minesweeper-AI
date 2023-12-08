const boardDiv = document.getElementById("boards-div");
const solveAgainButton = document.getElementById("solve-again-button");
const mainDiv = document.getElementById("main");
const errorMessageText = document.getElementById("error-message-text");


function init() {
    const mineFieldGenerator = new MineFieldGenerator(10, 10, 0.15);

    const mineSweeperSolver = new MineSweeperSolver(mineFieldGenerator);

    mineSweeperSolver.startGame(4, 4);

    const couldSolve = mineSweeperSolver.solve();

    if (!couldSolve) {
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

let countOfSuccess = 0;
let totalCases = 100;


function analyzeSuccessRate() {
    for (let j = 0.01; j < 0.1; j += 0.01) {
        countOfSuccess = 0;
        for (let i = 0; i < totalCases; i++) {
            const mineFieldGenerator = new MineFieldGenerator(16, 16, j);

            const mineSweeperSolver = new MineSweeperSolver(mineFieldGenerator);

            mineSweeperSolver.startGame(4, 4);

            const couldSolve = mineSweeperSolver.solve();
            if (couldSolve) countOfSuccess++;
        }

        console.log(`Success Rate For ${j}: `, countOfSuccess / totalCases)
    }
}




