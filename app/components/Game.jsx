import React from 'react';
import axios from 'axios';

let game;

const Game = React.createClass({
  componentDidMount() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('directions', directionsState);
    game.state.add('main', mainState);
    game.state.add('gameOver', gameOver);
    game.state.add('win', winState);

    game.state.start('boot', true, false, { 'highScore': this.props.currentUser.highScore });

    window.addEventListener('beforeunload', (event) => {
        ev.preventDefault();
        return event.returnValue = 'Are you sure you want to close?';
    });
  },

  componentWillUnmount() {
    const newHighScore = game.state.states.gameOver.highScore;
    if (newHighScore > this.props.currentUser.highScore) {
      this.props.postNewHighScore(game.state.states.gameOver.highScore);
    }
    if (game === undefined) {
      console.log('game not started');
    } else {
      game.destroy();
      game = undefined;
    }
  },

  render() {
    return (
      <div>
        <div id="gameDiv"></div>
      </div>
    )
  }
});

export default Game;
