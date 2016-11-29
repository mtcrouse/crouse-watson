import React from 'react';
import { Link } from 'react-router';

const Header = React.createClass({
  render() {
    return (
      <header>
        <div>
          <p><Link to="/">Platform Game</Link></p>
        </div>
      </header>
    )
  }
});

export default Header;
