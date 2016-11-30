import Game from './Game';
import Intro from './Intro';
import User from './User';
import AirConsole from './AirConsole';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Intro} />
        <Match pattern="/play" exactly component={Game} />
        <Match pattern="/airconsole" exactly component={AirConsole} />

        <Match pattern="/signin" exactly component={SignIn} />
        <Miss component={NotFound} />

        <Match pattern="/user" component={User} />


      </main>
    )
  }
});

export default Main;
