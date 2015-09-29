if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;

A.Bullet = function (ship) {
  this.pos = ship.pos.slice();
  this.start_pos = ship.pos.slice();
  this.aim = ship.orientation;
  this.vel = [5*Math.cos(this.aim) + 1.5 * ship.vel[0],
    -5 * Math.sin(this.aim) + 1.5 * ship.vel[1]];
  this.radius = 5;
  this.color = "#FFFFFF";
  return this;
};

A.Util.inherits(A.Bullet, A.MovingObject);
