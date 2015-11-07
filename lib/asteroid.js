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
  // simple code for circular objects.
  //  if(this.radius + object.radius > A.Util.distance(this, object)){
  //    return true;
  //  }

  if(2 * this.radius + object.radius > A.Util.distance(this,object)) {
    var lines = [];
    this.points.forEach(function(point, idx){
      if (idx === 0){
        lines.push(A.Util.line(point, this.points[this.points.length - 1]));
      }else{
        lines.push(A.Util.line(point, this.points[idx - 1]));
      }
    }.bind(this));

    var asteroidToObject = A.Util.line(this.pos, object.pos);
    var intercept = {y: null, x: null};
    if (lines.some(function(line){
      // I should fix this, I write positions as arrays everywhere else
      // and am having to convert back
      if (asteroidToObject.slope !== line.slope) {
        intercept.x = (line.yInt - asteroidToObject.yInt) /
          (asteroidToObject.slope - line.slope);
        intercept.y = (intercept.x * line.slope) + (line.yInt);

        if( (intercept.x < line.point1[0] && intercept.x > line.point2[0]) ||
            intercept.x > line.point1[0] && intercept.x < line.point2[0]  ) {
          return (A.Util.distance({pos: [intercept.x, intercept.y]},object) < object.radius);
        }
      }
    }.bind(this))){
      return [intercept.x, intercept.y];
    }
  }
};

A.Asteroid.prototype.blowUp = function(game){
  var CHILDREN = 2;
  if (this.radius > 20) {
    var newVels = [];
    for (var i = 0; i < CHILDREN; i++) {
      newVels[i] = Util.makeNegatives().map(function(val,idx){
        return this.vel[idx] * (1.4 + 0.3 * i) * val;
      }.bind(this));
    }
    var asteroids = [];
    for (var i = 0; i < CHILDREN; i++) {
      asteroids.push(new A.Asteroid(this.pos.slice(), this.radius / 2, newVels[i]));
    }
    // var asteroids = [new A.Asteroid(this.pos.slice(), this.radius / 2, newVels[0]),
    //    new A.Asteroid(this.pos.slice(), this.radius / 2, newVels[1])];
    game.allObjects = game.allObjects.concat(asteroids);
    game.asteroids = game.asteroids.concat(asteroids);
  }
};
