const mainContainer = document.querySelector("main");

let inkColor = "#000000";
let bgColor = "#ffffff";

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
});

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

document.addEventListener("mouseup", event => {
    isMouseDown = false;
});

const cells = mainContainer.childNodes;
cells.forEach(cell => {
    cell.addEventListener("mouseenter", event => {
        if (isMouseDown) {
            cell.style.backgroundColor = inkColor;
        }
    });
    cell.addEventListener("mousedown", event => {
        cell.style.backgroundColor = inkColor;
    });
});