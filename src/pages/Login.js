import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SettingsBtn from '../components/SettingsBtn';
import requestTokenObj from '../services/requestToken';
import { saveLoginInfoAction } from '../redux/actions';
import HeaderAipim from '../components/HeaderAipim';
import '../styles/Login.css';

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
    await requestTokenObj.requestToken();
    const { history } = this.props;
    history.push('/jogo');
  }

  render() {
    const { email, name } = this.state;
    const infoObj = { name, email };
    const { history, saveInfo } = this.props;
    return (
      <>
        <HeaderAipim />
        <main className="login-body">
          <form className="login-form">
            <div className="signInContainer">
              <h2 className="signInH2">Sign In</h2>
            </div>

            <div className="inputContainer">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </div>

            <div className="inputContainer">
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </div>
            <div className="buttonContainer1 buttonContainer">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ !this.validateLogin() }
                onClick={ () => {
                  saveInfo(infoObj);
                  this.fetchToken();
                } }
              >
                Play
              </button>
            </div>
            <div className="buttonContainer2 buttonContainer">
              <SettingsBtn history={ history } />
            </div>
          </form>
        </main>
      </>

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
