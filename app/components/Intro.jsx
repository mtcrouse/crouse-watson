import React from 'react';
import { Link } from 'react-router';


const Intro = React.createClass({
  render() {
    return (
      <main>
        <h1>Welcome to the game!</h1>
        <p><Link to='/'>Play the game!</Link></p>
      </main>
    )
  }
});

export default Intro;
