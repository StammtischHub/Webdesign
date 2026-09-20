let previousTime;

let player;
let barriers;
const keyboard = new Keyboard();

function init() {
    resizeCanvas();
    barriers = new Barriers(canvas, ctx);
    resetGame();

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player = new Player(35, 0, keyboard);
    applyFormSettings();
    barriers.reset();
    player.y = barriers.getStartingGapY(player.height);
}

function update(deltaTime) {
    barriers.update(deltaTime);
    player.update(deltaTime);
    keyboard.endFrame();

    if (barriers.collidesWith(player) || player.y < 0 || player.y >= canvas.height) {
        resetGame();
    }
}

function draw() {
    ctx.fillStyle = '#1A1A1D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    barriers.draw();
    player.draw();
}

function gameLoop(currentTime) {
    if (previousTime === undefined) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }

    const deltaTime = Math.min(((currentTime - previousTime) / 1000), 0.05);
    previousTime = currentTime;

    update(deltaTime);
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    resetGame();
});

const gravityInput = document.querySelector('#gravity');
const flapInput = document.querySelector('#flap');
const gapInput = document.querySelector('#gap');

const gravityOutput = document.querySelector('#gravity-output');
const flapOutput = document.querySelector('#flap-output');
const gapOutput = document.querySelector('#gap-output');

function applyFormSettings() {
    player.gravity = gravityInput.valueAsNumber;
    player.jumpSpeed = flapInput.valueAsNumber;
    barriers.gapHeight = gapInput.valueAsNumber;

    gravityOutput.value = player.gravity;
    flapOutput.value = player.jumpSpeed;
    gapOutput.value = `${barriers.gapHeight}px`;
}

gravityInput.addEventListener('input', applyFormSettings);
flapInput.addEventListener('input', applyFormSettings);
gapInput.addEventListener('input', applyFormSettings);

init();
