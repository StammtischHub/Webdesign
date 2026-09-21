let previousTime;
let lastLiveDataUpdate = 0;
let score = 0;

let player;
let barriers;
const keyboard = new Keyboard();
const collisionSound = new Audio('assets/slap.flac');
collisionSound.preload = 'auto';
const voidSound = new Audio('assets/scream.flac');
voidSound.preload = 'auto';

function init() {
    resizeCanvas();
    barriers = new Barriers(canvas, ctx);
    resetGame();

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    score = 0;
    player = new Player(35, 0, keyboard);
    applyFormSettings();
    barriers.reset();
    player.y = barriers.getStartingGapY(player.height);
    updateLiveData();
}

function update(deltaTime) {
    score += deltaTime * barriers.speed;
    barriers.update(deltaTime);
    player.update(deltaTime);
    keyboard.endFrame();

    if (barriers.collidesWith(player)) {
        collisionSound.currentTime = 0;
        collisionSound.play().catch(error => {
            console.warn('Kollisionssound konnte nicht abgespielt werden:', error);
        });
        resetGame();
    } else if (player.y >= canvas.height) {
        voidSound.currentTime = 0;
        voidSound.play().catch(error => {
            console.warn('Void-Sound konnte nicht abgespielt werden:', error);
        });
        resetGame();
    } else if (player.y < 0) {
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
    if (currentTime - lastLiveDataUpdate >= 100) {
        updateLiveData(deltaTime);
        lastLiveDataUpdate = currentTime;
    }
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
const velocityData = document.querySelector('#velocity-data');
const playerYData = document.querySelector('#player-y-data');
const frameDeltaData = document.querySelector('#frame-delta');
const scoreDisplay = document.querySelector('#score');

function updateLiveData(deltaTime = 0) {
    scoreDisplay.textContent = String(Math.floor(score));
    velocityData.textContent = `${player.velocityY.toFixed(1)}px/s`;
    playerYData.textContent = `${player.y.toFixed(1)}px`;
    frameDeltaData.textContent = `${(deltaTime * 1000).toFixed(1)}ms`;
}

function applyFormSettings() {
    player.gravity = gravityInput.valueAsNumber;
    player.jumpSpeed = flapInput.valueAsNumber;
    barriers.gapHeight = gapInput.valueAsNumber;

    gravityOutput.value = `${player.gravity}px/s²`;
    flapOutput.value = `${player.jumpSpeed}px/s`;
    gapOutput.value = `${barriers.gapHeight}px`;
}

gravityInput.addEventListener('input', applyFormSettings);
flapInput.addEventListener('input', applyFormSettings);
gapInput.addEventListener('input', applyFormSettings);

init();
