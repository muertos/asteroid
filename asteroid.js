const canvas = document.getElementById('asteroid');
const context = canvas.getContext('2d');

//fill background to black
// context.fillStyle = "#000";
// context.fillRect(0, 0, asteroid.width, asteroid.height);

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

  drawHalfLine(pointx, pointy) {
    var dx = this.centerx() - pointx;
    var dy = this.centery() - pointy;
    var theta = Math.abs(Math.atan(dy / dx));
    console.log("Theta: " + theta);

    if (dx > 0) {
      var newx = this.centerx() - ((this.length() / 2) * Math.cos(theta))/2;
    }
    if (dx < 0) {
      var newx = this.centerx() + ((this.length() / 2) * Math.cos(theta))/2;
    }
    if (dy > 0) {
      var newy = this.centery() - ((this.length() / 2) * Math.sin(theta))/2;
    }
    if (dy < 0) {
      var newy = this.centery() + ((this.length() / 2) * Math.sin(theta))/2;
    }

    context.beginPath();
    context.moveTo(newx, newy);
    context.lineTo(this.centerx(), this.centery());
    context.stroke();
  }

  drawCircle() {
    for (var x = 75; x < 101; x++) {
      for (var y = 50; y < 101; y++) {
          this.drawHalfLine(x, y);
      }
    }
  }

  rotate() {

  }
} //end Line class

var line = new Line(75, 50, 100, 100);
line.draw();
//line.drawHalfLine(1, 2);
//line.drawCircle();
