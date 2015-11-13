"use strict";

window.AsteroidsShow = React.createClass({
  displayName: "AsteroidsShow",

  getInitialState: function getInitialState() {
    return { lives: 3, points: 0, gameState: "new", highScore: 0 };
  },

  componentWillMount: function componentWillMount() {
    var canvasEl = document.getElementById("canvas");
    canvasEl.height = window.innerHeight * 0.83;
    canvasEl.width = window.innerWidth * 0.83;
    window.key('enter', this.startGame);
  },

  startGame: function startGame() {
    key.unbind('enter');
    this.game = new Asteroids.Game(this.getPoints);
    this.bindKeys();
    this.game.addAsteroids();
    this.setState({ gameState: "running" });
    this.timerId = setInterval((function () {
      this.game.move();
      if (this.game.lost) {
        this.setState({ lives: this.state.lives - 1 });
        if (this.state.lives === 0) {
          clearInterval(this.timerId);
          this.setState({ gameState: "lost" });
          window.key('enter', this.resetGame);
          if (this.state.points > this.state.highScore) {
            this.setState({ highScore: this.state.points });
          }
        } else {
          this.game.lost = false;
        }
      }
    }).bind(this), 1000 / 60);
  },

  resetGame: function resetGame() {
    this.game = {};
    this.unbindKeys();
    this.setState({ lives: 3, points: 0 });
    this.startGame();
  },

  unbindKeys: function unbindKeys() {
    key.unbind('left');
    key.unbind('right');
    key.unbind('up');
    key.unbind('down');
    key.unbind('space');
  },

  bindKeys: function bindKeys() {
    var that = this;
    window.key("left", function (e) {
      e.preventDefault();
      that.game.ship.rotate(1);
    });
    window.key("right", function (e) {
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

  getPoints: function getPoints(points) {
    this.setState({ points: this.state.points + points });
  },

  render: function render() {
    if (this.state.gameState === "new") {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Welcome To Asteroids! Press \"Enter\" to Start."
        )
      );
    } else if (this.state.gameState === "lost") {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Asteroids! You lost.  Play Again? ",
          React.createElement(
            "button",
            { onClick: this.resetGame },
            "Yes"
          )
        ),
        React.createElement(
          "p",
          null,
          "Lives: ",
          this.state.lives,
          " Points: ",
          this.state.points,
          " High Score: ",
          this.state.highScore
        )
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Asteroids! Arrow keys to move, Spacebar to fire."
        ),
        React.createElement(
          "p",
          null,
          "Lives: ",
          this.state.lives,
          " Points: ",
          this.state.points,
          " High Score: ",
          this.state.highScore
        )
      );
    }
  }
});

ReactDOM.render(React.createElement(AsteroidsShow, null), document.getElementById("container"));