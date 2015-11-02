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
  this.level = 0;

};

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < (STARTASTEROIDS + this.level); i++) {
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
  this.level++;
  this.addAsteroids();
  }
};

Game.prototype.removeObject = function(array) {
  for (var i = 0; i < array.length; i++) {
    if(array[i].removable) {
      var j = this.allObjects.indexOf(array[i])
      array.splice(i, 1);
      this.allObjects.splice(j, 1);
      i = -1;
    }
  }
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
  this.asteroids.forEach(function(asteroid){
    if (asteroid.collideWith(this.ship)){
      this.gameOver();
      // make this blow up the asteroid?
    }
    this.bullets.forEach(function(bullet){
      if (asteroid.collideWith(bullet)){
        this.scorePoints(1000 / asteroid.radius)
        asteroid.blowUp(this);
        asteroid.removable = true;
        bullet.removable = true;
      }
    }.bind(this))
    this.removeObject(this.bullets)
  }.bind(this))
  this.removeObject(this.asteroids)
};

Game.prototype.gameOver = function(){
  this.ship.moveToSafety();
  this.lost = true;
};
