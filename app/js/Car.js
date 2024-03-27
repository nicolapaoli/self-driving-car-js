class Car {
    constructor(x,y,width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.acceleration = 0.2
        this.maxSpeed = 3 // Max possible speed
        this.friction=0.05 // Friction to make it more real

        this.angle = 0 // Rotation angle of the car

        this.sensor = new Sensor(this)
        this.controls = new Controls()
    }


    update(roadBorders) {
        this.#move()
        this.polygon = this.#createPolygon()
        this.sensor.update(roadBorders)
    }

    #createPolygon() {
        // method to find corner points of the car
        const points = []

        // find radius of the car, which is basically half of its hypot
        const rad = Math.hypot(this.width, this.height) / 2
        // find alpha angle between hypot and center
        const alpha = Math.atan2(this.width, this.height)

        // Top right point
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad, //combining the 2 angles
            y: this.y - Math.cos(this.angle - alpha) * rad
        })
        // Point 2
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad, //combining the 2 angles
            y: this.y - Math.cos(this.angle + alpha) * rad
        })
        // Point 3
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad, //combining the 2 angles
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        })

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle) * rad*.7, //combining the 2 angles
            y: this.y - Math.cos(Math.PI + this.angle) * rad*.7
        })

        // Point 4
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad, //combining the 2 angles
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        })

        return points
    }

    #move() {
        // If going forward, speed increases as the acceleration
        if (this.controls.goForward) this.speed += this.acceleration
        // If going reverse, speed decreases as the acceleration
        if (this.controls.goReverse) this.speed -= this.acceleration

        // cap speed to maxSpeed or -maxSpeed / 2
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed
        if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2

        // if speed is greater than zero, friction is negative
        if (this.speed > 0) this.speed -= this.friction
        // if speed is lower than zero, friction is positive
        if (this.speed < 0) this.speed += this.friction

        // Set speed to 0 if it is lower than friction, to preven small updates
        if (Math.abs(this.speed)<this.friction) this.speed=0

        if (this.speed !== 0) {
            // Flip will turn the angle positive or negative depending if going forward or reverse
            const flip = this.speed > 0 ? 1 : -1

            // left and right will affect the rotation angle
            if (this.controls.goLeft) this.angle += 0.03 * flip
            if (this.controls.goRight) this.angle -= 0.03 * flip
        }

        // car moves with speed and rotation angle
        this.x -= Math.sin(this.angle)*this.speed
        this.y -= Math.cos(this.angle)*this.speed
    }

    draw(context) {
        // Draw a rectangle
        // context.save()
        // context.translate(this.x, this.y)
        // context.rotate(-this.angle)
        //
        // context.beginPath()
        // context.rect(
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // )
        // context.fill();

        context.beginPath()
        context.fillStyle = 'red'
        // context.strokeStyle = 'black'

        context.moveTo(this.polygon[0].x, this.polygon[0].y)
        for (let i=1;i < this.polygon.length; i++) {
            context.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        context.lineTo(this.polygon[0].x, this.polygon[0].y)

        context.stroke()
        context.fill()

        this.sensor.draw(context)
    }
}