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