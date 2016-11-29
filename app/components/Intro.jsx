import React from 'react';
import SignIn from './SignIn';
import { Link, Redirect } from 'react-router';

const Intro = React.createClass({
  // componentDidMount() {
  //   const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv', { preload: preload, create: create });
  //   let platforms;
  //
  //   function preload() {
  //     game.load.image('background', '/images/background.png');
  //     game.load.image('cloud', '/images/cloud.png');
  //   }
  //
  //   function create() {
  //     game.physics.startSystem(Phaser.Physics.ARCADE);
  //
  //     const background = game.add.sprite(0, 0, 'background');
  //     background.height = window.innerHeight;
  //     background.width = window.innerWidth;
  //
  //     platforms = game.add.group();
  //     platforms.enableBody = true;
  //
  //     const name = game.add.text(game.width/2 - 160, game.height/2 - 100, 'Platform Game', { font: '50px Arial', fill: '#000' });
  //     const authors = game.add.text(game.width/2 - 230, game.height/2 + 70, 'By Metta Crouse and Karl Watson', { font: '30px Arial', fill: '#000' });
  //     const startText = game.add.text(game.width/2 - 130, game.height/2 + 130, 'Click anywhere to play', { font: '25px Arial', fill: '#000' })
  //
  //     addPlatform();
  //
  //     game.time.events.loop(5000, addPlatform, this);
  //
  //     const mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
  //     mKey.onDown.addOnce(goToGame, this);
  //   }
  //
  //   function goToGame() {
  //     game.destroy();
  //   }
  //
  //   function addPlatform() {
  //     let ledgeX = game.rnd.integerInRange(35, window.innerWidth - 355);
  //     let ledgeY = game.rnd.integerInRange(window.innerHeight, window.innerHeight + 50);
  //
  //     let ledge = platforms.create(ledgeX, ledgeY, 'cloud');
  //     ledge.body.velocity.y = -40;
  //   }
  // },

  render() {
    return (
      <main>
        {/* <Link to="/play">
          <div id="gameDiv"></div>
        </Link> */}
        <h1>Welcome to the game!</h1>
        <ul id="link-options">
          <li><Link to='/play'>Play the game!</Link></li>
          <li><Link to='/airconsole'>Play the game with Air Console!</Link></li>
        </ul>
        <SignIn />
      </main>
    )
  }
});

export default Intro;
