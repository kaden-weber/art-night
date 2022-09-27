// radians = (Math.PI / 180) * degrees;

// Calculates y position from x
function calcSineY(x, h, yOffset, f, w) {
    // h is the amplitude of the wave
    // x is the current x value we get every time interval
    // 2 * PI is the length of one cycle (full circumference)
    // f/w is the frequency fraction
    return yOffset + h - h * Math.sin(x * 2 * Math.PI * (f / w))
}

// function randInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min
// }

class Artist {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private x: number
    private frequency: number // How many cycles per canvas width => Frequency: Tone & Speed
    private erasing: Boolean

    constructor() {

        let canvas = document.getElementById("sines") as HTMLCanvasElement
        let context = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        this.canvas = canvas
        this.context = context

        this.start()
    }

    private drawSine(x: number) {
        // erasing everything again
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw sin curve point to point until x
        this.context.beginPath() // Draw a new path
        this.context.strokeStyle = "black" // Pick a color
        for (var i = 0; i < x; i++) {
            // Loop from left side to current x
            var y = calcSineY(i, this.canvas.height / 4, this.canvas.height / 4, this.frequency, this.canvas.width) // Calculate y value from x
            this.context.lineTo(i, y) // Where to draw to
        }
        this.context.stroke() // Draw
    }

    private erase(x) {
        this.context.clearRect(x, 0, 4, this.canvas.height)
    }

    private animation() {

        if (this.erasing) {
            this.erase(this.x)
        } else {

            this.drawSine(this.x) // Call draw function every cycle
        }
        this.x++ // Increment x by 1
        if (this.x > this.canvas.width) {
            this.erasing = !this.erasing
            this.x = 0 // x cannot be more than canvas width, so back to 0
            this.frequency++ // increment frequency for demonstration
        }
        if (this.frequency > 10) {
            this.frequency = 1
        }
    }

    private start() {
        this.context.fillRect(0, 0, 30, 30)
        console.log(this.canvas.width)
        // Define initial value of x position (leftmost side of canvas)
        this.x = 0
        this.frequency = 1
        this.erasing = false
        // Start time interval

        setInterval(() => this.animation(), 5) // Loop every 5 milliseconds
    }
}

new Artist()

// var canvas = document.getElementById("sines") // Grab canvas object
// if (canvas !== null) {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     var ctx = canvas.getContext("2d") // Define canvas context
//     var w = canvas.width // Canvas width => Frequency is relative to this
//     var h = canvas.height / 2 // Canvas height over two => Amplitude: Volume
