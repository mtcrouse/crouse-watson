import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import Header from './layout/Header';
import { Link, Redirect } from 'react-router';

const SignIn = React.createClass({
  getInitialState() {
    const loggedIn = this.props.isLoggedIn;
    return this.state = { email: '', password: '', loggedIn };
  },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    let data = { email: this.state.email,
      password: this.state.password
    };
    axios.post('/token', data)
      .then(res => {
        this.props.signIn();
        this.setState({loggedIn: true});
      })
      .catch(err => {
        console.error(err);
      });
  },

  SignInOrSignUp() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />
    } else {
      return <div id="signin-signup">
        <p>Create an account</p>
        <SignUp />
        <p>Sign in if you already have an account</p>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
          <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    }
  },

  render() {
    return (
      <div>
        <Header />
        <this.SignInOrSignUp />
      </div>
    )
  }
});

export default SignIn;
