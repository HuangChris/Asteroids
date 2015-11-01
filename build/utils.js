'use strict';

if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}
var Util = window.Asteroids.Util = {};

Util.BASE_SPEED = 0.5;

Util.inherits = function (child, parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();
  child.prototype.constructor = child;
};

Util.randomVector = function () {
  var vel = [];
  for (var i = 0; i < 2; i++) {
    vel[i] = Math.random() + Util.BASE_SPEED;
  }

  Util.makeNegatives().forEach(function (val, idx) {
    vel[idx] = vel[idx] * val;
  });
  return vel;
};

Util.makeNegatives = function () {
  // poorly named, returns 1 of 4 possible direction multipliers.
  var negatives = Math.random();
  if (negatives < 0.25) {
    return [-1, 1];
  } else if (negatives < 0.5) {
    return [1, -1];
  } else if (negatives < 0.5) {
    return [-1, -1];
  } else {
    return [1, 1];
  }
};

Util.distance = function (object1, object2) {
  return Math.sqrt(Math.pow(object1.pos[0] - object2.pos[0], 2) + Math.pow(object1.pos[1] - object2.pos[1], 2));
};

Util.line = function (point1, point2) {
  var m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
  return { slope: m, yInt: point1[1] - m * point1[0],
    point1: point1, point2: point2 };
};