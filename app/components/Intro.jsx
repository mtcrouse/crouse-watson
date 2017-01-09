import React from 'react';
import { Link, Redirect } from 'react-router';

const Intro = React.createClass({
  IsLoggedIn() {
    if (this.props.isLoggedIn === false) {
      return <Link to='/signin'><li>SIGN IN OR SIGN UP</li></Link>;
    } else {
      return <Link to='/user'><li>PROFILE</li></Link>;
    }
  },

  SignOut() {
    if (this.props.isLoggedIn === true) {
      return <li onClick={this.props.signOut}>SIGN OUT</li>;
    } else {
      return <br />;
    }
  },

  render() {
    return (
      <main>
        <ul id="link-options">
          <Link to='/play'><li>PLAY THE GAME</li></Link>
          {/* <Link to='/airconsole'><li>PLAY ON AIR CONSOLE</li></Link> */}
          <this.IsLoggedIn />
          <this.SignOut />
        </ul>
      </main>
    )
  }
});

export default Intro;
