import Game from './Game';
import Intro from './Intro';
import User from './User';
import AirConsole from './AirConsole';
import SignIn from './SignIn';
import NotFound from './NotFound';
import { Miss, Match } from 'react-router';
import React from 'react';
import axios from 'axios';

const Main = React.createClass({
  getInitialState() {
    return {
      currentUser: {},
      users: []
    }
  },

  componentDidMount() {
    axios.get('/users/currentuser')
      .then(res => {
        this.setState({ currentUser: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
    axios.get('/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

  postNewHighScore() {
    // State mutator + post new high score to db
  },

  updateLeaderboard() {
    // State mutator to update leaderboard
  },

  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Intro} />
        <Match pattern="/play" exactly render={ () => <Game { ...this.state } /> } />

        <Match pattern="/airconsole" exactly component={AirConsole} />

        <Match pattern="/signin" exactly component={SignIn} />
        <Miss component={NotFound} />

        {/* <Match pattern="/user" component=<User {...this.state}/> /> */}
        <Match pattern="/user"  render={ () => <User { ...this.state } /> } />


      </main>
    )
  }
});

export default Main;
