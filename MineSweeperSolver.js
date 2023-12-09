class MineSweeperSolver {
    constructor(mineFieldGenerator) {
        this.mineFieldGenerator = mineFieldGenerator;
        this.flagCount = 0;
        this.mineCount = mineFieldGenerator.getMineCount();
    }

    startGame = (firstClickI, firstClickJ) => {
        this.firstClickI = firstClickI;
        this.firstClickJ = firstClickJ;
        this.mineField = this.mineFieldGenerator.generateMineField(firstClickI, firstClickJ);
        this.state = this.mineFieldGenerator.getMatrix(this.mineField.length, this.mineField[0].length, "u");
    }

    solve = () => {
        this.revealCell(this.firstClickI, this.firstClickJ);
        this.flagAllPossibleCells();

        let iterationCount = 0;
        while (this.flagCount != this.mineCount) {
            if (iterationCount++ > 10)
                return { isSolved: false, iterationCount };
            for (let i = 0; i < this.state.length; i++) {
                for (let j = 0; j < this.state[i].length; j++) {
                    if (this.state[i][j] === this.getSurroundingFlagCount(i, j)) {
                        this.revealNeighboringCells(i, j);
                        this.flagAllPossibleCells();
                        // this.doubleTile(i, j, this.state) further work
                    }
                }
            }
        }
        return { isSolved: true, iterationCount }
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
                this.flagCell(emptyNeighbors[i][0], emptyNeighbors[i][1]);
            }
        }
        return this.state;
    }

    flagCell = (i, j) => {
        this.state[i][j] = "f";
        this.flagCount++;
    }

    flagAllPossibleCells = () => {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                this.state = this.flagCellIfPossible(i, j);
            }
        }
    }

    isStateSolved = () => {
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] == "u") return false;
            }
        }
        return true;
    }

    // doubleTile = (x, y) => {
    //     let neighbors = this.getEmptyNeighbors(x, y);

    //     if (this.state[x][y] - this.getSurroundingFlagCount(x, y) == 1 &&
    //         neighbors.length == 2 &&
    //         this.getDirectEmptyNeighbors(neighbors[0][0], neighbors[0][1], state).includes(neighbors[1])) {

    //         let firstNeighbors = this.getNumericNeighbors(neighbors[0][0], neighbors[0][1]);
    //         let secondNeighbors = this.getNumericNeighbors(neighbors[1][0], neighbors[1][1]);

    //         let doubleTileNeighbors = []

    //         for (let i = 0; i < firstNeighbors.length; i++) {
    //             if (secondNeighbors.includes(firstNeighbors[i]) && firstNeighbors[i] != [x, y]) {
    //                 doubleTileNeighbors.push(firstNeighbors[i])
    //             }
    //         }

    //         for (let i = 0; i < doubleTileNeighbors.length; i++) {

    //             if (state[doubleTileNeighbors[i][0]][doubleTileNeighbors[i][1]] == this.getEmptyNeighbors().length + this.getSurroundingFlagCount() + 1) {

    //                 let emptyNeighborsToReveal = this.getEmptyNeighbors(doubleTileNeighbors[i][0], doubleTileNeighbors[i][1]);

    //                 emptyNeighborsToReveal = emptyNeighborsToReveal.splice(emptyNeighborsToReveal.indexOf(neighbors[1]), 1);
    //                 emptyNeighborsToReveal = emptyNeighborsToReveal.splice(emptyNeighborsToReveal.indexOf(neighbors[0]), 1);

    //                 for (let j = 0; j < emptyNeighborsToReveal.length; j++) {
    //                     this.flagCell(emptyNeighborsToReveal[j][0], emptyNeighborsToReveal[j][1]);
    //                 }
    //             }
    //         }
    //     }
    // }

    // getNumericNeighbors = (i, j) => {
    //     let neighbors = [];

    //     if (typeof this.state[i]?.[j + 1] == 'number') {
    //         neighbors.push([i, j + 1]);
    //     }
    //     if (typeof this.state[i]?.[j - 1] == 'number') {
    //         neighbors.push([i, j - 1]);
    //     }
    //     if (typeof this.state[i - 1]?.[j + 1] == 'number') {
    //         neighbors.push([i - 1, j + 1]);
    //     }
    //     if (typeof this.state[i - 1]?.[j] == 'number') {
    //         neighbors.push([i - 1, j]);
    //     }
    //     if (typeof this.state[i - 1]?.[j - 1] == 'number') {
    //         neighbors.push([i - 1, j - 1]);
    //     }
    //     if (typeof this.state[i + 1]?.[j + 1] == 'number') {
    //         neighbors.push([i + 1, j + 1]);
    //     }
    //     if (typeof this.state[i + 1]?.[j] == 'number') {
    //         neighbors.push([i + 1, j]);
    //     }
    //     if (typeof this.state[i + 1]?.[j - 1] == 'number') {
    //         neighbors.push([i + 1, j - 1]);
    //     }
    //     return neighbors;
    // }

    // getDirectEmptyNeighbors = (i, j) => {
    //     let neighbors = [];

    //     if (this.state[i]?.[j + 1] == 'u') {
    //         neighbors.push([i, j + 1]);
    //     }
    //     if (this.state[i]?.[j - 1] == 'u') {
    //         neighbors.push([i, j - 1]);
    //     }
    //     if (this.state[i + 1]?.[j] == 'u') {
    //         neighbors.push([i, j - 1]);
    //     }
    //     if (this.state[i - 1]?.[j] == 'u') {
    //         neighbors.push([i, j - 1]);
    //     }
    //     return neighbors;
    // }
}
