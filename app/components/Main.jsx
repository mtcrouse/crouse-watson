import Game from './Game';
import Intro from './Intro';
import User from './User';
import AirConsole from './AirConsole';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import React from 'react';
import axios from 'axios';

const Main = React.createClass({
  getInitialState() {
    return axios.get('/users/highscore')
      .then(res => {
        return this.state = {highScore: res.data.highScore};
      })
      .catch(err => {
        console.error(err);
      });
  },

  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Intro} />
        <Match pattern="/play" exactly render={ () => <Game { ...this.state } /> } />

        <Match pattern="/airconsole" exactly component={AirConsole} />

        <Match pattern="/signin" exactly component={SignIn} />
        <Miss component={NotFound} />

        <Match pattern="/user" component={User} />


      </main>
    )
  }
});

export default Main;
