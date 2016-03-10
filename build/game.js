"use strict";

if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var STARTASTEROIDS = 5;
var BACKGROUND_STARS = 100;

var Game = window.Asteroids.Game = function (scorePoints) {
  this.scorePoints = scorePoints;
  this.asteroids = [];
  this.ship = new window.Asteroids.Ship();
  this.bullets = [];
  this.allObjects = this.asteroids.concat(this.ship);
  this.lost = false;
  this.canvasEl = document.getElementById("canvas");
  this.context = this.canvasEl.getContext("2d");
  this.level = 0;
  this.stars = this.makeStars();
};

Game.prototype.makeStars = function () {
  var stars = [];
  for (var i = 0; i < BACKGROUND_STARS; i++) {
    stars.push([Math.random(), Math.random()]);
  }
  return stars;
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < STARTASTEROIDS + this.level; i++) {
    var pos = [];
    pos[0] = Math.random() * this.canvasEl.width;
    pos[1] = Math.random() * this.canvasEl.height;
    // pos[0] = Math.random() * ctx.width;
    // pos[1] = Math.random() * ctx.height;

    var asteroid = new window.Asteroids.Asteroid(pos);
    this.asteroids.push(asteroid);
    this.allObjects.push(asteroid);
  }
};

Game.prototype.addMoreAsteroids = function () {
  if (this.asteroids.length === 0) {
    this.level++;
    this.addAsteroids();
  }
};

Game.prototype.removeObject = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].removable) {
      var j = this.allObjects.indexOf(array[i]);
      if (this.allObjects !== array) {
        //so we can pass allObjects to remove explosions.
        array.splice(i, 1);
      }
      this.allObjects.splice(j, 1);
      i = -1;
    }
  }
};

Game.prototype.move = function () {
  this.canvasEl.height = window.innerHeight * 0.83;
  this.canvasEl.width = window.innerWidth * 0.83;
  this.moveObjects();
  this.draw(this.context);
  this.checkCollisions(this.context); // don't need to pass context?  Hell, why would we ever?
  this.addMoreAsteroids();
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 2000, 2000);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  this.stars.forEach(function (pos) {
    ctx.fillStyle = "white";
    ctx.fillRect(pos[0] * window.innerWidth, pos[1] * window.innerHeight, 2, 2);
  });
  this.allObjects.forEach(function (el) {
    el.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects.forEach((function (el) {
    el.move(this);
  }).bind(this));
};

Game.prototype.checkCollisions = function (ctx, interval) {
  this.asteroids.forEach((function (asteroid) {
    if (asteroid.collideWith(this.ship)) {
      this.allObjects.push(new window.Asteroids.Explosion(this.ship.pos));
      this.gameOver();
      this.allObjects.push(new window.Asteroids.Explosion(this.ship.pos)); // It was cool to identify the new location
      // make this blow up the asteroid?
    }
    this.bullets.forEach((function (bullet) {
      var collisionPos = asteroid.collideWith(bullet);
      if (collisionPos) {
        this.scorePoints(1000 / asteroid.radius);
        asteroid.blowUp(this);
        asteroid.removable = true;
        bullet.removable = true;
        this.allObjects.push(new window.Asteroids.Explosion(collisionPos));
      }
    }).bind(this));
    this.removeObject(this.bullets);
  }).bind(this));
  this.removeObject(this.asteroids);
  this.removeObject(this.allObjects); // odd, but to remove explosions while reusing code.
};

Game.prototype.gameOver = function () {

  this.ship.reset();
  var safe = false;
  while (safe) {
    safe = true;
    this.asteroids.forEach((function (asteroid) {
      if (asteroid.collideWith(this.ship)) {
        this.ship.reset();
        safe = false;
      }
    }).bind(this));
  }
  this.lost = true;
};