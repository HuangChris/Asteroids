if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var STARTASTEROIDS = 1;

var Game = window.Asteroids.Game = function () {
  this.asteroids = [];
  this.ship = new window.Asteroids.Ship();
  this.bullets = [];
  this.allObjects = this.asteroids.concat(this.ship);
};

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < STARTASTEROIDS; i++) {
    var pos = [];
    pos[0] = Math.random() * window.innerWidth;
    pos[1] = Math.random() * window.innerHeight;
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

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, 1000, 1000);
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
      clearInterval(interval);
      this.gameOver(ctx);
      return;
    }
    for (var j = 0; j < this.bullets.length; j++) {
      if (this.asteroids[i].collideWith(this.bullets[j])) {
        this.asteroids[i].blowUp(ctx);
        var index = this.allObjects.indexOf(this.asteroids[i]);
        this.asteroids.splice(i, 1);
        this.allObjects.splice(index, 1);
        var bulletIndex = this.allObjects.indexOf(this.bullets[j]);
        this.allObjects.splice(bulletIndex, 1);
        this.bullets.splice(j, 1);
      }
    }
    //LIMIT bullets
  }
};

Game.prototype.gameOver = function(ctx){
  this.allObjects = [];
  ctx.fillStyle = "white";
  ctx.font = "italic "+80+"pt Arial ";
  ctx.fillText("Game Over", 114,167);
};
