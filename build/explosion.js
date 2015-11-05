"use strict";

if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;

A.Explosion = function (pos) {
  this.pos = pos;
  // I put this to set a max distance on bullets, but then used wrap to limit them instead.
  this.radius = 0;
  this.color = "#FFFFFF";
  this.GROWTH_SPEED = 1.5; // so I can adjust these easily later.
  this.MAX_SIZE = 50;
  this.NUM_SPARKS = 5;
  return this; //do I need this or does new Constructor do this by default?
};

// A.Util.inherits(A.Explosion, A.MovingObject);  WE've overwritten the only methods we care about anyways

A.Explosion.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  for (var i = 0; i < this.NUM_SPARKS; i++) {
    var angle = Math.PI * (1 / this.NUM_SPARKS + 2 * i / this.NUM_SPARKS);
    ctx.fillRect(this.pos[0] + this.radius * Math.cos(angle), this.pos[1] + this.radius * Math.sin(angle), 4, 4);
  }
};

A.Explosion.prototype.move = function () {
  this.radius += this.GROWTH_SPEED;
  if (this.radius > this.MAX_SIZE) {
    this.removable = true;
  }
};