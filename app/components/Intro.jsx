import React from 'react';
import { Link, Redirect } from 'react-router';

let game;

const Intro = React.createClass({
  IsLoggedIn() {
    if (this.props.isLoggedIn === false) {
      return <Link to='/signin'><button className="main-button" id="sign-in-button">SIGN IN OR SIGN UP</button></Link>;
    } else {
      return <Link to='/user'><button className="main-button" id="profile-button">PROFILE</button></Link>;
    }
  },

  SignOut() {
    if (this.props.isLoggedIn === true) {
      return <button onClick={this.props.signOut} className="main-button">SIGN OUT</button>;
    } else {
      return <br />;
    }
  },

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

      let platforms = game.add.group();
  		platforms.enableBody = true;

      const startLedgeX = game.rnd.integerInRange(35, window.innerWidth - 300);
      const startLedgeY = game.rnd.integerInRange(window.innerHeight, window.innerHeight + 40);

      const startLedge = platforms.create(startLedgeX, startLedgeY, 'platform');
      startLedge.body.immovable = true;
      startLedge.body.velocity.y = -40;

  		game.time.events.loop(4000,
        function addPlatform() {
          const ledgeX = game.rnd.integerInRange(35, window.innerWidth - 300);
      		const ledgeY = game.rnd.integerInRange(window.innerHeight, window.innerHeight + 40);

      		const ledge = platforms.create(ledgeX, ledgeY, 'platform');
      		ledge.body.immovable = true;
          ledge.body.velocity.y = -40;
        }, this);
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
      <main>
        <div id="intro-animation">
        </div>
        <div id="centered-div-container">
          <div id="centered-div">
            <div id="main-title">PLATFORM</div>
            <Link to='/play'><button className="main-button" id="play-button">PLAY THE GAME</button></Link>
            {/* <Link to='/airconsole'><button className="main-button">PLAY ON AIR CONSOLE</button></Link> */}
            <this.IsLoggedIn />
            <this.SignOut />
          </div>
        </div>
      </main>
    )
  }
});

export default Intro;
