import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SettingsBtn from '../components/SettingsBtn';
import requestToken from '../services/requestToken';
import { saveLoginInfoAction } from '../redux/actions';

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
    const infoObj = { name, email };
    const { history, saveInfo } = this.props;
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
            onClick={ () => {
              saveInfo(infoObj);
              this.fetchToken();
            } }
          >
            Jogar
          </button>
        </form>
        <SettingsBtn history={ history } />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfo: (obj) => dispatch(saveLoginInfoAction(obj)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
