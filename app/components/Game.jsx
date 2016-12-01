import React from 'react';
import axios from 'axios';
import Header from './layout/Header';

let game;

const Game = React.createClass({
  updateHighScore(newHighScore) {
    const oldHighScore = this.props.currentUser.highScore;
    if (newHighScore > oldHighScore) {
      this.props.postNewHighScore(newHighScore);
    }
  },

  postScores(currentScores) {
    this.props.postScores(currentScores);
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
      if (this.props.isLoggedIn) {
        this.updateHighScore(game.state.states.gameOver.highScore);
        this.postScores(game.state.states.gameOver.currentScores);
      }
    });
  },

  componentWillUnmount() {
    if (this.props.isLoggedIn) {
      this.updateHighScore(game.state.states.gameOver.highScore);
      this.postScores(game.state.states.gameOver.currentScores);
    }

    if (game !== undefined) {
      game.destroy();
      game = undefined;
    }

    window.removeEventListener('beforeunload', (event) => {
      if (this.props.isLoggedIn) {
        this.updateHighScore(game.state.states.gameOver.highScore);
        this.postScores(game.state.states.gameOver.currentScores);
      }
    });
  },

  render() {
    return (
      <div>
        <Header />
        <div id="gameDiv"></div>
      </div>
    )
  }
});

export default Game;
