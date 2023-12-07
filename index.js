const mainDiv = document.getElementById("main-div");


class MineFieldGenerator {
    constructor(nRows, nCols, mineCellRatio) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.mineCellRatio = mineCellRatio;
        this.mineField;
    }

    generateMineField = (firstClickI = 0, firstClickJ = 0) => {
        const nCells = this.nRows * this.nCols;

        let nMines = this.getMineCount();

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

    getMineCount() {
        return Math.floor(this.nRows * this.nCols * this.mineCellRatio);
    }
}

class MineSweeperGame {
    constructor(mineFieldGenerator) {
        this.mineFieldGenerator = mineFieldGenerator;
        this.flagCount = 0;
        this.mineCount = mineFieldGenerator.getMineCount();
    }

    startGame = (firstClickI, firstClickJ) => {
        this.firstClickI = firstClickI;
        this.firstClickJ = firstClickJ;
        this.mineField = mineFieldGenerator.generateMineField(firstClickI, firstClickJ);
        this.state = this.mineFieldGenerator.getMatrix(this.mineField.length, this.mineField[0].length, "u");
    }

    solve = () => {
        console.log("MineField: ", this.mineField);
        this.revealCell(this.firstClickI, this.firstClickJ);
        this.flagAllPossibleCells();

        let iterationCount = 0;
        while (this.flagCount != this.mineCount) {
        // while (this.isStateSolved()) {
            if (iterationCount++ > 500) return alert("Can't solve this")
            for (let i = 0; i < this.state.length; i++) {
                for (let j = 0; j < this.state[i].length; j++) {
                    if (this.state[i][j] === this.getSurroundingFlagCount(i, j)) {
                        this.revealNeighboringCells(i, j);
                        this.flagAllPossibleCells();
                    }
                }
            }
        }
    }


    revealCell(i, j) {
        if (this.isCoordinateOutOfBounds(this.state, i, j)) return;

        if (this.state[i][j] != "u") return;

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
        return this.state[i]?.[j] == "f";
    }

    isCoordinateOutOfBounds = (matrix, i, j) => {
        return i >= matrix.length || i < 0 || j >= matrix[i].length || j < 0;
    }

    getEmptyNeighbors = (i, j) => {
        let neighbors = [];

        if (this.state[i]?.[j + 1] == 'u') {
            neighbors.push([i, j + 1]);
        }
        if (this.state[i]?.[j - 1] == 'u') {
            neighbors.push([i, j - 1]);
        }
        if (this.state[i - 1]?.[j + 1] == 'u') {
            neighbors.push([i - 1, j + 1]);
        }
        if (this.state[i - 1]?.[j] == 'u') {
            neighbors.push([i - 1, j]);
        }
        if (this.state[i - 1]?.[j - 1] == 'u') {
            neighbors.push([i - 1, j - 1]);
        }
        if (this.state[i + 1]?.[j + 1] == 'u') {
            neighbors.push([i + 1, j + 1]);
        }
        if (this.state[i + 1]?.[j] == 'u') {
            neighbors.push([i + 1, j]);
        }
        if (this.state[i + 1]?.[j - 1] == 'u') {
            neighbors.push([i + 1, j - 1]);
        }
        return neighbors;
    }


    flagCellIfPossible = (i, j) => {
        let emptyNeighbors = this.getEmptyNeighbors(i, j);
        let flagCount = this.getSurroundingFlagCount(i, j);

        if (this.state[i][j] == emptyNeighbors.length + flagCount) {
            for (let i = 0; i < emptyNeighbors.length; i++) {
                this.state[emptyNeighbors[i][0]][emptyNeighbors[i][1]] = "f";
                this.flagCount++;
            }
        }
        return this.state;
    }

    flagAllPossibleCells = () => {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                this.state = this.flagCellIfPossible(i, j);
            }
        }
    }

    isStateSolved() {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] == "u") return false;
            }
        }
        return true;
    }
}



const mineFieldGenerator = new MineFieldGenerator(10, 10, 0.1);

const mineSweeperGame = new MineSweeperGame(mineFieldGenerator);

mineSweeperGame.startGame(4, 4);

mineSweeperGame.solve();

const mineField = mineSweeperGame.mineField;

const state = mineSweeperGame.state;

mainDiv.appendChild(getFieldDiv(mineField));
mainDiv.appendChild(getFieldDiv(state));

