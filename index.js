function generateMineField(nCol = 10, nRow = 10) {
    const nCells = nRow * nCol;
    const mineCellRatio = 0.15;
    let nMines = Math.floor(nCells * mineCellRatio);

    const mineField = getMatrix(nCol, nRow);

    fillFieldWithMines(nMines, mineField);
    fillFieldWithNumber(mineField);

    return mineField;
}

function fillFieldWithMines(nMines, matrix) {
    let i = 0;
    while (i < nMines) {
        let randY = getRandomInt(matrix.length);
        let randX = getRandomInt(matrix[0].length);

        if (matrix[randY][randX] != 8) {
            matrix[randY][randX] = 8;
            i++;
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function fillFieldWithNumber(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 8) continue;
            matrix[i][j] = getSurroundingMinesCount(matrix, i, j);
        }
    }
}

function getSurroundingMinesCount(matrix, i, j) {
    let count = 0;

    count += isCellMine(matrix, i - 1, j) ? 1 : 0;
    count += isCellMine(matrix, i + 1, j) ? 1 : 0;
    count += isCellMine(matrix, i, j - 1) ? 1 : 0;
    count += isCellMine(matrix, i, j + 1) ? 1 : 0;
    count += isCellMine(matrix, i - 1, j - 1) ? 1 : 0;
    count += isCellMine(matrix, i - 1, j + 1) ? 1 : 0;
    count += isCellMine(matrix, i + 1, j - 1) ? 1 : 0;
    count += isCellMine(matrix, i + 1, j + 1) ? 1 : 0;

    return count;  
}

function isCellMine(matrix, i, j) {
    return matrix[i]?.[j] == 8;
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


const mineField = generateMineField();


document.body.appendChild(getFieldDiv(mineField));

