import Game from './Game';
import Intro from './Intro';
import AirConsole from './AirConsole';
import { Match } from 'react-router';
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Intro} />
        <Match pattern="/play" exactly component={Game} />
        <Match pattern="/airconsole" exactly component={AirConsole} />
      </main>
    )
  }
});

export default Main;
