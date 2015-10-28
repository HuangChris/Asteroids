window.AsteroidsShow = React.createClass({
  getInitialState: function() {
    return {lives: 300, points: 0, gameState: "new", highScore: 0}
  },

  componentWillMount: function () {
    var canvasEl = document.getElementById("canvas");
    canvasEl.height = window.innerHeight * 0.9;
    canvasEl.width = window.innerWidth * 0.9;
  },

  startGame: function() {
    this.game = new Asteroids.Game(this.getPoints);
    this.bindKeys();
    this.game.addAsteroids();
    this.setState({gameState: "running"})
    this.timerId = setInterval(function(){
      this.game.move();
      if (this.game.lost) {
        this.setState({lives: this.state.lives - 1});
        if(this.state.lives === 0) {
          clearInterval(this.timerId);
          this.setState({gameState:"lost"})
          if(this.state.points > this.state.highScore) {
            this.setState({highScore: this.state.points})
          }
        } else {
          this.game.lost = false;
        }
      }
    }.bind(this), 1000 / 60)
  },

  resetGame: function() {
    this.game = {};
    this.unbindKeys();
    this.setState({lives: 3, points: 0});
    this.startGame();
  },

  unbindKeys: function () {
    key.unbind('left');
    key.unbind('right');
    key.unbind('up');
    key.unbind('down');
    key.unbind('space');
  },

  bindKeys: function () {
    var that = this;
    window.key("left", function(e){
      e.preventDefault();
      that.game.ship.rotate(1);
    });
    window.key("right", function(e){
      e.preventDefault();
      that.game.ship.rotate(-1);
    });
    window.key('up', function (e) {
      e.preventDefault();
      that.game.ship.power(1);
    });
    window.key('down', function (e) {
      e.preventDefault();
      that.game.ship.power(-1);
    });
    window.key('space', function (e) {
      e.preventDefault();
      if (that.game.bullets.length < 8) {
        that.game.ship.fireBullet(that.game);
      }
    });
  },

  getPoints: function (points) {
    this.setState({points: this.state.points + points})
  },

  render: function () {
    if(this.state.gameState === "new") {
      return <div>Welcome To Asteroids! <button onClick={this.startGame}>Start Game</button></div>
    } else if (this.state.gameState === "lost") {
      return <div>
        <p>Asteroids!  Lives: {this.state.lives}  Points: {this.state.points} High Score: {this.state.highScore}</p>
        You lost.  Play Again? <button onClick={this.resetGame}>Yes</button></div>
    }
    else{
      return <div>
        <p>Asteroids!  Lives: {this.state.lives}  Points: {this.state.points} High Score: {this.state.highScore}</p>
      </div>
    }
  }
})


ReactDOM.render(<AsteroidsShow/>, document.getElementById("container"));
