import React from 'react';
import axios from 'axios';

let game;

const Game = React.createClass({
  componentWillMount() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('directions', directionsState);
    game.state.add('main', mainState);
    game.state.add('gameOver', gameOver);
    game.state.add('win', winState);

    game.state.start('boot', true, false, { 'highScore': this.props.highScore });
  },

  componentWillUnmount() {
    console.log(game.state.states.gameOver.highScore);
    axios.patch('/users', {newHighScore: game.state.states.gameOver.highScore})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
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
