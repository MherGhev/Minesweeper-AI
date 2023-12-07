// // function solveMineFieldBacktrack(mineField) {
// //     const rows = mineField.length;
// //     const cols = mineField[0].length;
// //     const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

// //     function isSafe(i, j) {
// //         return i >= 0 && i < rows && j >= 0 && j < cols && mineField[i][j] !== "m" && !visited[i][j];
// //     }

// //     function dfs(i, j) {
// //         if (!isSafe(i, j)) {
// //             return false;
// //         }

// //         visited[i][j] = true;

// //         // If the cell is a mine, backtrack
// //         if (mineField[i][j] === "m") {
// //             visited[i][j] = false;
// //             return false;
// //         }

// //         // Explore neighbors
// //         dfs(i - 1, j);
// //         dfs(i + 1, j);
// //         dfs(i, j - 1);
// //         dfs(i, j + 1);

// //         return true;
// //     }

// //     for (let i = 0; i < rows; i++) {
// //         for (let j = 0; j < cols; j++) {
// //             if (!visited[i][j]) {
// //                 if (!dfs(i, j)) {
// //                     // Backtrack and try another path
// //                     visited[i][j] = false;
// //                 }
// //             }
// //         }
// //     }
// //     console.log(visited);
// // }

// function solveMineFieldDFS(mineField) {
//     const rows = mineField.length;
//     const cols = mineField[0].length;
//     const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

//     function isSafe(i, j) {
//         return isNotOutOfBounds(i, j) && mineField[i][j] !== "m" && !visited[i][j];
//     }

//     function isNotOutOfBounds(i, j) {
//         return i >= 0 && i < rows && j >= 0 && j < cols;
//     }
//     function dfs(i, j) {
//         if (!isSafe(i, j)) {
//             return;
//         }

//         visited[i][j] = true;

//         // If the cell is a mine, just return
//         if (mineField[i][j] === "m") {
//             return;
//         }

//         // If the cell has 0 adjacent mines, recursively check its neighbors
//         if (mineField[i][j] === 0) {
//             dfs(i - 1, j);
//             dfs(i + 1, j);
//             dfs(i, j - 1);
//             dfs(i, j + 1);
//         }
//     }

//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (!visited[i][j]) {
//                 dfs(i, j);
//             }
//         }
//     }
//     console.log(visited);
// }


// solveMineFieldDFS(mineField);


// // function solveMineFieldCSP(mineField) {
// //     const rows = mineField.length;
// //     const cols = mineField[0].length;

// //     // Prepare variables and domains
// //     let variables = []; // Array of {i, j} for each cell
// //     let domains = {};  // Object with key as 'i,j' and value as ['m', 'safe']

// //     for (let i = 0; i < rows; i++) {
// //         for (let j = 0; j < cols; j++) {
// //             if (mineField[i][j] === 'u') { // 'u' for unrevealed
// //                 variables.push({ i, j });
// //                 domains[`${i},${j}`] = ['m', 'safe'];
// //             }
// //         }
// //     }

// //     function isConsistent(assignment, varI, varJ) {
// //         // Check if assignment does not violate constraints
// //         // For each numbered cell, count assigned mines and compare with the number
// //         for (let i = 0; i < rows; i++) {
// //             for (let j = 0; j < cols; j++) {
// //                 if (typeof mineField[i][j] === 'number') {
// //                     let mineCount = 0;
// //                     // Check all surrounding cells
// //                     for (let di = -1; di <= 1; di++) {
// //                         for (let dj = -1; dj <= 1; dj++) {
// //                             let ni = i + di, nj = j + dj;
// //                             if (ni === varI && nj === varJ && assignment[`${varI},${varJ}`] === 'm') {
// //                                 mineCount++;
// //                             } else if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && assignment[`${ni},${nj}`] === 'm') {
// //                                 mineCount++;
// //                             }
// //                         }
// //                     }
// //                     if (mineCount > mineField[i][j]) {
// //                         return false; // Too many mines
// //                     }
// //                 }
// //             }
// //         }
// //         return true;
// //     }

// //     function backtrack(assignment) {
// //         if (Object.keys(assignment).length === variables.length) {
// //             return assignment; // All variables assigned
// //         }

// //         let varToAssign = variables.find(v => !assignment.hasOwnProperty(`${v.i},${v.j}`));
// //         for (let value of domains[`${varToAssign.i},${varToAssign.j}`]) {
// //             assignment[`${varToAssign.i},${varToAssign.j}`] = value;
// //             if (isConsistent(assignment, varToAssign.i, varToAssign.j)) {
// //                 let result = backtrack({ ...assignment });
// //                 if (result) {
// //                     return result; // Found a solution
// //                 }
// //             }
// //             delete assignment[`${varToAssign.i},${varToAssign.j}`];
// //         }
// //         return null; // No solution
// //     }

// //     return backtrack({});
// // }