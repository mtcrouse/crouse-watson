import Game from './Game';
import Intro from './Intro';
import { Match } from 'react-router';
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Game} />
      </main>
    )
  }
});

export default Main;
