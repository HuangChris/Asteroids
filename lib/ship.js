if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;
var MAXSPEED = 20;
A.Ship = function(){
  var that = this;
  var options = {
    radius: 10,
    pos: [300,300],
    vel: [0,0],
    color: "#FF0000",
    orientation: Math.PI / 2,
    rotation: 0
  };
  A.MovingObject.call(this,options);
};

A.Util.inherits(A.Ship, A.MovingObject);

A.Ship.prototype.power = function (dir) {
  this.vel[0] += dir * Math.cos(this.orientation);
  this.vel[1] -= dir * Math.sin(this.orientation);
  this.maxSpeed();
};

A.Ship.prototype.maxSpeed = function(){
  var speed = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
  if(speed > MAXSPEED){
    this.vel[0] = this.vel[0] * MAXSPEED / speed;
    this.vel[1] = this.vel[1] * MAXSPEED / speed;
  }
};

A.Ship.prototype.rotate = function (direction) {
  this.rotation = direction * 0.08;
  setInterval(function(){
    if( key.isPressed("left") === false &&
        key.isPressed("right") === false){
      this.rotation = 0;
    }
  }.bind(this),0);
};

A.Ship.prototype.fireBullet = function (game) {
  var bullet = new A.Bullet(this);
  game.bullets.push(bullet);
  game.allObjects.push(bullet);
};

A.Ship.prototype.moveToSafety = function() {
  this.vel = [0,0];
  this.pos = [Math.random()*window.innerWidth*0.9,Math.random()*window.innerHeight*0.9]
}

A.Ship.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // Added a pointer for the ship's direction.
    // ctx.moveTo(this.pos[0],this.pos[1]);
    // ctx.lineTo(this.pos[0]+15*Math.cos(this.orientation),
    ctx.moveTo(this.pos[0]+20*Math.cos(this.orientation),
      this.pos[1]- 20*Math.sin(this.orientation));
    ctx.lineTo(this.pos[0]+10*Math.cos(this.orientation + 2 * Math.PI / 3),
      this.pos[1]- 10*Math.sin(this.orientation + 2 * Math.PI / 3));
    ctx.lineTo(this.pos[0]+7*Math.cos(this.orientation + 2 * Math.PI / 3),
      this.pos[1]- 7*Math.sin(this.orientation + 2 * Math.PI / 3));

    ctx.lineTo(this.pos[0]+7*Math.cos(this.orientation + 4 * Math.PI / 3),
      this.pos[1]- 7*Math.sin(this.orientation + 4 * Math.PI / 3));
    ctx.lineTo(this.pos[0]+10*Math.cos(this.orientation + 4 * Math.PI / 3),
      this.pos[1]- 10*Math.sin(this.orientation + 4 * Math.PI / 3));
    ctx.lineTo(this.pos[0]+20*Math.cos(this.orientation),
      this.pos[1]- 20*Math.sin(this.orientation));
      //turned it into a triangle.
  ctx.stroke();
};
