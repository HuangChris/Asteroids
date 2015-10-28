if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var STARTASTEROIDS = 5;

var Game = window.Asteroids.Game = function (scorePoints) {
  this.scorePoints = scorePoints;
  this.asteroids = [];
  this.ship = new window.Asteroids.Ship();
  this.bullets = [];
  this.allObjects = this.asteroids.concat(this.ship);
  this.lost = false;
  this.canvasEl = document.getElementById("canvas")
  this.context = this.canvasEl.getContext("2d");
  this.canvasEl.height = window.innerHeight * 0.9;
  this.canvasEl.width = window.innerWidth * 0.9;
};

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < STARTASTEROIDS; i++) {
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

Game.prototype.addMoreAsteroids = function(){
  if(this.asteroids.length === 0){
  STARTASTEROIDS++;
  this.addAsteroids();
  }
};

Game.prototype.removeBullet = function(bullet) {
  var idx = this.bullets.indexOf(bullet)
  this.bullets.splice(idx, 1);
  var idx = this.allObjects.indexOf(bullet)
  this.allObjects.splice(idx, 1);
}
Game.prototype.move = function() {
  this.canvasEl.height = window.innerHeight * 0.9;
  this.canvasEl.width = window.innerWidth * 0.9;
  this.moveObjects();
  this.draw(this.context);
  this.checkCollisions(this.context);
  this.addMoreAsteroids();
}

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    this.allObjects.forEach(function(el) {
      el.draw(ctx);
    });
  };

Game.prototype.moveObjects = function () {
  this.allObjects.forEach(function(el) {
    el.move(this);
  }.bind(this));
  };

Game.prototype.checkCollisions = function(ctx, interval){
  for(var i = 0; i < this.asteroids.length; i++){
    if(this.asteroids[i].collideWith(this.ship)){
      this.gameOver(ctx);
      return;
    }
    for (var j = 0; j < this.bullets.length; j++) {
      //this is awful, I'm mutating an array while iterating through.
      if(i >= this.asteroids.length) {return;}
      if (this.asteroids[i].collideWith(this.bullets[j])) {
        this.scorePoints(this.asteroids[i].radius)
        this.asteroids[i].blowUp(this);
        var index = this.allObjects.indexOf(this.asteroids[i]);
        this.asteroids.splice(i, 1);
        this.allObjects.splice(index, 1);
        var bulletIndex = this.allObjects.indexOf(this.bullets[j]);
        this.allObjects.splice(bulletIndex, 1);
        this.bullets.splice(j, 1);
      }
    }
  }
};

Game.prototype.gameOver = function(ctx){
  this.ship.moveToSafety();
  this.lost = true;
  // this.allObjects = [];
  // ctx.fillStyle = "white";
  // ctx.font = "italic "+80+"pt Arial ";
  // ctx.fillText("Game Over", 114,167);
};
