class MineFieldGenerator {
    constructor(nRows, nCols, mineCellRatio) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.mineCellRatio = mineCellRatio;
        this.mineField;
    }

    generateMineField = (firstClickI = 0, firstClickJ = 0) => {
        const nCells = this.nRows * this.nCols;

        let nMines = Math.floor(nCells * this.mineCellRatio);

        this.mineField = this.getMatrix(this.nCols, this.nRows);

        this.fillFieldWithMines(nMines, firstClickI, firstClickJ);
        this.fillFieldWithNumber();

        return this.mineField;
    }

    fillFieldWithMines = (nMines, firstClickI, firstClickJ) => {
        let i = 0;
        while (i < nMines) {
            let randI = this.getRandomInt(this.mineField.length);
            let randJ = this.getRandomInt(this.mineField[0].length);

            if (this.areCoordinatesAroundFirstClick(randI, randJ, firstClickI, firstClickJ)) continue;

            if (!this.isCellMine(randI, randJ)) {
                this.mineField[randI][randJ] = "m";
                i++;
            }
        }
    }

    areCoordinatesAroundFirstClick = (coordI, coordJ, firstClickI, firstClickJ) => {
        return (
            (coordI == firstClickI - 1 && coordJ == firstClickJ - 1) ||
            (coordI == firstClickI - 1 && coordJ == firstClickJ) ||
            (coordI == firstClickI - 1 && coordJ == firstClickJ + 1) ||
            (coordI == firstClickI && coordJ == firstClickJ - 1) ||
            (coordI == firstClickI && coordJ == firstClickJ) ||
            (coordI == firstClickI && coordJ == firstClickJ + 1) ||
            (coordI == firstClickI + 1 && coordJ == firstClickJ - 1) ||
            (coordI == firstClickI + 1 && coordJ == firstClickJ) ||
            (coordI == firstClickI + 1 && coordJ == firstClickJ + 1)
        )
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    fillFieldWithNumber = () => {
        for (let i = 0; i < this.mineField.length; i++) {
            for (let j = 0; j < this.mineField[i].length; j++) {
                if (this.isCellMine(i, j)) continue;
                this.mineField[i][j] = this.getSurroundingMineCount(i, j);
            }
        }
    }

    getSurroundingMineCount = (i, j) => {
        let count = 0;

        count += this.isCellMine(i - 1, j) ? 1 : 0;
        count += this.isCellMine(i + 1, j) ? 1 : 0;
        count += this.isCellMine(i, j - 1) ? 1 : 0;
        count += this.isCellMine(i, j + 1) ? 1 : 0;
        count += this.isCellMine(i - 1, j - 1) ? 1 : 0;
        count += this.isCellMine(i - 1, j + 1) ? 1 : 0;
        count += this.isCellMine(i + 1, j - 1) ? 1 : 0;
        count += this.isCellMine(i + 1, j + 1) ? 1 : 0;

        return count;
    }

    isCellMine = (i, j) => {
        return this.mineField[i]?.[j] == "m";
    }

    getMatrix = (nCol, nRow, fill = 0) => {
        const result = [];
        for (let i = 0; i < nCol; i++) {
            result.push([]);
            for (let j = 0; j < nRow; j++) {
                result[i].push(fill)
            }
        }
        return result;
    }
}

class MineSweeperGame {
    constructor(mineFieldGenerator) {
        this.mineFieldGenerator = mineFieldGenerator;
    }

    startGame = (firstClickI, firstClickJ) => {
        this.mineField = mineFieldGenerator.generateMineField(firstClickI, firstClickJ);
        this.state = this.mineFieldGenerator.getMatrix(this.mineField.length, this.mineField[0].length, "u");

        this.revealCell(firstClickI, firstClickJ);
    }

    revealCell(i, j) {
        if (this.isCoordinateOutOfBounds(this.state, i, j)) return;

        if (this.state[i][j] != "u") return;

        if (this.state[i][j] == "f") return;

        this.state[i][j] = this.mineField[i][j];

        if (this.mineField[i][j] == 0) {
            this.revealNeighboringCells(i, j);
        }
    }

