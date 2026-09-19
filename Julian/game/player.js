class Player {
    constructor(x, y, keyboard) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.keyboard = keyboard;
        this.velocityY = 0;
        this.gravity = 800;
        this.jumpSpeed = 360;
    }

    update(deltaTime) {
        if (this.keyboard.wasPressed('Space')) {
            this.jump();
        }
        this.fall(deltaTime);
    }

    jump() {
        this.velocityY = -this.jumpSpeed;
    }

    fall(deltaTime) {
        this.y += this.velocityY * deltaTime + 0.5 * this.gravity * deltaTime * deltaTime;
        this.velocityY += this.gravity * deltaTime;
    }

    draw() {
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
