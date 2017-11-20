const canvas = document.getElementById('asteroid');
const context = canvas.getContext('2d');

//fill background to black
// context.fillStyle = "#000";
// context.fillRect(0, 0, asteroid.width, asteroid.height);

class Line {
  constructor(x1, y1, x2, y2, theta) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.theta = theta;
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

  drawHalfLine(theta, color) {
    var newx = this.centerx() + ((this.length() / 2) * Math.cos(theta))/2;
    var newy = this.centery() - ((this.length() / 2) * Math.sin(theta))/2;
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(newx, newy);
    context.lineTo(this.centerx(), this.centery());
    context.stroke();
  }

  drawCircle() {
    for (var theta = 0; theta < (Math.PI * 2); theta += .1) {
      this.drawHalfLine(theta, '#F04324');
    }
  }

  rotate(theta) {
    //erase current line
    this.drawHalfLine(this.theta, '#FFF');
    //update this.theta
    this.theta += theta;
    this.drawHalfLine(this.theta, '#F04324');
  }
} //end Line class

var line = new Line(75, 50, 100, 100, 0);
// line.draw();
//line.drawHalfLine(Math.PI * (.5))
// line.drawCircle();

var dTheta = 0;

document.addEventListener('keydown', event => {
  console.log(event);
  if (event.keyCode == 37) {
    line.rotate(.1);
    console.log(line.theta)
  }
});
