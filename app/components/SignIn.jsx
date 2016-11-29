import React from 'react';
import axios from 'axios';

const SignIn = React.createClass({
  getInitialState() {
    return this.state = {email: '', password: ''};
  },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    let data = { email: this.state.email, password: this.state.password };

    console.log('umm');

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
        <form onSubmit={this.handleSubmit}>
          <input name="email" type="email" onChange={this.handleChange} />
          <input name="password" type="password" onChange={this.handleChange} />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
});

export default SignIn;
