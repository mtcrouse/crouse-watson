import React from 'react';
import Intro from './Intro';
import Score from './Score';
import Friends from './Friends';
import Leaderboard from './Leaderboard';
import Header from './layout/Header';
import { Match } from 'react-router';
import { Link, Redirect } from 'react-router';

const User = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <div id="user-content">
          <h1>{this.props.currentUser.name}</h1>
          <nav id="profiletabs">
            <ul>
              <li><Link to='/user/score'>Score</Link></li>
              <li><Link to='/user/friends'>Friends</Link></li>
              <li><Link to='/user/leaderboard'>Leaderboard</Link></li>
            </ul>
          </nav>
          <Match pattern="/user/score"  render={ () => <Score { ...this.props } /> } />
          <Match pattern="/user/friends"  render={ () => <Friends { ...this.props } /> } />
          <Match pattern="/user/leaderboard"  render={ () => <Leaderboard { ...this.props } /> } />
        </div>
      </div>
    )
  }
});

export default User;
