import React from 'react';
import { Link, Redirect } from 'react-router';

const Intro = React.createClass({
  render() {
    return (
      <main>
        <ul id="link-options">
          <Link to='/play'><li>PLAY</li></Link>
          <Link to='/airconsole'><li>AIR CONSOLE</li></Link>
          <Link to='/signin'><li>SIGN IN</li></Link>
          <Link to='/user'><li>PROFILE</li></Link>
        </ul>
      </main>
    )
  }
});

export default Intro;
