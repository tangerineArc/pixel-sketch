const mainContainer = document.querySelector("main");

let inkColor = "#000000";
let bgColor = "#ffffff";

let isEraserOn = false;
let erasedCells = []; // maintains a stack for erased cells

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

/* create cells */
for (let i = 0; i < 16; i ++) {
    for (let j = 0; j < 16; j ++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        
        mainContainer.appendChild(cell);
    }
}

let isMouseDown = false;

mainContainer.addEventListener("mousedown", event => {
    isMouseDown = true;
});

window.addEventListener("mouseup", event => {
    isMouseDown = false;
});

const cells = mainContainer.childNodes;
cells.forEach(cell => {
    cell.addEventListener("mouseenter", event => {
        if (isMouseDown) {
            if (isEraserOn) {
                cell.style.backgroundColor = bgColor;
                if (!erasedCells.includes(event.target)) {
                    erasedCells.push(event.target);
                }
            } else {
                cell.style.backgroundColor = inkColor;
                erasedCells = erasedCells.filter(item => item != event.target);
            }
            console.log("draw", erasedCells, bgColor);
        }
    });
    cell.addEventListener("mousedown", event => {
        if (isEraserOn) {
            cell.style.backgroundColor = bgColor;
            if (!erasedCells.includes(event.target)) {
                erasedCells.push(event.target);
            }
        } else {
            cell.style.backgroundColor = inkColor;
            erasedCells = erasedCells.filter(item => item != event.target);
        }
        console.log("draw", erasedCells, bgColor);
    });
});

const eraserButton = document.querySelector(".eraser button");
eraserButton.addEventListener("click", event => {
    isEraserOn = !isEraserOn;
});