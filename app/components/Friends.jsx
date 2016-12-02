import React from 'react';

const Friends = React.createClass({
  render() {
    return (
      <div>
        <table id="leaderboard-table">
          <thead>
            <tr>
              <th>
                USER
              </th>
              <th>
                HIGH SCORE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Friend's name!
              </td>
              <td>
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

export default Friends;
