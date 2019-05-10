var DAMPING = 0.9999;
var GRAVITY = 0.3;
function Particle(x, y) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
  this.bounces = 0;
}
Particle.prototype.integrate = function() {
  var velocity = this.getVelocity();
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocity.x * DAMPING;
  this.y += velocity.y * DAMPING;
};
Particle.prototype.getVelocity = function() {
  return {
    x: this.x - this.oldX,
    y: this.y - this.oldY
  };
};
Particle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
};
Particle.prototype.bounce = function() {
  // bounce at approximate fountain bowl height
  if (this.y > height - (image.height * .67) ) {
    var velocity = this.getVelocity();
    this.oldY = height;
    this.y = this.oldY - velocity.y * 0.3;
    this.bounces++;
  }
};

// If the particle has stopped bouncing, we can delete it
Particle.prototype.canRecycle = function() {
    return (this.bounces > 5);
}

Particle.prototype.draw = function() {
  ctx.strokeStyle = '#0099ff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(this.oldX, this.oldY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
};
var canvas = document.getElementById('fountain');
var image  = document.getElementById("fountainpic");
var ctx = canvas.getContext('2d');
var drops = [];
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
ctx.globalCompositeOperation = 'overlay';
requestAnimationFrame(frame);
function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image,
    canvas.width / 2 - image.width / 2,
            canvas.height - image.height);

  // Create 5 more per frame
  for (var j = 0; j < 5; j++) {
    if (drops.length < 1000) {
      var drop = new Particle(width * 0.5, height - image.height);
      drop.move(Math.random() * 4 - 2, Math.random() * -2 - 15);
      drops.push(drop);
    }
  }
  var i = drops.length;
  while(i--) {
    drops[i].move(0, GRAVITY);
    drops[i].integrate();
    drops[i].bounce();
    drops[i].draw();
    if (drops[i].canRecycle())
    {
      // Remove drops that are on the ground
      drops.splice(i,1);
    }
  }
}
