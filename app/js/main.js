const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = 200

const context = canvas.getContext("2d")
const road = new Road(canvas.width / 2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50)
car.draw(context)

animate()

function animate() {
    car.update()

    canvas.height = window.innerHeight
    road.draw(context)
    car.draw(context)
    requestAnimationFrame(animate)
}