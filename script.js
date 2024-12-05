const mainContainer = document.querySelector("main");

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

mainContainer.addEventListener("mouseup", event => {
    isMouseDown = false;
});

const cells = mainContainer.childNodes;
cells.forEach(cell => {
    cell.addEventListener("mouseenter", event => {
        if (isMouseDown) {
            cell.classList.add("cell-hovered");
        }
    });
    cell.addEventListener("mousedown", event => {
        cell.classList.add("cell-hovered");
    });
});