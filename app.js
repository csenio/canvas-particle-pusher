var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

function getMousePos(canvas, evt) {
  // var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX,
    y: evt.clientY
  };
}

document.addEventListener(
  "mousemove",
  function(evt) {
    var mousePos = getMousePos(canvas, evt);
    mouse.x = mousePos.x;
    mouse.y = mousePos.y;
  },
  false
);

var mouse = {
  x: 0,
  y: 0
};

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.xFixed = x;
  this.yFixed = y;
  this.radius = 1;
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.color = "white";
}

Particle.prototype.draw = function() {
  c.save();
  c.rect(i.x, i.y, 1, 1);
  c.fillStyle = this.color;
};

Particle.prototype.update = function() {
  this.draw();
  this.x += this.xVelocity;
  this.y += this.yVelocity;
};

var square = {
  x: 500,
  y: 150,
  height: 500,
  width: 500,
  color: "white"
};

var particleContainer = [];
var distance = 4;

for (let i = 0; i < square.height / distance; i++) {
  for (let j = 0; j < square.height / distance; j++) {
    particleContainer.push(
      new Particle(square.x + i * distance, square.y + j * distance)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  c.beginPath();

  for (i of particleContainer) {
    let a = mouse.x - i.x;
    let b = mouse.y - i.y;
    let c = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));

    let a2 = i.xFixed - i.x;
    let b2 = i.yFixed - i.y;
    let c2 = Math.sqrt(Math.pow(b2, 2) + Math.pow(a2, 2));

    if (c < 90) {
      i.xVelocity = a / c / -0.3;
      i.yVelocity = b / c / -0.3;
    } else if (90 < c && c < 95) {
      i.xVelocity = (a / c) * -1;
      i.yVelocity = (b / c) * -1;
    } else if (c2 !== 0) {
      i.xVelocity = a2 / c2;
      i.yVelocity = b2 / c2;
    }
    i.update();
  }
  c.fill();

  // outline
  // c.beginPath()
  // c.strokeStyle = square.color
  // c.strokeRect(square.x, square.y,square.height,square.width)
}

animate();
