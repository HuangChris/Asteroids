if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;
var MAXSPEED = 20;
A.Ship = function(){
  var that = this;
  options = {
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
      window.game.ship.rotation = 0;
    }
  },0);
};

A.Ship.prototype.fireBullet = function (game) {
  var bullet = new A.Bullet(this);
  game.bullets.push(bullet);
  game.allObjects.push(bullet);
};

A.Ship.prototype.draw = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    // Added a pointer for the ship's direction.
    ctx.moveTo(this.pos[0],this.pos[1]);
    ctx.lineTo(this.pos[0]+15*Math.cos(this.orientation),
      this.pos[1]- 15*Math.sin(this.orientation));
  ctx.stroke();
};
