import React from 'react';

const Score = React.createClass({
  render() {
    return (
      <div>
        {this.props.currentUser[0].highScore}
      </div>
    )
  }
});

export default Score;
