let canvas = document.getElementById("graph");
let ctx = canvas.getContext("2d");

let points = [];
let t = 0;

function drawAxes() {
    ctx.strokeStyle = "#ccc";

    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(700, 200);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 400);
    ctx.stroke();
}

function drawGraph() {

    let A = document.getElementById("A").value;
    let b = document.getElementById("b").value;
    let w = document.getElementById("w").value;

    let x = A * Math.exp(-b * t) * Math.cos(w * t);

    // store point
    points.push({ t: t, x: x });

    // limit memory
    if (points.length > 500) points.shift();

    ctx.clearRect(0, 0, 700, 400);

    drawAxes();

    // draw curve
    ctx.beginPath();
    ctx.strokeStyle = "blue";

    for (let i = 0; i < points.length; i++) {

        let px = points[i].t * 2;
        let py = 200 - points[i].x;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }

    ctx.stroke();

    t += 1;
    requestAnimationFrame(drawGraph);
}

function reset() {
    points = [];
    t = 0;
}

drawGraph();
