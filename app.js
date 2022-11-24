const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");

canvas.width = 300;
canvas.height = 300;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// function onMouseDown(event) {
//     startPainting();
// }

// function onMouseUp(event) {
//     stopPainting();
// }

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

// 색 채우기 Fill
function fillCanvas() {
    if (filling) {
        //true
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function preventRightClick(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //내용을 넣을거면 함수를 위에 짜면 됨
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", preventRightClick);
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

const mode = document.getElementById("jsMode");

if (mode) {
    mode.addEventListener("click", modeChange);
}

let filling = false;

function modeChange() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
if (saveBtn) {
    saveBtn.addEventListener("click", downloadIamge);
}

function downloadIamge() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "jspaint";
    link.click();
}
