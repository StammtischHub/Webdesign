class Keyboard {
    constructor(target = window) {
        this.pressedKeys = new Set();
        this.justPressedKeys = new Set();

        target.addEventListener('keydown', event => {
            if (!event.repeat) {
                this.justPressedKeys.add(event.code);
            }

            this.pressedKeys.add(event.code);
        });

        target.addEventListener('keyup', event => {
            this.pressedKeys.delete(event.code);
        });

        target.addEventListener('blur', () => {
            this.pressedKeys.clear();
            this.justPressedKeys.clear();
        });
    }

    isPressed(key) {
        return this.pressedKeys.has(key);
    }

    wasPressed(key) {
        return this.justPressedKeys.has(key);
    }

    endFrame() {
        this.justPressedKeys.clear();
    }
}
