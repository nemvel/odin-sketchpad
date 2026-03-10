// default grid side is 750 (50 squares * 15 sq side)
let squaresPerSide = 50;
let squareWidth = 15;

const boardBorderWidth = 1;
const boardWidth = squaresPerSide * squareWidth + 2 * boardBorderWidth;

const board = document.querySelector(".board");
board.style.width = boardWidth + "px";
board.style.height = boardWidth + "px";
board.style.border = boardBorderWidth + "px solid black";

function renderGrid() {
    board.innerHTML = "";

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const square = document.createElement("div");
        square.style.width = squareWidth + "px";
        square.style.height = squareWidth + "px";
        if (gridEnabled) {
            square.style.border = boardBorderWidth + "px solid black";
        } else {
            square.style.border = "none";
        }
        square.style.backgroundColor = "white";

        square.addEventListener('mouseenter', (e) => {
            if (rainbowModeOn) {
                e.target.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            } else {
                e.target.style.background = "black";
            }
        });

        board.appendChild(square);
    }
}

const changeDensityButton = document.querySelector(".changeDensityButton");
changeDensityButton.addEventListener('click', () => changeNumberOfSquares());

function changeNumberOfSquares() {
    const response = prompt("Enter number of squares per board side (max: 100) :", );
    if (response > 0 && response < 101) {
        squaresPerSide = Number(response);
        squareWidth = 750 / squaresPerSide;
        renderGrid();
    } else {
        alert("Invalid number entered.");
    }
}

let gridEnabled = true;
const toggleGridButton = document.querySelector(".toggleGridButton");
toggleGridButton.addEventListener('click', () => toggleGrid());

function toggleGrid() {
    if (gridEnabled) {
        [...board.children].forEach(square => {
            square.style.border = "none";
        });
        gridEnabled = false;
    } else {
        [...board.children].forEach(square => {
            square.style.border = boardBorderWidth + "px solid black";
        });
        gridEnabled = true;
    }
}

let rainbowModeOn = false;

const rainbowModeButton = document.querySelector(".rainbowModeButton");
rainbowModeButton.addEventListener('click', () => {
    rainbowModeOn = !rainbowModeOn;
    rainbowModeButton.classList.toggle("active");
});

const clearBoardButton = document.querySelector(".clearBoardButton");
clearBoardButton.addEventListener('click', () => {
    board.innerHTML = "";
    renderGrid();
});