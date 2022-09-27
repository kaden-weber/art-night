// radians = (Math.PI / 180) * degrees;

var c = document.getElementById("sines"); // Grab canvas object
var ctx = c.getContext("2d"); // Define canvas context
var w = c.width; // Canvas width => Frequency is relative to this
var h = c.height / 2; // Canvas height over two => Amplitude: Volume
var f = 1; // How many cycles per canvas width => Frequency: Tone & Speed

// Calculates y position from x
function calcSineY(x) {
    // h is the amplitude of the wave
    // x is the current x value we get every time interval
    // 2 * PI is the length of one cycle (full circumference)
    // f/w is the frequency fraction
    return h - h * Math.sin(x * 2 * Math.PI * (f / w));
}

function drawSine(x) {
    ctx.clearRect(0, 0, w, h * 2);
    // draw sin curve point to point until x
    ctx.beginPath(); // Draw a new path
    ctx.strokeStyle = "black"; // Pick a color
    for (var i = 0; i < x; i++) {
        // Loop from left side to current x
        var y = calcSineY(i); // Calculate y value from x
        ctx.lineTo(i, y); // Where to draw to
    }
    ctx.stroke(); // Draw
}

// Define initial value of x positiom (leftmost side of canvas)
var x = 0;
// Start time interval
var interval = setInterval(function () {
    drawSine(x); // Call draw function every cycle
    x++; // Increment x by 1
    if (x > w) {
        x = 0; // x cannot be more than canvas width, so back to 0
        f++; // increment frequency for demonstration
    }
    if (f > 10) {
        f = 1;
    }
}, 10); // Loop every 10 milliseconds
