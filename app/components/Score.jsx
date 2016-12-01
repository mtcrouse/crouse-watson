import React from 'react';

const Score = React.createClass({
  componentDidMount() {
    console.log();
  },

  render() {
    return (
      <div>
        {this.props.currentUser.highScore}
      </div>
    )
  }
});

export default Score;
