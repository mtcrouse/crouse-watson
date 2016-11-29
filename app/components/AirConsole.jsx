import React from 'react';

const AirConsole = React.createClass({
  render() {
    return (
      <div>
        <iframe src="https://www.airconsole.com/?embed#!play=localhost:8000" width="800" height="800">

        </iframe>
      </div>
    )
  }
});

export default AirConsole;
