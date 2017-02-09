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

  handleSignUpError(error) {
    console.log(error);
    // Add some client-side validation here
  },

  handleSubmit(event) {
    event.preventDefault();

    // TODO: Some validation here
    // if () {
    //
    // }

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
        handleSignUpError(err);
      });
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <input placeholder="First Name" name="name" type="text" onChange={this.handleChange} />
            <input placeholder="Username" name="username" type="text" onChange={this.handleChange} />
          </div>
          <div className="row">
            <input placeholder="Password" name="password" type="password" onChange={this.handleChange} />
            <input placeholder="Email" name="email" type="email" onChange={this.handleChange} />
          </div>
          <div className="row">
            <button type="submit" id="sign-up-button">SUBMIT</button>
          </div>
        </form>
      </div>
    )
  }
});

export default SignUp;
