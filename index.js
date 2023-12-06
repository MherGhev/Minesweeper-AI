class MineFieldGenerator {
    constructor(nRows, nCols, mineCellRation) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.mineCellRatio = mineCellRation;
        this.mineField;
    }

    generateMineField = (firstClickI = 0, firstClickJ = 0) => {
        const nCells = this.nRows * this.nCols;

        let nMines = Math.floor(nCells * this.mineCellRatio);

        this.mineField = getMatrix(this.nCols, this.nRows);

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
                this.mineField[i][j] = this.getSurroundingMinesCount(i, j);
            }
        }
    }

    isCellMine = (i, j) => {
        return this.mineField[i]?.[j] == "m";
    }

    getSurroundingMinesCount = (i, j) => {
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
}


function getMatrix(nCol, nRow, fill = 0) {
    const result = [];
    for (let i = 0; i < nCol; i++) {
        result.push([]);
        for (let j = 0; j < nRow; j++) {
            result[i].push(fill)
        }
    }
    return result;
}


const mineFieldGenerator = new MineFieldGenerator(10, 10, 0.1);

const mineField = mineFieldGenerator.generateMineField(4, 4);


const state = getMatrix(mineField.length, mineField[0].length, fill = "u");


function revealCell(mineField, state, i, j) {
    if (isCoordinateOutOfBounds(state, i, j)) return;

    if (state[i][j] != "u") return;

    state[i][j] = mineField[i][j];

    if (mineField[i][j] == 0) {
        revealCell(mineField, state, i - 1, j);
        revealCell(mineField, state, i + 1, j);
        revealCell(mineField, state, i, j - 1);
        revealCell(mineField, state, i, j + 1);
    }
}


function isCoordinateOutOfBounds(matrix, i, j) {
    return i >= matrix.length || i < 0 || j >= matrix[i].length || j < 0;
}



revealCell(mineField, state, 4, 4);



document.body.appendChild(getFieldDiv(mineField));


document.body.appendChild(getFieldDiv(state));
