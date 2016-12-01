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
      currentUserScores: [],
      users: [],
      isLoggedIn: false
    }
  },

  getCurrentUser() {
    axios.get('/users/currentuser')
      .then(res => {
        this.setState({ currentUser: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

  getAllUsers() {
    axios.get('/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

  getUserScores() {
    axios.get('/scores/users')
      .then(res => {
        this.setState({ currentUserScores: res.data });
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

  componentDidMount() {
    axios.get('/token')
      .then(res => {
        let isLoggedIn = res.data;
        if (isLoggedIn) {
          this.setState({ isLoggedIn: true });
          this.getCurrentUser();
          this.getAllUsers();
          this.getUserScores();
        } else {
          this.setState({ isLoggedIn: false });
        }
      })
      .catch(err => {
        this.setState({ loadErr: err });
      });
  },

  postNewHighScore(highScore) {
    axios.patch('/users', { newHighScore: highScore })
      .then(res => {
        const updatedCurrentUser = Object.assign({}, this.state.currentUser, { highScore: highScore });
        this.setState({ currentUser: updatedCurrentUser });
      })
      .catch(err => {
        console.error(err);
      });
  },

  postScores(currentScores) {
    axios.post('/scores', { currentScores })
      .then(res => {
        this.getUserScores();
        this.getAllUsers();
      })
      .catch(err => {
        console.error(err);
      });
  },

  signIn() {
    this.setState({ isLoggedIn: true });
    this.getCurrentUser();
    this.getAllUsers();
    this.getUserScores();
  },

  signOut() {
    axios.delete('/token')
      .then(res => {
        this.setState({
          currentUser: {},
          currentUserScores: [],
          users: [],
          isLoggedIn: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  },

  render() {
    return (
      <main>
        <Match pattern="/" exactly render={
          () => <Intro
                  { ...this.state }
                  signOut={this.signOut}
                /> } />
        <Match pattern="/play" exactly render={
          () => <Game
                  { ...this.state }
                  postNewHighScore={this.postNewHighScore}
                  postScores={this.postScores}
                /> } />
        <Match pattern="/airconsole" exactly component={AirConsole} />
        <Match pattern="/signin" exactly render={
          () => <SignIn
                  { ...this.state }
                  signIn={this.signIn}
                /> } />
        <Miss component={NotFound} />
        <Match pattern="/user"  render={ () => <User { ...this.state } /> } />
      </main>
    )
  }
});

export default Main;
