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
        for (let lane = 0; lane <= this.laneCount; lane++) {
            // Using linear interpolation to calculate the width of each line
            const x = lerp(
                this.left,
                this.right,
                lane / this.laneCount
            )

            if (lane > 0 && lane < this.laneCount) {
                context.setLineDash([20,20])
            } else {
                context.setLineDash([])
            }
            context.beginPath()
            context.moveTo(x, this.top)
            context.lineTo(x, this.bottom)
            context.stroke()

        }
    }
}