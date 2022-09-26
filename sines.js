const canvas = document.getElementById("sines");
if (canvas.getContext) {
  const context = canvas.getContext("2d");
  context.fillStyle = "rgb(200, 0, 0)";
  context.fillRect(10, 10, 50, 50);
  context.fillStyle = "rgb(0, 0, 200, 0.5)";
  context.fillRect(30, 30, 50, 50);
}