    revealNeighboringCells(i, j) {
        this.revealCell(i - 1, j);
        this.revealCell(i + 1, j);
        this.revealCell(i, j - 1);
        this.revealCell(i, j + 1);
        this.revealCell(i - 1, j - 1);
        this.revealCell(i - 1, j + 1);
        this.revealCell(i + 1, j - 1);
        this.revealCell(i + 1, j + 1);
    }

    getSurroundingFlagCount = (i, j) => {
        let count = 0;

        count += this.isCellFlag(i - 1, j) ? 1 : 0;
        count += this.isCellFlag(i + 1, j) ? 1 : 0;
        count += this.isCellFlag(i, j - 1) ? 1 : 0;
        count += this.isCellFlag(i, j + 1) ? 1 : 0;
        count += this.isCellFlag(i - 1, j - 1) ? 1 : 0;
        count += this.isCellFlag(i - 1, j + 1) ? 1 : 0;
        count += this.isCellFlag(i + 1, j - 1) ? 1 : 0;
        count += this.isCellFlag(i + 1, j + 1) ? 1 : 0;

        return count;
    }

    isCellFlag = (i, j) => {
        return this.mineField[i]?.[j] == "f";
    }

    isCoordinateOutOfBounds = (matrix, i, j) => {
        return i >= matrix.length || i < 0 || j >= matrix[i].length || j < 0;
    }
}



const mineFieldGenerator = new MineFieldGenerator(10, 10, 0.1);

const mineSweeperGame = new MineSweeperGame(mineFieldGenerator);

mineSweeperGame.startGame(4, 4);

const mineField = mineSweeperGame.mineField;

const state = mineSweeperGame.state;



const isCellFlag = (state, i, j) => {
    return state[i]?.[j] == "f";
}

const getSurroundingFlagCount = (state, i, j) => {
    let count = 0;

    count += isCellFlag(state, i - 1, j) ? 1 : 0;
    count += isCellFlag(state, i + 1, j) ? 1 : 0;
    count += isCellFlag(state, i, j - 1) ? 1 : 0;
    count += isCellFlag(state, i, j + 1) ? 1 : 0;
    count += isCellFlag(state, i - 1, j - 1) ? 1 : 0;
    count += isCellFlag(state, i - 1, j + 1) ? 1 : 0;
    count += isCellFlag(state, i + 1, j - 1) ? 1 : 0;
    count += isCellFlag(state, i + 1, j + 1) ? 1 : 0;

    return count;
}



function checkViolations(state) {
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state != "f" || state != "u") {
                if (state[i][j] > getSurroundingFlagCount(state, i, j)) return false;
            }
        }
    }
    return true;
}

let a = 1;

function flag(state) {
    a++;
    state = copyMatrix(state);

    if (a > 1) return state;
    
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] == "u" && hasNumericNeighbor(state, i, j)) {
                state[i][j] = "f";
                state = flag(state);
                break;
            }
        }
    }
    return state;
}


function hasNumericNeighbor(matrix, i, j) {
    let result = false;
    result = result || typeof matrix[i - 1]?.[j - 1] == "number"
    result = result || typeof matrix[i - 1]?.[j] == "number"
    result = result || typeof matrix[i - 1]?.[j + 1] == "number"
    result = result || typeof matrix[i]?.[j - 1] == "number"
    result = result || typeof matrix[i]?.[j + 1] == "number"
    result = result || typeof matrix[i + 1]?.[j - 1] == "number"
    result = result || typeof matrix[i + 1]?.[j] == "number"
    result = result || typeof matrix[i + 1]?.[j + 1] == "number"

    return result;
}


function copyMatrix(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++){
        result.push([]);
        for (let j = 0; j < matrix[i].length; j++){
            result[i].push(matrix[i][j])
        }
    }
    return result;
}


let state1 = flag(state)



const mainDiv = document.getElementById("main-div");

mainDiv.appendChild(getFieldDiv(mineField));
mainDiv.appendChild(getFieldDiv(state1));






