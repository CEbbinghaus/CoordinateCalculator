const $ = document.querySelector.bind(document);

/**
 * @type {HTMLInputElement}
 */
var input;
/**
 * @type {HTMLCanvasElement}
 */
var canvas;
/**
 * @type {CanvasRenderingContext2D}
 */
var context;

let width = 0, height = 0;

function resize(){
    width = canvas.width = canvas.clientWidth;
    height = canvas.height = canvas.clientHeight;
}

function handleInput(event){
    input.setCustomValidity("")

    const {value, error} = GetRadFromString(input.value.toLowerCase());

    if(error != null && value != 0){
        console.error(error);
        input.setCustomValidity(error);
        return;
    }

    rad = value;

    console.log(value);
}

window.onresize = resize;

window.onload = function(){
    canvas = $("canvas");
    context = canvas.getContext("2d");
    resize();

    input = $("input");

    input.oninput = handleInput;

    Render(0);
}

let lastTime = 0;

let DeltaTime = 0;

var rad = 0;

const margin = 20;

/**
 * Render step that calculates everything
 * @param {number} currentTime 
 */
function Render(currentTime){

    //Delta time calculations
    DeltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    context.clearRect(0, 0, width, height);

    // rad += DeltaTime;

    const lesser = width < height ? width : height;

    const marginedHalfLesser = lesser / 2 - margin;

    const extraMargin = 7;
    
    const halfHeight = height / 2;
    const halfWidth = width / 2;

    //Rotate the 0 point 90 deg backwards to line it up with Degrees
    const ajustedRad = rad - Math.PI / 2;

    context.lineWidth = 5;

    context.save();
    context.strokeStyle = "#eee"

    context.beginPath();

    context.arc(halfWidth, halfHeight, marginedHalfLesser, 0, Math.PI * 2);

    context.moveTo(halfWidth, halfHeight - marginedHalfLesser - extraMargin);
    context.lineTo(halfWidth, halfHeight + marginedHalfLesser + extraMargin);

    context.moveTo(halfWidth - marginedHalfLesser - extraMargin, halfHeight);
    context.lineTo(halfWidth + marginedHalfLesser + extraMargin, halfHeight);

    context.stroke();

    context.restore();

    context.strokeStyle = "#faa";
    
    context.beginPath();

    context.lineCap = "round"

    context.moveTo(halfWidth, halfHeight);
    let xpos = Math.cos(ajustedRad) * (marginedHalfLesser + extraMargin);
    let ypos = Math.sin(ajustedRad) * (marginedHalfLesser + extraMargin);

    context.lineTo(halfWidth + xpos, halfHeight + ypos);
    context.stroke();

    
    window.requestAnimationFrame(Render.bind(this));
}