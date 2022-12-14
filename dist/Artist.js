// radians = (Math.PI / 180) * degrees;
// Calculates y position from x
function calcSineY(x, h, f, canvasWidth, canvasHeight) {
    // h is the amplitude of the wave
    // x is the current x value we get every time interval
    // 2 * PI is the length of one cycle (full circumference)
    // f/w is the frequency fraction
    return (canvasHeight / 2) - h * Math.sin(x * 2 * Math.PI * (f / canvasWidth));
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
class Curve {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
    }
}
class Colors {
    constructor() {
        this.color1 = "#B8602E";
        this.color2 = "#d6632c";
        this.used1Last = false;
    }
    getColor() {
        if (this.used1Last) {
            this.used1Last = false;
            return this.color2;
        }
        else {
            this.used1Last = true;
            return this.color1;
        }
    }
}
class Artist {
    constructor() {
        this.canvas = document.getElementById("sines");
        let context = this.canvas.getContext("2d");
        this.context = context;
        addEventListener('resize', (event) => { this.checkWindowSize(); });
        this.colorPicker = new Colors();
        this.checkWindowSize();
    }
    drawSine(x) {
        // draw sin curve point to point until x
        this.context.beginPath(); // Draw a new path
        this.context.lineWidth = 2.4;
        for (var i = 0; i < x; i++) {
            // Loop from left side to current x
            var y = calcSineY(i, this.currentCurve.amplitude, this.currentCurve.frequency, this.canvas.width, this.canvas.height); // Calculate y value from x
            this.context.lineTo(i, y); // Where to draw to
        }
        this.context.stroke(); // Draw
    }
    erase(x) {
        this.context.clearRect(x, 0, 4, this.canvas.height);
    }
    checkWindowSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawHeight = this.canvas.height / 4;
        this.start();
    }
    determineNextBehavior() {
        if (this.erasing) {
            this.erasing = false;
        }
        else {
            this.lineCount++;
            this.context.strokeStyle = this.colorPicker.getColor();
            this.currentCurve.amplitude = randInt(this.drawHeight / 2, this.drawHeight);
            this.currentCurve.frequency = randInt(10, 80) / 10;
        }
        if (this.lineCount == 2) {
            this.erasing = true;
            this.lineCount = 0;
        }
    }
    animation() {
        if (this.erasing) {
            this.erase(this.x);
        }
        else {
            this.drawSine(this.x); // Call draw function every cycle
        }
        this.x++; // Increment x by 1
        if (this.x > this.canvas.width) {
            this.determineNextBehavior();
            this.x = 0; // reset drawing cursor
        }
    }
    start() {
        // do stateful setup here 
        // Define initial value of x position (leftmost side of canvas)
        this.x = 0;
        this.erasing = false;
        this.lineCount = 0;
        this.currentCurve = new Curve(1, this.drawHeight);
        this.context.strokeStyle = this.colorPicker.getColor();
        // Start time interval
        if (this.currentInterval !== null) {
            clearInterval(this.currentInterval);
        }
        this.currentInterval = setInterval(() => this.animation(), 1); // Loop every 5 milliseconds
    }
}
new Artist();
