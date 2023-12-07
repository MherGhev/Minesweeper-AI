function getFieldDiv(mineField) {
    const mineFieldDiv = document.createElement("div");
    mineFieldDiv.classList.add("minefield-div");
    for (let row of mineField) {
        mineFieldDiv.appendChild(getRowDiv(row));
    }
    return mineFieldDiv;
}


function getRowDiv(row) {
    const fieldRowDiv = document.createElement("div");
    fieldRowDiv.classList.add("fieldrow-div");
    for (let cell of row) {
        fieldRowDiv.appendChild(getCellDiv(cell));
    }
    return fieldRowDiv;
}

function getCellDiv(cell) {
    const fieldCellDiv = document.createElement("div");
    fieldCellDiv.classList.add("fieldcell-div");
    if (cell == "m") {
        fieldCellDiv.innerHTML = '<i class="fa-solid fa-bomb"></i>';
    } else if (cell == "f") {
        fieldCellDiv.innerHTML = '<i class="fa-solid fa-flag"></i>';
    } else if (cell == "u") {
        fieldCellDiv.classList.add("uncovered-cell");
    }
    else {
        fieldCellDiv.innerHTML = cell === 0 ? "" : cell;
        fieldCellDiv.classList.add(`cell-${cell}`)
    }
    return fieldCellDiv;
}
