function solveMinesweeper(grid, totalMines) {
    const rows = grid.length;
    const cols = grid[0].length;
    let solution = Array.from(Array(rows), () => Array(cols).fill(false));

    function isValid(row, col) {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }

    function countAdjacentFlags(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (isValid(row + i, col + j) && solution[row + i][col + j]) {
                    count++;
                }
            }
        }
        return count;
    }

    function checkConstraints(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isValid(row + i, col + j) && typeof grid[row + i][col + j] === 'number') {
                    if (countAdjacentFlags(row + i, col + j) > grid[row + i][col + j]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function countFlags() {
        return solution.flat().filter(val => val).length;
    }

    function backtrack(row, col) {
        if (countFlags() > totalMines) {
            return false;
        }
        if (row === rows) {
            return countFlags() === totalMines;
        }
        let nextRow = col === cols - 1 ? row + 1 : row;
        let nextCol = col === cols - 1 ? 0 : col + 1;

        // Try placing a flag
        solution[row][col] = true;
        if (checkConstraints(row, col) && backtrack(nextRow, nextCol)) {
            return true;
        }

        // Backtrack: remove the flag and try next cell
        solution[row][col] = false;
        return backtrack(nextRow, nextCol);
    }

    if (backtrack(0, 0)) {
        return solution;
    } else {
        return null; // No solution found
    }
}

// Example usage
let grid = [
    [1, 'u', 'u'],
    ['u', 'u', 'u'],
    ['u', 2, 'u']
];
let totalMines = 3;

console.log(solveMinesweeper(grid, totalMines));