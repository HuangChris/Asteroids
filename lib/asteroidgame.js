window.AsteroidsShow = React.createClass({
  getInitialState: function() {
    return {lives: 3, points: 0, gameState: "new", highScore: 0}
  },

  componentWillMount: function () {
    var canvasEl = document.getElementById("canvas");
    canvasEl.height = window.innerHeight * 0.83;
    canvasEl.width = window.innerWidth * 0.83;
    window.key('enter', this.startGame);
  },

  startGame: function() {
    key.unbind('enter')
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
          window.key('enter', this.resetGame);
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
      return <div><h3>Welcome To Asteroids! Press "Enter" to Start.</h3></div>
    } else if (this.state.gameState === "lost") {
      return <div>
      <h3>Asteroids! You lost.  Play Again? <button onClick={this.resetGame}>Yes</button></h3>
      <p>Lives: {this.state.lives} Points: {this.state.points} High Score: {this.state.highScore}</p>
      </div>
    }
    else{
      return <div>
        <h3>Asteroids! Arrow keys to move, Spacebar to fire.</h3>
        <p>Lives: {this.state.lives} Points: {this.state.points} High Score: {this.state.highScore}</p>
      </div>
    }
  }
})


ReactDOM.render(<AsteroidsShow/>, document.getElementById("container"));
