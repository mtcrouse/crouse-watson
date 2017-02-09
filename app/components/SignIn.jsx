import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import Header from './layout/Header';
import { Link, Redirect } from 'react-router';

let game;

const SignIn = React.createClass({
  getInitialState() {
    const loggedIn = this.props.isLoggedIn;
    return this.state = { email: '', password: '', loggedIn };
  },

  componentDidMount() {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'intro-animation', { preload: preload, create: create });

    function preload() {
      game.load.image('background', 'images/background.png');
      game.load.image('gold', 'images/gold.png');
    }

    function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      let world = game.add.group();
      world.scale.setTo(window.innerWidth / 800, window.innerHeight / 600);

      world.create(0, 0, 'background');

      let gold = game.add.group();
  		gold.enableBody = true;

  		game.time.events.loop(1000,
        function addCoins() {
    			const coin = gold.create(game.rnd.integerInRange(0, window.innerWidth), -50, 'gold');
    			coin.scale.setTo(0.04, 0.04);

    			coin.body.gravity.y = game.rnd.integerInRange(40, 200);
  		}, this);
    }

  },

  componentWillUnmount() {
    if (game !== undefined) {
      game.destroy();
      game = undefined;
    }
  },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSignInError(error) {
    console.log(error);
    // TODO: Put some validation stuff here
  },

  handleSubmit(event) {
    event.preventDefault();

    let data = { email: this.state.email,
      password: this.state.password
    };

    axios.post('/token', data)
      .then(res => {
        this.props.signIn();
        this.setState({loggedIn: true});
      })
      .catch(err => {
        handleSignInError(err);
      });
  },

  handleSignUpSubmit() {
    this.props.signIn();
    this.setState({loggedIn: true});
  },

  SignInOrSignUp() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />
    } else {
      return <div id="signin-signup">
        <Link to='/'><h3>HOME</h3></Link>
        <p className="sign-in-text">CREATE AN ACCOUNT</p>
        <SignUp handleSignUpSubmit={this.handleSignUpSubmit}/>
        <p className="sign-in-text">SIGN IN</p>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
            <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
          </div>
          <div className="row">
            <button type="submit" id="sign-in-button">SUBMIT</button>
          </div>
        </form>
      </div>
    }
  },

  render() {
    return (
      <div>
        <div id="centered-div-container">
          <div id="centered-div">
            <this.SignInOrSignUp />
          </div>
        </div>
      </div>
    )
  }
});

export default SignIn;
