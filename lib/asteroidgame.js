window.AsteroidsShow = React.createClass({
  getInitialState: function() {
    return {lives: 3, points: 0, gameState: "new"}
  },

  startGame: function() {
    this.game = new Asteroids.Game();
    this.game.addAsteroids();
    this.setState({gameState: "running"})
    this.timerId = setInterval(function(){
      this.game.move();
      if (this.game.lost) {
        this.setState({lives: this.state.lives - 1});
        if(this.state.lives === 0) {
          clearInterval(this.timerId);
          this.setState({gameState:"lost"})
        }
      }
    }.bind(this), 1000 / 60)
  },

  resetGame: function() {
    this.setState({lives: 3, points: 0});
    this.startGame();
  },

  render: function () {
    if(this.state.gameState === "new") {
      return <div>Welcome To Asteroids! <button onClick={this.startGame}>Start Game</button></div>
    } else if (this.state.gameState === "lost") {
      return <div>You lost.  Play Again <button onClick={this.resetGame}></button></div>
    }
    else{
      return <div>
        <p>Asteroids!  Lives: {this.state.lives}  Points: {this.state.points}</p>
      </div>
    }
  }
})


  ReactDOM.render(<AsteroidsShow/>, document.getElementById("container"));
