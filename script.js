"use strict";

const GRID_DIMENSION = 560;

let gridSize = 16;

let inkColor = "#000000";
let bgColor = "#ffffff";
let gridLineColor = getComplementaryColor(bgColor);

const mainContainer = document.querySelector("#sketch-box div");
mainContainer.style.width = `${GRID_DIMENSION}px`;
mainContainer.style.height = `${GRID_DIMENSION}px`;
mainContainer.style.backgroundColor = bgColor;

let isEraserOn = false;
let erasedCells = []; // maintains a stack for erased cells

let isRandomOn = false;
let isGridLinesOn = true;

createCells(gridSize);

const inkColorPicker = document.querySelector("#ink-color-picker");
const bgColorPicker = document.querySelector("#bg-color-picker");

inkColorPicker.value = inkColor;
bgColorPicker.value = bgColor;

inkColorPicker.addEventListener("change", event => {
    inkColor = event.target.value;
});

bgColorPicker.addEventListener("change", event => {
    bgColor = event.target.value;
    mainContainer.style.backgroundColor = bgColor;

    mainContainer.childNodes.forEach(cell => {
        if (isGridLinesOn) {
            cell.style.border = `1px dotted ${getComplementaryColor(bgColor)}`;
        }
    });

    erasedCells.forEach(cell => {
        cell.style.backgroundColor = bgColor;
    });
});

const gridSizeSlider = document.querySelector("#grid-size-slider");
gridSizeSlider.value = gridSize;

gridSizeSlider.addEventListener("input", event => {
    gridSize = event.target.value;

    const gridSizeValueDisplays = document.querySelectorAll(".grid-size-value");
    gridSizeValueDisplays.forEach(display => {
        display.textContent = gridSize;
    });
});

gridSizeSlider.addEventListener("change", event => {
    destroyCells();
    resetSettings();
    createCells(gridSize);
    setCellListeners(mainContainer.childNodes);
});

let isMouseDown = false;

mainContainer.addEventListener("mousedown", event => {
    isMouseDown = true;
});

window.addEventListener("mouseup", event => {
    isMouseDown = false;
});

setCellListeners(mainContainer.childNodes);

const eraserButton = document.querySelector(".eraser button");
eraserButton.addEventListener("click", event => {
    isEraserOn = !isEraserOn;
    if (isEraserOn) {
        event.target.style.backgroundColor = "#ffffff";
        event.target.style.color = "#000000";
        event.target.style.fontWeight = "bold";
    } else {
        event.target.style.backgroundColor = "#464646";
        event.target.style.color = "#ffffff";
        event.target.style.fontWeight = "normal";
    }
});

const randomButton = document.querySelector(".random button");
randomButton.addEventListener("click", event => {
    isRandomOn = !isRandomOn;
    if (isRandomOn) {
        event.target.style.backgroundColor = "#ffffff";
        event.target.style.color = "#000000";
        event.target.style.fontWeight = "bold";
    } else {
        event.target.style.backgroundColor = "#464646";
        event.target.style.color = "#ffffff";
        event.target.style.fontWeight = "normal";
    }
});

const gridLinesButton = document.querySelector(".grid-lines button");
gridLinesButton.addEventListener("click", event => {
    mainContainer.childNodes.forEach(cell => {
        if (!isGridLinesOn) {
            cell.style.border = `1px dotted ${getComplementaryColor(bgColor)}`;
        } else {
            cell.style.border = "none";
        }
    });

    isGridLinesOn = !isGridLinesOn;
    if (isGridLinesOn) {
        event.target.style.backgroundColor = "#ffffff";
        event.target.style.color = "#000000";
        event.target.style.fontWeight = "bold";
    } else {
        event.target.style.backgroundColor = "#464646";
        event.target.style.color = "#ffffff";
        event.target.style.fontWeight = "normal";
    }
});

const clearGridButton = document.querySelector(".clear-grid button");
clearGridButton.addEventListener("click", event => {
    destroyCells();
    createCells(gridSize);
    setCellListeners(mainContainer.childNodes);
    mainContainer.style.backgroundColor = bgColor;
});

function createCells(dimension) {
    for (let i = 0; i < dimension; i ++) {
        for (let j = 0; j < dimension; j ++) {
            const cell = document.createElement("div");
            if (isGridLinesOn) {
                cell.style.border = `1px dotted ${getComplementaryColor(bgColor)}`;
            }
            cell.style.width = `${GRID_DIMENSION / gridSize}px`;
            cell.style.height = `${GRID_DIMENSION / gridSize}px`;
            
            mainContainer.appendChild(cell);
        }
    }
}

function destroyCells() {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
}

function setCellListeners(cells) {
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", event => {
            if (isMouseDown) {
                if (isEraserOn) {
                    cell.style.backgroundColor = bgColor;
                    if (!erasedCells.includes(event.target)) {
                        erasedCells.push(event.target);
                    }
                } else {
                    if (isRandomOn) {
                        cell.style.backgroundColor = generateRandomColor();
                    } else {
                        cell.style.backgroundColor = inkColor;
                    }
                    erasedCells = erasedCells.filter(item => item != event.target);
                }
            }
        });
        cell.addEventListener("mousedown", event => {
            if (isEraserOn) {
                cell.style.backgroundColor = bgColor;
                if (!erasedCells.includes(event.target)) {
                    erasedCells.push(event.target);
                }
            } else {
                if (isRandomOn) {
                    cell.style.backgroundColor = generateRandomColor();
                } else {
                    cell.style.backgroundColor = inkColor;
                }
                erasedCells = erasedCells.filter(item => item != event.target);
            }
        });
    });
}

function resetSettings() {
    inkColor = "#000000";
    bgColor = "#ffffff";

    inkColorPicker.value = inkColor;
    bgColorPicker.value = bgColor;
    mainContainer.style.backgroundColor = bgColor;

    erasedCells = []; // maintains a stack for erased cells
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function getComplementaryColor(hexCode) {
    const rChannel = 255 - Number("0x" + hexCode.slice(1, 3));
    const gChannel = 255 - Number("0x" + hexCode.slice(3, 5));
    const bChannel = 255 - Number("0x" + hexCode.slice(5));

    return `#${rChannel.toString(16)}${gChannel.toString(16)}${bChannel.toString(16)}`;
}