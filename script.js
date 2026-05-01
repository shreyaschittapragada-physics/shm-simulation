let t = 0;

let motion = document.getElementById("motion");
let mctx = motion.getContext("2d");

let energy = document.getElementById("energy");
let ectx = energy.getContext("2d");

let phase = document.getElementById("phase");
let pctx = phase.getContext("2d");

function draw() {

    let A = document.getElementById("A").value;
    let b = document.getElementById("b").value;
    let w = 0.05;

    // position
    let x = A * Math.exp(-b * t) * Math.cos(w * t);

    // velocity (approx derivative)
    let v = -A * w * Math.exp(-b * t) * Math.sin(w * t);

    // ENERGY
    let KE = 0.5 * v * v;
    let PE = 0.5 * x * x;
    let TE = KE + PE;

    // -----------------------
    // 1. MOTION GRAPH
    // -----------------------
    mctx.clearRect(0,0,600,200);
    mctx.beginPath();
    mctx.arc(300 + x, 100, 10, 0, Math.PI*2);
    mctx.fill();

    // -----------------------
    // 2. ENERGY GRAPH
    // -----------------------
    ectx.clearRect(0,0,600,200);

    ectx.fillStyle = "red";
    ectx.fillRect(50, 150-KE*10, 20, KE*10);

    ectx.fillStyle = "blue";
    ectx.fillRect(100, 150-PE*10, 20, PE*10);

    ectx.fillStyle = "green";
    ectx.fillRect(150, 150-TE*10, 20, TE*10);

    // -----------------------
    // 3. PHASE SPACE
    // -----------------------
    pctx.fillStyle = "black";
    pctx.fillRect(150 + x, 150 - v, 2, 2);

    t += 1;
    requestAnimationFrame(draw);
}

draw();
