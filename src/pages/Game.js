import React from 'react';
import PropTypes from 'prop-types';
import SettingsBtn from '../components/SettingsBtn';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (<SettingsBtn history={ history } />);
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Game;
