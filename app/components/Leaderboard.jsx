import React from 'react';
import UserLeaderboard from './UserLeaderboard';

const Leaderboard = React.createClass({



  render() {
    return (


            <ul id="friendslist" className="clearfix">
            {this.props.users.map((user,index) => {
              return<UserLeaderboard key={index} user={user}/>;
            })}
            </ul>


    )
  }
});

export default Leaderboard;
