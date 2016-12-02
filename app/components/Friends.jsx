import React from 'react';

const Friends = React.createClass({
  render() {
    return (
      <div>
              {this.props.currentFriends[0].id}
      </div>
    )
  }
});

export default Friends;
