import React from 'react';
import axios from 'axios';

const SignIn = React.createClass({
  getInitialState() {
  },

  handleChange(event) {
  },

  handleSubmit(event) {
    event.preventDefault();


    axios.post('/token', data)
      .then(res => {
      })
      .catch(err => {
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
