if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;

var COLOR = ["#00FF00", "#0000FF", "#C0C0C0", "#FFFF00", "#800080", "#FF00FF"];
var RADIUS = 50;
A.Asteroid = function(pos, radius, vel){
  var that = this;
  var options = {
    pos: pos,
    vel: vel || A.Util.randomVector(),
    radius: radius || RADIUS,
    color: COLOR[Math.floor(Math.random()*COLOR.length)]
  };
  A.MovingObject.call(that, options);
};
A.Util.inherits(A.Asteroid, A.MovingObject);

A.Asteroid.prototype.collideWith = function(object){
   if(this.radius + object.radius > A.Util.distance(this, object)){
     return true;
   }

  //All this crap might be close to something correct...
  //But it might be easier to make the ship and bullets into straight lines.
  //The bullet is small enough we can probably hide the fact that it's a square.

  // if(1.5 * this.radius + object.radius > A.Util.distance(this,object)) {
  //   var lines = [];
  //   this.points.forEach(function(point, idx){
  //     if(idx === 0) {
  //       lines.push(A.Util.line(point,this.points[10]))
  //     } else {
  //       lines.push(A.Util.line(point, this.points[idx - 1]))
  //     }
  //   }.bind(this))
  //
  //   return lines.some(function(line){
  //     var sum = line[2] * line[0] + line[1] + object.pos[0];
  //     var b = -2 * (object.pos[0] + line[2] * sum);
  //     var a = (1 + line[2]*line[2])
  //     var c = Math.pow(object.pos[0],2) + Math.pow(sum, 2)
  //         + Math.pow(object.radius, 2);
  //     return ((-b + Math.sqrt(b*b - 4 * a * c))/(2 * a) ||
  //         (-b - Math.sqrt(b*b - 4 * a * c))/(2 * a) );
  //   });
  // }
};

A.Asteroid.prototype.blowUp = function(game){
  if (this.radius > 20) {
    xVel = this.vel[0];
    yVel = this.vel[1];
    var vel1 = [xVel * -1.5, yVel * -1.5];
    var vel2 = [xVel * 1.5, yVel * 1.5];
    var asteroids = [new A.Asteroid(this.pos.slice(), this.radius / 2, vel1),
       new A.Asteroid(this.pos.slice(), this.radius / 2, vel2)];
    game.allObjects = game.allObjects.concat(asteroids);
    game.asteroids = game.asteroids.concat(asteroids);
  }
    this.color = "#000000";
    this.radius = 0;
    this.pos = [-1,-1];
    this.vel = 0;
};
