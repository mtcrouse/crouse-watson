import React from 'react';

const UserLeaderboard = React.createClass({
  render() {
    return (
      <li>
          <div>
                {this.props.user.highScore+" "}
                {this.props.user.username}
          </div>
      </li>
    )
  }
});

export default UserLeaderboard;
