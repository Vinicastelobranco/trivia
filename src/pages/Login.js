import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestToken from '../services/requestToken';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  validateEmail = (email) => {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  }

  validateLogin = () => {
    const { email, name } = this.state;
    return this.validateEmail(email) && name.length > 0;
  }

  fetchToken = async () => {
    await requestToken();
    const { history } = this.props;
    history.push('/jogo');
  }

  render() {
    const { email, name } = this.state;
    return (
      <main className="login-body">
        <form className="login-form">
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.validateLogin() }
            onClick={ this.fetchToken }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(Login);
