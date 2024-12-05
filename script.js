"use strict";

const GRID_DIMENSION = 560;

let gridSize = 16;

let inkColor = "#000000";
let bgColor = "#f4f4f4";

const mainContainer = document.querySelector("main");
mainContainer.style.width = `${GRID_DIMENSION}px`;
mainContainer.style.height = `${GRID_DIMENSION}px`;
mainContainer.style.backgroundColor = bgColor;

createCells(gridSize);

let isEraserOn = false;
let erasedCells = []; // maintains a stack for erased cells

let isRandomOn = false;

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
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
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
});

const randomButton = document.querySelector(".random button");
randomButton.addEventListener("click", event => {
    isRandomOn = !isRandomOn;
});

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

    isEraserOn = false;
    erasedCells = []; // maintains a stack for erased cells
    
    isRandomOn = false;
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function createCells(dimension) {
    for (let i = 0; i < dimension; i ++) {
        for (let j = 0; j < dimension; j ++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${GRID_DIMENSION / gridSize}px`;
            cell.style.height = `${GRID_DIMENSION / gridSize}px`;
            
            mainContainer.appendChild(cell);
        }
    }
}