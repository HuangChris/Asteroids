"use strict";

window.AsteroidsShow = React.createClass({
  displayName: "AsteroidsShow",

  getInitialState: function getInitialState() {
    return { lives: 3, points: 0, gameState: "new" };
  },

  getPoints: function (points) {
    this.setState({points: this.state.points + points})
  },

  startGame: function startGame() {
    this.game = new Asteroids.Game(this.getPoints);
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
    that.game.addAsteroids();
    that.setState({ gameState: "running" });
    that.timerId = setInterval((function () {
      that.game.move();
      if (that.game.lost) {
        that.setState({ lives: that.state.lives - 1 });
        if (that.state.lives === 0) {
          clearInterval(that.timerId);
          that.setState({ gameState: "lost" });
        } else {
          that.game.lost = false;
        }
      }
    }), 1000 / 60);
  },

  resetGame: function resetGame() {
    this.setState({ lives: 3, points: 0 });
    this.startGame();
  },

  render: function render() {
    if (this.state.gameState === "new") {
      return React.createElement(
        "div",
        null,
        "Welcome To Asteroids! ",
        React.createElement(
          "button",
          { onClick: this.startGame },
          "Start Game"
        )
      );
    } else if (this.state.gameState === "lost") {
      return React.createElement(
        "div",
        null,
        "You lost.  Play Again ",
        React.createElement("button", { onClick: this.resetGame })
      );
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Asteroids!  Lives: ",
          this.state.lives,
          "  Points: ",
          this.state.points
        )
      );
    }
  }
});

ReactDOM.render(React.createElement(AsteroidsShow, null), document.getElementById("container"));
