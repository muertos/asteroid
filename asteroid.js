const canvas = document.getElementById('asteroid');
const context = canvas.getContext('2d');

//fill background to black
// context.fillStyle = "#000";
// context.fillRect(0, 0, asteroid.width, asteroid.height);


// function drawLine(x1, y1, x2, y2) {
//   context.beginPath();
//   context.moveTo(x1, y1);
//   context.lineTo(x2, y2);
//   context.stroke();
//   var length = Math.sqrt(
//     (Math.pow(x2, 2) - Math.pow(x1, 2)) + (Math.pow(y2, 2) - Math.pow(y1, 2))
//   );
//   console.log(length);
//   var center = {x:0, y:0};
//   center.x = (x1 + (x2 - x1)/2);
//   center.y = (y1 + (y2 - y1)/2);
//
//   console.log(center.x);
//   console.log(center.y);
// }

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  centerx() {
    return (this.x1 + (this.x2 - this.x1)/2);
  }

  centery() {
    return (this.y1 + (this.y2 - this.y1)/2);
  }

  length() {
    return Math.sqrt(
      (Math.pow(this.x2, 2) - Math.pow(this.x1, 2)) + (Math.pow(this.y2, 2) - Math.pow(this.y1, 2))
    );
  }

  draw() {
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
  }
}

function drawHalfLine(pointx, pointy, line) {
  dx = line.centerx() - pointx;
  dy = line.centery() - pointy;


  // h = Math.sqrt(
  //   (Math.pow(dx, 2) + Math.pow(dy, 2))
  // );
  // ratio = h / (line.length() / 2);
  // console.log(ratio);

  theta = Math.abs(Math.atan(dy / dx));
  console.log("Theta: " + theta);

  if (dx > 0) {
    var newx = line.centerx() - ((line.length() / 2) * Math.cos(theta))/2;
  }
  if (dx < 0) {
    var newx = line.centerx() + ((line.length() / 2) * Math.cos(theta))/2;
  }
  if (dy > 0) {
    var newy = line.centery() - ((line.length() / 2) * Math.sin(theta))/2;
  }
  if (dy < 0) {
    var newy = line.centery() + ((line.length() / 2) * Math.sin(theta))/2;
  }


  //draw the half length line from the center
  context.beginPath();
  context.moveTo(newx, newy);
  context.lineTo(line.centerx(), line.centery());
  context.stroke();
}

var line = new Line(75, 50, 100, 100);
line.draw();
console.log(line.length());
console.log(line.centerx());
console.log(line.centery());

//draw a circle about the center of the line (resource intensive!)
for (x = 75; x < 101; x++) {
  for (y = 50; y < 101; y++) {
      drawHalfLine(x, y, line);
  }
}

// drawHalfLine(76, 80, line);
// drawHalfLine(90, 90, line);
