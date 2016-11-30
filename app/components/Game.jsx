import React from 'react';
import axios from 'axios';

let game;

const Game = React.createClass({
  updateHighScore(newHighScore) {
    const oldHighScore = this.props.currentUser.highScore;
    if (newHighScore > oldHighScore) {
      this.props.postNewHighScore(newHighScore);
    }
  },

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
      this.updateHighScore(game.state.states.gameOver.highScore);
    });
  },

  componentWillUnmount() {
    this.updateHighScore(game.state.states.gameOver.highScore);

    if (game === undefined) {
      console.log('game not started');
    } else {
      game.destroy();
      game = undefined;
    }

    window.removeEventListener('beforeunload', (event) => {
      this.updateHighScore(game.state.states.gameOver.highScore);
    });
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
