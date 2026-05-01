let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let t = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let A = document.getElementById("amp").value;
    let gamma = document.getElementById("damp").value;

    let omega = 0.05;

    // SHM / damped SHM equation
    let x = A * Math.exp(-gamma * t) * Math.cos(omega * t);

    // center line
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(600, 100);
    ctx.stroke();

    // particle
    ctx.beginPath();
    ctx.arc(300 + x, 100, 10, 0, Math.PI * 2);
    ctx.fill();

    t += 1;
    requestAnimationFrame(draw);
}

draw();
