if (typeof Asteroids === 'undefined') {
  window.Asteroids = {};
}

var A = window.Asteroids;

window.Asteroids.GameView = function(game, canvasEl) {
  this.canvasEl = canvasEl;
  this.ctx = this.canvasEl.getContext("2d");
  this.game = game;
};

A.GameView.prototype.start = function(){
  this.bindKeyHandlers(this.game);
  var that = this;
  var interval = setInterval(function() {
    that.resize();
    that.game.moveObjects();
    that.game.draw(that.ctx);
    that.game.checkCollisions(that.ctx, interval);
    that.game.addMoreAsteroids();
  }, 1000 / 60);
};

A.GameView.prototype.resize = function(){
  if(this.canvasEl.height !== window.innerHeight ||
      this.canvasEl.width !== window.innerWidth){
    this.canvasEl.height = window.innerHeight;
    this.canvasEl.width = window.innerWidth;
  }
};

A.GameView.prototype.bindKeyHandlers = function(game) {
  window.key('space', function (e) {
    e.preventDefault();
    if(game.bullets.length < 8){
      game.ship.fireBullet(game);
    }
  });
  // window.key('left', function () {
    // game.ship.power([-1,0]);
  // });
  // window.key('right', function () {
    // game.ship.power([1,0]);
  // });
  window.key("left", function(e){
    e.preventDefault();
    game.ship.rotate(1);
  });
  window.key("right", function(e){
    e.preventDefault();
    game.ship.rotate(-1);
  });
  window.key('up', function (e) {
    e.preventDefault();
    game.ship.power(1);
  });
  window.key('down', function (e) {
    e.preventDefault();
    game.ship.power(-1);
  });
};
