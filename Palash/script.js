function start() {
    const canvas = document.getElementById('raceCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let carX = 80;

    function draw() {
        ctx.fillStyle = '#0b0f12';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#222b31';
        ctx.fillRect(0, 40, canvas.width, 120);

        ctx.strokeStyle = '#f7f7f5';
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 15]);
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(canvas.width, 100);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ed1b24';
        ctx.fillRect(carX, 86, 70, 28);
        ctx.fillRect(carX + 70, 92, 25, 16);
        ctx.fillRect(carX + 90, 82, 6, 36);
        ctx.fillRect(carX - 8, 80, 8, 40);

        ctx.fillStyle = '#05080a';
        ctx.fillRect(carX + 30, 94, 15, 12);

        ctx.beginPath();
        ctx.arc(carX + 15, 76, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(carX + 15, 124, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(carX + 75, 78, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(carX + 75, 122, 7, 0, Math.PI * 2);
        ctx.fill();
    }

    draw();

    canvas.addEventListener('click', function () {
        carX += 45;
        if (carX > canvas.width) {
            carX = -100;
        }
        draw();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
