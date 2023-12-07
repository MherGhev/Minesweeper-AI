// class MineFieldSolver {
//     constructor(initialState) {
//         this.state = initialState;
//     }

//     solve = () => {
//         for (let i = 0; i < state.length; i++) {
//             for (let j = 0; j < state[i].length; j++) {
//                 if (state[i][j] == "u") continue;
//                 let tileValue = +state[i][j];
//                 if (tileValue === this.getSurroundingUnknownTileCount(i, j)) {
//                     // flag mine, 
//                 }
//             }
//         }
//     }

//     getSurroundingUnknownTileCount = (i, j) => {
//         let count = 0;

//         count += this.isCellUnknown(i - 1, j) ? 1 : 0;
//         count += this.isCellUnknown(i + 1, j) ? 1 : 0;
//         count += this.isCellUnknown(i, j - 1) ? 1 : 0;
//         count += this.isCellUnknown(i, j + 1) ? 1 : 0;
//         count += this.isCellUnknown(i - 1, j - 1) ? 1 : 0;
//         count += this.isCellUnknown(i - 1, j + 1) ? 1 : 0;
//         count += this.isCellUnknown(i + 1, j - 1) ? 1 : 0;
//         count += this.isCellUnknown(i + 1, j + 1) ? 1 : 0;

//         return count;
//     }

//     isCellUnknown = (i, j) => {
//         return this.state[i]?.[j] == "u";
//     }

//     flagSurroundingMines = (i, j) => {
//         this.flagCell(i - 1, j - 1);
//         this.flagCell(i - 1, j);
//         this.flagCell(i - 1, j + 1);
//         this.flagCell(i, j - 1);
//         this.flagCell(i, j + 1);
//         this.flagCell(i + 1, j - 1);
//         this.flagCell(i + 1, j);
//         this.flagCell(i + 1, j + 1);
//     }

//     flagCell = (i, j) => {
//         this.state[i]?.[j] = this.isCellUnknown(i, j) ? "f" : this.state[i]?.[j];
//     }
// }