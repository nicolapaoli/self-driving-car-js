class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x
        this.width = width
        this.laneCount = laneCount

        this.left = x - width / 2
        this.right = x + width / 2

        const infinity = 10000000 // just a big value

        this.top = -infinity
        this.bottom = infinity

        const topLeft = {x: this.left, y: this.top}
        const topRight = {x: this.right, y: this.top}
        const bottomLeft = {x: this.left, y: this.bottom}
        const bottomRight = {x: this.right, y: this.bottom}

        // Defining borders
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    getLaneCenter(laneIndex) {
        if (laneIndex >= this.laneCount){
            laneIndex = this.laneCount - 1
        }
        const laneWidth = this.width / this.laneCount
        return this.left + laneWidth / 2 + laneWidth * laneIndex
    }

    draw(context) {
        context.lineWidth = 5
        context.strokeStyle = 'white'

        // write intermediate lines
        for (let lane = 1; lane <= this.laneCount-1; lane++) {
            // Using linear interpolation to calculate the width of each line
            const x = lerp(
                this.left,
                this.right,
                lane / this.laneCount
            )

            context.setLineDash([20,20])
            context.beginPath()
            context.moveTo(x, this.top)
            context.lineTo(x, this.bottom)
            context.stroke()
        }

        // for each border draw them
        context.setLineDash([])
        this.borders.forEach(border => {
            context.beginPath()
            context.moveTo(border[0].x, border[0].y)
            context.lineTo(border[1].x, border[1].y)
            context.stroke()
        })

    }
}