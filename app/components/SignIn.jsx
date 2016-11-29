import React from 'react';
import axios from 'axios';
import SignUp from './SignUp';

const SignIn = React.createClass({
  getInitialState() {
    return this.state = {email: '', password: ''};
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
        console.log('successfully posted token');
      })
      .catch(err => {
        console.error(err);
      });
  },

  render() {
    return (
      <div>
        <p>Create an account</p>
        <SignUp />
        <p>Sign in if you already have an account</p>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
          <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
          <button type="submit">SUBMIT</button>
        </form>
        <p>Thank you!</p>
      </div>
    )
  }
});

export default SignIn;
