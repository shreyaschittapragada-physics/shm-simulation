let t = 0;

let motion = document.getElementById("motion");
let xt = document.getElementById("xt");
let energy = document.getElementById("energy");
let phase = document.getElementById("phase");

let mctx = motion.getContext("2d");
let xctx = xt.getContext("2d");
let ectx = energy.getContext("2d");
let pctx = phase.getContext("2d");

let history = [];

function reset() {
    history = [];
    t = 0;
}

function loop() {

    let A = document.getElementById("A").value;
    let b = document.getElementById("b").value;
    let w = document.getElementById("w").value;

    // SHM model
    let x = A * Math.exp(-b * t) * Math.cos(w * t);
    let v = -A * w * Math.exp(-b * t) * Math.sin(w * t);

    let KE = 0.5 * v * v;
    let PE = 0.5 * x * x;

    history.push({ t, x, v, KE, PE });

    if (history.length > 400) history.shift();

    // ---------------- MOTION ----------------
    mctx.clearRect(0,0,400,200);
    mctx.fillStyle = "cyan";
    mctx.beginPath();
    mctx.arc(200 + x, 100, 8, 0, Math.PI*2);
    mctx.fill();

    // ---------------- x–t GRAPH ----------------
    xctx.clearRect(0,0,400,200);
    xctx.strokeStyle = "lime";
    xctx.beginPath();

    history.forEach((p,i)=>{
        let px = i;
        let py = 100 - p.x;
        if(i===0) xctx.moveTo(px,py);
        else xctx.lineTo(px,py);
    });

    xctx.stroke();

    // ---------------- ENERGY ----------------
    ectx.clearRect(0,0,400,200);

    let scale = 5;

    ectx.fillStyle = "red";
    ectx.fillRect(50, 150-KE*scale, 20, KE*scale);

    ectx.fillStyle = "blue";
    ectx.fillRect(100, 150-PE*scale, 20, PE*scale);

    ectx.fillStyle = "green";
    ectx.fillRect(150, 150-(KE+PE)*scale, 20, (KE+PE)*scale);

    // ---------------- PHASE SPACE ----------------
    pctx.fillStyle = "white";
    pctx.fillRect(200 + x, 100 - v, 2, 2);

    t += 1;
    requestAnimationFrame(loop);
}

loop();
