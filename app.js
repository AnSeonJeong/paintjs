const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const remove = document.getElementById("jsremove");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event) {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeChange() {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
}

function handleRemoveCanvas() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);   
    ctx.beginPath();
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "PaintJS[EXPORT]";
    link.click();
}

function handleTouchStart(event) {
    event.preventDefault();
    if(filling) {
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    } else {
        ctx.beginPath();
        startPainting();
    }
}

function handleTouchMove(event) {
    event.preventDefault();
    const touchX =  event.changedTouches[0].pageX;
    const touchY =  event.changedTouches[0].pageY;
    ctx.lineTo(touchX, touchY);
    ctx.stroke();
}

function handleTouchEnd(event) {
    event.preventDefault();
    ctx.closePath();
    stopPainting();
}

if(canvas) {
    // mouse event
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM);
    // touch event
    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchmove", handleTouchMove, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);

}

colors.forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeChange);
}    

if(remove) {
    remove.addEventListener("click", handleRemoveCanvas);
}
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}