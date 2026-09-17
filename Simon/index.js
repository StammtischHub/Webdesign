let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector("header");

window.addEventListener("load", (event) => {
    drawCanvas();
});

function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener("scroll", () => {
   if (!ticking) {
       requestAnimationFrame(updateHeader);
       ticking = true;
   }
});

function drawCanvas() {
    const canvas = document.getElementById("vehicle-setup");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#3B3B3B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.setLineDash([60, 25]);
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 600);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#F2F0EA"
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 600);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#F2F0EA";
    ctx.stroke();

    drawFiretruck(ctx, 250, 110, "V-TLF");
    ctx.save();

    const centerX = 255 + 25 / 2;
    const centerY = 215 + 50 / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-centerX, -centerY);

    ctx.strokeStyle = "#0E008F";
    ctx.fillStyle = "#0E008F"
    ctx.beginPath();
    ctx.roundRect(255, 215, 25, 50, 5);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#F2F0EA";
    ctx.font = "15px Quantico";
    ctx.fillText("VU", 255, 250)

    ctx.restore();
    drawFiretruck(ctx, 250, 310, "HLF");
    drawFiretruck(ctx, 250, 410, "RW");

    ctx.beginPath();
    ctx.setLineDash([10, 8]);
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FFEB3B";
    ctx.lineWidth = 3;

    ctx.moveTo(270, 0);
    ctx.bezierCurveTo(
        230, 30,
        215, 60,
        218, 100
    );
    ctx.bezierCurveTo(
        221, 140,
        218, 250,
        220, 320
    );
    ctx.bezierCurveTo(
        222, 390,
        218, 480,
        225, 540
    );
    ctx.bezierCurveTo(
        230, 570,
        250, 590,
        280, 600
    );
    ctx.stroke();

}

function drawFiretruck(ctx, x, y, name) {
    ctx.strokeStyle = "#f00";
    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.roundRect(x, y, 40, 60, 6);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#00f";
    ctx.fillStyle = "#00f";
    ctx.arc(x + 5, y + 5, 2.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 35, y + 5, 2.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#F2F0EA"
    ctx.font = "15px Quantico";
    ctx.fillText(name, x, y + 50);
}