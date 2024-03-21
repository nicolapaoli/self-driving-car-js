class Controls {
    constructor() {
        this.goForward = false;
        this.goLeft = false;
        this.goRight = false;
        this.goReverse = false;

        this.#addKeyboardListeners()
    }

    #addKeyboardListeners() {
        document.onkeydown = (ev) => {
            switch (ev.key) {
                case "ArrowLeft": this.goLeft = true; break;
                case "ArrowRight": this.goRight = true; break;
                case "ArrowUp": this.goForward = true; break;
                case "ArrowDown": this.goReverse = true; break;
            }
            console.table(this)
        }

        document.onkeyup = (ev) => {
            switch (ev.key) {
                case "ArrowLeft": this.goLeft = false; break;
                case "ArrowRight": this.goRight = false; break;
                case "ArrowUp": this.goForward = false; break;
                case "ArrowDown": this.goRevers = false; break;
            }
            console.table(this)
        }
    }
}