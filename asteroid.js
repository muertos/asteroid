const canvas = document.getElementById('asteroid');
const context = canvas.getContext('2d');

// context.scale(1.5,1.5);
//fill background to black
// context.fillStyle = "#000";
// context.fillRect(0, 0, asteroid.width, asteroid.height);

//convert radians to degrees
function radToDeg(angle) {
  return angle * (180/Math.PI);
}

//convert degrees to radians
function degToRad(angle) {
  return angle * (Math.PI/180);
}

function clear() {
  context.fillStyle = "#FFF";
  context.fillRect(0, 0, asteroid.width, asteroid.height);
}

class Line {
  constructor(x1, y1, x2, y2, theta, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.theta = theta;
    this.color = color;
    this.centerx = this.x1 + (this.x2 - this.x1)/2;
    this.centery = this.y1 + (this.y2 - this.y1)/2;
    this.length = Math.sqrt(
      (Math.pow(this.x2, 2) - Math.pow(this.x1, 2)) + (Math.pow(this.y2, 2) - Math.pow(this.y1, 2))
    );
  }

  // length() {
  //   return Math.sqrt(
  //     (Math.pow(this.x2, 2) - Math.pow(this.x1, 2)) + (Math.pow(this.y2, 2) - Math.pow(this.y1, 2))
  //   );
  // }

  // draw() {
  //   context.beginPath();
  //   context.moveTo(this.x1, this.y1);
  //   context.lineTo(this.x2, this.y2);
  //   context.stroke();
  // }

  drawHalfLine(theta) {
    var newx = this.centerx + ((this.length / 2) * Math.cos(degToRad(theta))/2);
    var newy = this.centery - ((this.length / 2) * Math.sin(degToRad(theta))/2);
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(newx, newy);
    context.lineTo(this.centerx, this.centery);
    context.stroke();
  }

  drawFullLine() {
    this.drawHalfLine(this.theta);
    this.drawHalfLine(this.theta + 180);
  }

  drawCircle() {
    for (var theta = 0; theta < 360; theta += 1) {
      this.drawHalfLine(theta);
    }
  }

  rotate(theta) {
    clear();
    this.theta += theta;
    }
} //end Line class

var lw = asteroid.width;
var lh = asteroid.height;
var lineColor = '#F04324';
var line = new Line(lw / 2, lh / 2, lw / 2 + 50, lh / 2 + 50, 0, lineColor);


var dTheta = 0;

document.addEventListener('keydown', event => {
  console.log(event);
  if (event.keyCode == 65) {
    line.rotate(6);
    console.log(line.theta)
  }
  if (event.keyCode == 68) {
    line.rotate(-6);
    console.log(line.theta)
  }
  if (event.keyCode == 37) {
    line.centerx -= 10;
  }
  if (event.keyCode == 39) {
    line.centerx += 10;
  }
  if (event.keyCode == 38) {
    line.centery -= 10;
  }
  if (event.keyCode == 40) {
    line.centery += 10;
  }
  clear();
  line.drawFullLine();
});
