import React from 'react';
import axios from 'axios';

const SignUp = React.createClass({
  getInitialState() {
    return this.state = {
      email: '',
      password: '',
      name: '',
      username: ''
    };
  },

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    let data = { email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      username: this.state.username
    };

    axios.post('/users', data)
      .then(res => {
        console.log('successfully posted user');
        axios.post('/token', data)
          .then(res => {
            console.log('successfully posted token');
            this.props.handleSignUpSubmit();
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="First Name" name="name" type="text" onChange={this.handleChange} />
          <input placeholder="Username" name="username" type="text" onChange={this.handleChange} />
          <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
          <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
});

export default SignUp;
