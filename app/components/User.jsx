import React from 'react';
import Intro from './Intro';
import Score from './Score';
import Friends from './Friends';
import Leaderboard from './Leaderboard';
import Header from './layout/Header';
import { Match } from 'react-router';
import { Link, Redirect } from 'react-router';

let game;

const User = React.createClass({
  componentDidMount() {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'intro-animation', { preload: preload, create: create });

    function preload() {
      game.load.image('background', 'images/background.png');
      game.load.image('platform', 'images/platform.png');
    }

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      let world = game.add.group();
      world.scale.setTo(window.innerWidth / 800, window.innerHeight / 600);

      world.create(0, 0, 'background');
    }
  },

  componentWillUnmount() {
    if (game !== undefined) {
      game.destroy();
      game = undefined;
    }
  },

  render() {
    return (
      <div>
        <div id="centered-div-container">
          <div id="centered-div">
            <Link to='/'><h3>HOME</h3></Link>
            <div id="user-content">
              <h1 className="u-pull-left">{this.props.currentUser.name}</h1>
              <nav id="profiletabs">
                <ul>
                  {/* <li><Link to='/user/score'>Score</Link></li> */}
                  <li><Link to='/user/leaderboard'>Leaderboard</Link></li>
                </ul>
              </nav>
              <Match pattern="/user/score"  render={ () => <Score { ...this.props } /> } />
              <Match pattern="/user/leaderboard"  render={ () => <Leaderboard { ...this.props } /> } />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default User;
