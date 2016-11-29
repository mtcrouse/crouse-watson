import React from 'react';

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

    game.state.start('boot');
  },

  componentWillUnmount() {
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
