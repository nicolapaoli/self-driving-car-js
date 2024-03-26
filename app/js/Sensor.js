class Sensor {
    constructor(car) {
        this.car = car
        this.rayCount = 30
        this.rayLength = 140
        this.raySpread = Math.PI / 4

        this.rays = []
        this.readings = []
    }

    update(roadBorders) {
        this.#castRays()

        this.readings = []

        for (let r =0; r < this.rays.length; r++) {
            this.readings.push(
                this.#getReading(this.rays[r], roadBorders)
            )
        }
    }

    #getReading(ray, roadBorders) {
        let touches = []

        for (let b=0; b < roadBorders.length; b++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[b][0],
                roadBorders[b][1]
            )
            if (touch) {
                touches.push(touch)
            }
        }

        if (touches.length === 0) {
            return null
        } else {
            const offsets = touches.map(e => e.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(e => e.offset === minOffset)
        }
    }

    #castRays() {
        this.rays = []
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount === 1 ? .5 : i / (this.rayCount - 1)
            ) + this.car.angle

            const start = {
                x: this.car.x,
                y: this.car.y
            }

            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }

            this.rays.push([start, end])
        }
    }

    draw(context) {
        if (this.rays.length < 1) return
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1]
            if (this.readings[i]) {
                end = this.readings[i]
            }
            context.beginPath()
            context.lineWidth = 2
            context.strokeStyle = "yellow"
            context.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            )
            context.lineTo(
                end.x,
                end.y
            )
            context.stroke()

            context.beginPath()
            context.lineWidth = 2
            context.strokeStyle = "black"
            context.moveTo(
                end.x,
                end.y
            )
            context.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            )
            context.stroke()
        }
    }
}