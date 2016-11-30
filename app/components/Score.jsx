import React from 'react';

const Score = React.createClass({
  render() {
    return (
      <div>
            {this.props.currentUser.highScore}
      </div>
    )
  }
});

export default Score;
