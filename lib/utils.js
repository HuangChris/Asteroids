if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}
  var Util = window.Asteroids.Util = {};

  Util.inherits = function (child, parent) {
    function Surrogate() {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate ();
    child.prototype.constructor = child;
  };

  Util.randomVector = function(){
    var vel = [];
    vel[0] = Math.random();
    vel[1] = Math.random();
    var negatives = Math.random();
    if(negatives < 0.25){
      vel[0] = vel[0] * -1;
    }
    else if(negatives < 0.5){
      vel[1] = vel[1] * -1;
    }
    else if(negatives < 0.75){
      vel[1] = vel[1] * -1;
      vel[0] = vel[0] * -1;
    }
    return vel;
  };

  Util.distance = function(object1, object2) {
    return Math.sqrt(Math.pow((object1.pos[0]- object2.pos[0]), 2) + Math.pow((object1.pos[1] - object2.pos[1]), 2));
  };

  Util.line = function(point1, point2) {
    var m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    return [point1[0],point1[1],m];
  };
