class Car {
    constructor(x,y,width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.controls = new Controls()
    }


    update() {
        if (this.controls.goForward) this.y -=2
        else if (this.controls.goReverse) this.y +=2
    }

    draw(context) {
        context.beginPath()
        context.rect(
            this.x - this.width / 2, // center horizontally
            this.y - this.height / 2, // center vertically
            this.width,
            this.height
        )
        context.fill();
    }
}