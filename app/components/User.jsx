import React from 'react';
import Intro from './Intro';
import Score from './Score';
import Friends from './Friends';
import Leaderboard from './Leaderboard';
import { Match } from 'react-router';
import { Link, Redirect } from 'react-router';

const User = React.createClass({

  componentDidMount(){
    console.log(this.props);
  },
  render() {
    return (

      <div id='w'>
        <div id="content" className="clearfix">
          <h1>User Profile</h1>
        <nav id="profiletabs">
          <ul className="clearfix">
            <li><Link to='/user/score'>Score</Link></li>
            <li><Link to='/user/friends'>Friends</Link></li>
            <li><Link to='/user/leaderboard'>Leaderboard</Link></li>
          </ul>
        </nav>
        </div>
          <Match pattern="/user/score" exactly component={Score} />
          <Match pattern="/user/friends" exactly component={Friends} />
          <Match pattern="/user/leaderboard" exactly component={Leaderboard} />
      </div>

    )
  }
});

export default User;
